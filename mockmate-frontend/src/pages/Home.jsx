import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Link} from "react-router-dom"
const Home = () => {
  return (
    <div className="min-h-screen bg-stone-200 ">

      <main className="">
        <div className="flex flex-col md:p-20 gap-[50px] md:flex-row items-center p-5 ">
          <div className="flex flex-col gap-8 md:w-[50%]">
            <p className="text-4xl font-semibold text-green-800">
              Mock It Till You Rock It with MockMate!
            </p>
            <p className="text-xl text-green-700 mt-2">
              The best way to predict your results is to practice for them.
            </p>
            <Link to={"/mock"} className="px-3  w-[210px] py-3 rounded-md bg-green-800 text-white font-semibold hover:bg-green-900">
              <p className="px-1"> Start Learning Now</p>
            </Link>
          </div>
          <div className="">
            <img src="books.jpg" alt="" />
          </div>
        </div>

        <div className="bg-green-950 p-6 md:flex md:flex-col md:justify-center md:items-center font-serif ">
          <div className="md:flex md:gap-10 md:flex-row justify-start items-end ">
            <div className="p-5">
              <img
                src="mock.webp"
                className="rounded-sm border-2 md:w-[600px] border-white"
                alt="Mock Test"
              />
            </div>
            <div className="text-gray-200 p-5">
              <p className="text-2xl font-serif mb-8 md:mb-24">| MockMate Tests</p>
              <p className="text-3xl font-semibold md:w-[300px]">
                Start Your Journey With MockMate
              </p>
            </div>
          </div>

          <div className="text-gray-200 p-4 flex  md:items-start md:w-[70%] flex-col gap-2 md:left-0 ">
            <p className="text-[17px] font-semibold">
              MockMate is an online platform designed to help students and
              professionals prepare for exams through interactive mock tests. It
              provides a realistic test-taking experience with timed quizzes,
              multiple-choice questions, and instant feedback. Whether for
              competitive exams, job assessments, or academic practice, MockMate
              helps users improve their skills and boost their confidence.
            </p>
            <Link to={"/mock"} className="text-xl w-[170px] hover:scale-105 transition-all duration-300 py-2 mt-4 font-semibold  rounded-md bg-gray-200 text-green-900">
             <p className="px-6">Take Test</p> 
            </Link>
          </div>
        </div>

      
      </main>
    </div>
  );
};

export default Home;
