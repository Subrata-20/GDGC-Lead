import React from 'react'

const Form = () => {
  return (
    <div>
       <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
        <div className=" shadow-lg rounded-lg p-8 bg-green-200 w-[400px]">
          <h2 className="text-3xl bg-green-600 p-3 w-full rounded-md font-bold text-white mb-6 text-center">
            Generate a Test
          </h2>

          {/* Topic Input */}
          <label className="block text-gray-800 font-medium mb-2 text-lg">
            Topic
          </label>
          <input
            type="text"
            placeholder="Enter Topic"
            className="w-full border-2 border-green-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400 mb-5 bg-green-100 text-green-900 text-lg"
          />

          {/* Difficulty Dropdown */}
          <label className="block text-gray-800 font-medium mb-2 text-lg">
            Difficulty
          </label>
          <select className="w-full border-2 border-green-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400 mb-5 bg-green-100 text-green-900 text-lg">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Generate Test Button */}
          <button className="w-full bg-green-600 text-white text-xl font-semibold py-3 rounded-lg hover:bg-green-700 transition-all duration-300">
            Generate Test
          </button>
        </div>
      </div>
    </div>
  )
}

export default Form
