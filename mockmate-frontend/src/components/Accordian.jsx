import React, { useContext, useState } from "react";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const Accordion = ({ data }) => {
  const { setSelectedData } = useContext(Context);
  const navigate = useNavigate();
  console.log(data)
  const handleClick = () => {
    setSelectedData(data); // Store data in state
    navigate("/previoustest"); // Navigate to FullTest page
  };

  return (
    <div className="w-[300px] h-[130px] bg-[linear-gradient(to_right_bottom,_rgba(82,87,150,1),_rgba(56,239,125,1))] m-2 p-2 rounded-sm transition-all duration-500 shadow-md">
      <div className="flex justify-center text-2xl text-white font-semibold">
        <p>{data.topic.toUpperCase()} TEST</p>
      </div>
      <div className="flex justify-between text-[17px] p-1 text-gray-100">
        <p>Topic: {data.topic.toUpperCase()}</p>
        <p>Difficulty: {data.difficulty}</p>
      </div>
      <div className="flex justify-center items-center mt-2">
        <button
          className="text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 flex justify-center items-center border-1 p-1 font-medium"
          onClick={handleClick}
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default Accordion;
