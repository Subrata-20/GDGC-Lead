import React, { useContext, useState } from "react";
import QuizPage from "./QuizPage";
import axios from "axios";
import toast from "react-hot-toast";
import {Context} from "../main"
import { useNavigate } from "react-router-dom";
const MockPage = () => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [isLoading, setIsLoading] = useState(false);
  const [test, setTest] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const {isAuthenticated} =useContext(Context)
  const [testId,setTestId] = useState("")
  const navigateTo = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isAuthenticated)
    {
      navigateTo("/login")
    }
    if (!topic || !difficulty) {
      toast.success("All the fields are required");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5002/api/v1/question/generate-qn",
        { topic, difficulty },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      
      const questionData = res.data.data;
       setTestId(res.data.testId)
      const questionsArray =
        typeof questionData === "string"
          ? JSON.parse(questionData)
          : questionData;
      //console.log("Questions array:", questionsArray);
      // Ensure it's an array
      setTest(Array.isArray(questionsArray) ? questionsArray : []);
      //console.log("test: ", test);
      setIsLoading(false);
      setShowQuiz(true);
    } catch (error) {
      setIsLoading(false);
      console.error("Error details:", error);
      toast.error("Please Login to continue");
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      {!showQuiz ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
          <form onSubmit={handleSubmit}>
            <div className="shadow-lg rounded-lg p-8 bg-green-200 w-[400px]">
              <h2 className="text-3xl bg-green-600 p-3 w-full rounded-md font-bold text-white mb-6 text-center">
                Generate a Test
              </h2>

              <label className="block text-gray-800 font-medium mb-2 text-lg">
                Topic
              </label>
              <input
                type="text"
                placeholder="Enter Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border-2 border-green-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400 mb-5 bg-green-100 text-green-900 text-lg"
              />

              <label className="block text-gray-800 font-medium mb-2 text-lg">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full border-2 border-green-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400 mb-5 bg-green-100 text-green-900 text-lg"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white text-xl font-semibold py-3 rounded-lg hover:bg-green-700 transition-all duration-300 disabled:bg-green-400"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating Questions...
                  </div>
                ) : (
                  "Generate Test"
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="pt-6">
          <div className="max-w-4xl mx-auto flex justify-between items-center mb-6 px-4">
            <h1 className="text-2xl font-bold text-green-800">
              {topic} - {difficulty} Quiz
            </h1>
            <button
              onClick={() => setShowQuiz(false)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Back to Generator
            </button>
          </div>
          <QuizPage questions={test} testId={testId}/>
        </div>
      )}
    </div>
  );
};

export default MockPage;
