import React from "react";

const QuizCard = () => {
  return (
    <div className="max-w-md md:max-w-[700px] m-8 mx-auto bg-white shadow-lg rounded-lg p-4 border border-gray-300">
      <div className="border-b pb-2 mb-2">
        <p className="text-lg font-semibold">Question 2</p>
      </div>
      <p className="text-gray-700 font-medium mb-4">
        Which of the following is not a valid declaration in C?
      </p>
      <div className="bg-gray-100 p-3 rounded-lg text-sm font-mono mb-2">
        <p>1. short int x;</p>
      </div>
      <div className="bg-gray-100 p-3 rounded-lg text-sm font-mono mb-2">
        <p>2. signed short x;</p>
      </div>
      <div className="bg-gray-100 p-3 rounded-lg text-sm font-mono mb-2">
        <p>3. short x;</p>
      </div>
      <div className="bg-gray-100 p-3 rounded-lg text-sm font-mono mb-4">
        <p>4. unsigned short x;</p>
      </div>
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center border border-gray-500 rounded-full text-sm">
            A
          </div>
          <p>3 and 4</p>
        </li>
        <li className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center border border-gray-500 rounded-full text-sm">
            B
          </div>
          <p>2</p>
        </li>
        <li className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center border border-gray-500 rounded-full text-sm">
            C
          </div>
          <p>1</p>
        </li>
        <li className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center border border-gray-500 rounded-full text-sm">
            D
          </div>
          <p>All are valid</p>
        </li>
      </ul>
     
    </div>
  );
};

export default QuizCard;
