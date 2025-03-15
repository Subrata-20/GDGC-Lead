import React, { useState, useEffect } from "react";
import axios from "axios";
const QuizPage = ({ questions, testId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [questionsArray, setQuestionsArray] = useState([]);

  useEffect(() => {
    if (questions) {
      if (Array.isArray(questions)) {
        setQuestionsArray(questions);
      } else {
        try {
          const parsedQuestions =
            typeof questions === "string" ? JSON.parse(questions) : questions;
          setQuestionsArray(
            Array.isArray(parsedQuestions) ? parsedQuestions : []
          );
        } catch (error) {
          console.error("Error parsing questions:", error);
          setQuestionsArray([]);
        }
      }
    } else {
      setQuestionsArray([]);
    }
  }, [questions]);

  useEffect(() => {
    // Initialize selectedAnswers with empty values for all questions
    if (questionsArray && questionsArray.length > 0) {
      const initialAnswers = {};
      questionsArray.forEach((_, index) => {
        initialAnswers[index] = null;
      });
      setSelectedAnswers(initialAnswers);
    }
  }, [questionsArray]);

  const handleAnswerSelect = (questionIndex, answerKey) => {
    if (!isSubmitted) {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionIndex]: answerKey,
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    setTimeout(async () => {
      let correctAnswers = 0;
      let questionIds = [];

      questionsArray.forEach((question, index) => {
        if (selectedAnswers[index] === question.answer.key) {
          correctAnswers++;
        }
        questionIds.push(question.id); // Assuming each question has an ID
      });

      setScore(correctAnswers);
      setIsSubmitted(true);
      setLoading(false);

      // Send data to backend
      try {
        const response = await axios.post(
          "http://localhost:5002/api/v1/question/store-result", // Update with your backend URL
          {
            correctans: correctAnswers,
            questionId: testId,
          },
          {
            withCredentials: true, // Ensures cookies (if using JWT session)
          }
        );
        console.log("Response from server:", response.data);
      } catch (error) {
        console.error(
          "Error storing result:",
          error.response?.data || error.message
        );
      }
    }, 1000);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setCurrentQuestion(0);
  };

  const navigateToQuestion = (index) => {
    if (index >= 0 && index < questionsArray.length) {
      setCurrentQuestion(index);
    }
  };

  if (!questionsArray || questionsArray.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-xl text-gray-600">No questions available</p>
      </div>
    );
  }

  return (
    <div className="bg-green-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        {/* Question navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 px-4">
          {questionsArray.map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToQuestion(index)}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentQuestion === index
                  ? "bg-green-600 text-white"
                  : selectedAnswers[index]
                  ? "bg-green-200 text-green-800"
                  : "bg-white text-green-800 border border-green-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Question card */}
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-300">
          <div className="border-b pb-3 mb-4 flex justify-between">
            <p className="text-xl font-semibold">
              Question {currentQuestion + 1}
            </p>
            <p className="text-gray-600">
              {currentQuestion + 1} of {questionsArray.length}
            </p>
          </div>

          <p className="text-gray-800 font-medium mb-6 text-lg">
            {questionsArray[currentQuestion].question}
          </p>

          <div className="space-y-4 mb-6">
            {questionsArray[currentQuestion].options.map((option) => (
              <div
                key={option.key}
                onClick={() => handleAnswerSelect(currentQuestion, option.key)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  isSubmitted
                    ? option.key === questionsArray[currentQuestion].answer.key
                      ? "bg-green-200 border-2 border-green-500"
                      : selectedAnswers[currentQuestion] === option.key
                      ? "bg-red-200 border-2 border-red-500"
                      : "bg-gray-100"
                    : selectedAnswers[currentQuestion] === option.key
                    ? "bg-green-100 border-2 border-green-400"
                    : "bg-gray-100 hover:bg-green-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                      selectedAnswers[currentQuestion] === option.key
                        ? "bg-green-600 text-white"
                        : "border border-gray-500 text-gray-700"
                    }`}
                  >
                    {option.key.toUpperCase()}
                  </div>
                  <p className="text-gray-800">{option.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigateToQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
              className={`px-4 py-2 rounded-lg ${
                currentQuestion === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-green-100 text-green-800 hover:bg-green-200"
              }`}
            >
              Previous
            </button>

            {currentQuestion < questionsArray.length - 1 ? (
              <button
                onClick={() => navigateToQuestion(currentQuestion + 1)}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Next
              </button>
            ) : !isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300"
              >
                {loading ? "Submitting..." : "Submit Quiz"}
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Retry
              </button>
            )}
          </div>
        </div>

        {/* Results section */}
        {isSubmitted && (
          <div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6 border border-gray-300">
            <h2 className="text-2xl font-bold text-center mb-4">
              Quiz Results
            </h2>
            <div className="flex justify-center items-center mb-6">
              <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{score}</p>
                  <p className="text-sm text-green-800">
                    out of {questionsArray.length}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-center text-lg mb-4">
              You scored {((score / questionsArray.length) * 100).toFixed(0)}%
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleRetry}
                className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
