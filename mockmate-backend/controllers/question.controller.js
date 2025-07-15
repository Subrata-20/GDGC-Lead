import { QuestionSet } from "../models/questionSchema.js";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TestResult } from "../models/resultSchema.js";
import mongoose from "mongoose";
dotenv.config();

export const generateQuestionsAndStore = async (req, res) => {
  try {
    const { topic, difficulty } = req.body;
    const userId = req.user.id;

    if (!topic || !difficulty) {
      return res
        .status(400)
        .json({ message: "Topic and difficulty are required" });
    }

    const validDifficulties = ["Easy", "Medium", "Hard"];
    if (!validDifficulties.includes(difficulty)) {
      return res.status(400).json({
        message: "Invalid difficulty level. Must be one of: Easy, Medium, Hard",
      });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      return res
        .status(500)
        .json({ message: "Missing API key for question generation" });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Generate exactly 20 multiple-choice questions on the topic of ${topic} at ${difficulty} level.
    Return ONLY a valid JSON array with no extra text, markdown formatting, or trailing commas.
    Each question object in the array MUST strictly follow this JSON schema:
    
    {
      "question": "1. What is...?",
      "options": [
        { "key": "a", "value": "Option A" },
        { "key": "b", "value": "Option B" },
        { "key": "c", "value": "Option C" },
        { "key": "d", "value": "Option D" }
      ],
      "answer": { "key": "a", "value": "Option A" }
    }
    
    Rules:
    - All keys and string values must be enclosed in double quotes.
    - The options array must contain exactly 4 objects with keys "a", "b", "c", and "d".
    - The answer object must exactly match one of the option objects.
    - Do not include any extra text, markdown code blocks, or invalid JSON.
    - If any generated question does not strictly adhere to this schema, do NOT include it.
    
    Output only the valid JSON array.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.candidates[0].content.parts[0].text;

    const cleanedJson = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const jsonData = JSON.parse(cleanedJson);
    const finalData = JSON.stringify(jsonData, null, 2);
    const newQuestionSet = new QuestionSet({
      user: userId,
      topic,
      difficulty,
      questions: finalData,
    });

    //console.log(newQuestionSet._id)
    await newQuestionSet.save();

    return res.status(201).json({
      message: "Questions generated and saved successfully",
      data: finalData,
      testId: newQuestionSet._id,
    });
  } catch (error) {
    console.error("Error in generateQuestionsAndStore:", error);

    if (error.response?.status === 429) {
      return res
        .status(429)
        .json({ message: "Rate limit exceeded. Please try again later." });
    }

    if (error.message.includes("JSON")) {
      return res.status(422).json({
        message: "Failed to parse generated questions. Please try again.",
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "An error occurred while generating questions",
      error: error.message,
    });
  }
};

export const getHistoryOfUser = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Please log in first.",
      });
    }

    const data = await QuestionSet.find({ user: userId });
    console.log(data);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No history found for this user.",
      });
    }

    res.status(200).json({
      success: true,
      history: data,
    });
  } catch (error) {
    console.error("Error in user history controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

export const storeResult = async (req, res) => {
  try {
    const userId = req.user?.id; // Assuming `isAuthenticated` middleware adds `req.user`
    const { correctans, questionId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Please log in first.",
      });
    }

    const newTestResult = new TestResult({
      user: userId,
      test: questionId,
      correctans,
    });

    //console.log(newTestResult);
    await newTestResult.save();

    return res.status(201).json({
      message: "Test result saved successfully",
      data: newTestResult,
    });
  } catch (error) {
    console.error("Error in storeResult controller:", error);
    return res.status(500).json({
      message: "An error occurred while storing answer",
      error: error.message,
    });
  }
};
export const fetchTestResult = async (req, res) => {
  try {
    let userId = req.user?.id;

    userId = new mongoose.Types.ObjectId(userId);
    console.log("user id : ", userId);
    let { qnId } = req.body;
    console.log("qn id (before conversion):", qnId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Please log in first.",
      });
    }

    if (!qnId) {
      return res.status(400).json({
        success: false,
        message: "Question ID is required.",
      });
    }

    // Convert qnId to ObjectId
    if (!mongoose.Types.ObjectId.isValid(qnId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Question ID format.",
      });
    }

    qnId = new mongoose.Types.ObjectId(qnId);
    console.log("qn id (after conversion):", qnId);

    const data = await TestResult.find({ test: qnId });
    console.log("Fetched test results:", data);

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No test history found for this user.",
      });
    }

    res.status(200).json({
      success: true,
      result: data,
    });
  } catch (error) {
    console.error("Error in fetchTestResult controller:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching test results.",
      error: error.message,
    });
  }
};
