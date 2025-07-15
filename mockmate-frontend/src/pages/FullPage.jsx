import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const FullPage = ({ data }) => {
  const [result, setResult] = useState("");
  const qnId = data._id;

  if (!data || Object.keys(data).length === 0) {
    return <p className="text-red-500 text-xl">No test data available!</p>;
  }

  let questions = [];
  try {
    questions =
      typeof data.questions === "string"
        ? JSON.parse(data.questions)
        : data.questions;
  } catch (error) {
    console.error("Error parsing questions:", error);
  }

  questions = Array.isArray(questions) ? questions : [];

  useEffect(() => {
    if (!qnId) {
      console.log("qnId is undefined, skipping API call.");
      return;
    }

    const fetchResult = async () => {
      try {
        const res = await axios.post(
          "https://gdgc-lead-3.onrender.com/api/v1/question/get-result",
          { qnId },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        const ans = res.data.result;
        setResult(ans[0].correctans);
      } catch (error) {
        console.error("Error fetching result history:", error);
        // toast.error("Error fetching result history");
      }
    };

    fetchResult();
  }, [qnId]);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{data.topic} Test</h1>
          <p className="text-gray-800 font-semibold">
            Difficulty: {data.difficulty}
          </p>
        </div>
        <p className="text-green-600 text-lg font-bold ml-auto">
          Result: {result} / 20
        </p>
      </div>

      <h2 className="text-xl font-semibold mt-4">Questions:</h2>
      <div className="space-y-4 mt-4">
        {questions.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 shadow-md bg-white"
          >
            <h3 className="text-lg font-medium text-blue-600">
              {item.question}
            </h3>
            <ul className="mt-2 space-y-1">
              {Array.isArray(item.options) &&
                item.options.map((option, i) => (
                  <li
                    key={i}
                    className="p-2 border rounded-md bg-gray-100 hover:bg-gray-200"
                  >
                    <strong>{option.key}.</strong> {option.value}
                  </li>
                ))}
            </ul>
            {item.answer && item.answer.key && item.answer.value && (
              <p className="mt-2 text-green-600 font-medium">
                Correct Answer: {item.answer.key}. {item.answer.value}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullPage;
