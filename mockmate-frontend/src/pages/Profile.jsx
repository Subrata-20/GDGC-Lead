import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Accordion from "../components/Accordian";
import { Context } from "../main";
import axios from "axios";

const Profile = () => {
  const { user } = useContext(Context);
  const [history, setHistory] = useState([]);
   
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          "https://gdgc-lead-3.onrender.com/api/v1/question/getHistory",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        //console.log(res.data.history)
        setHistory(res.data.history);
      } catch (error) {
        console.error("Error details:", error);
        toast.error("Error fetching  history:", error);
      }
    };
    fetchHistory();

  }, []);
  // history.map((item, idx) => (
  //   //console.log(item)
   
  // ))
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="flex justify-center items-center h-full">
          <div className="w-full max-w-6xl md:w-full lg:w-full mb-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
              <div className="flex flex-col md:flex-row md:h-full lg:h-full">
                {/* Left gradient section with profile image */}
                <div
                  className="md:w-1/3 md:min-h-screen text-center text-white"
                  style={{
                    background:
                      "linear-gradient(to right bottom, rgba(72, 87, 170, 1), rgba(56, 239, 125, 1))",
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="w-20 h-20 rounded-full mx-auto my-5 object-cover"
                  />
                  <h5 className="font-semibold text-lg">{user.username}</h5>
                  <p className="mb-2">Learner</p>
                  <i className="far fa-edit mb-5"></i>
                </div>

                {/* Right information section */}
                <div className="md:w-2/3">
                  <div className="p-4 md:p-6 mt-2 lg:p-8">
                    <h6 className="font-semibold">Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="flex flex-wrap pt-1">
                      <div className="w-1/2 mb-3">
                        <h6 className="font-semibold text-sm">Email</h6>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                      </div>
                    </div>

                    <h6 className="font-semibold mt-2 md:mt-8">History</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="flex flex-wrap justify-center pt-1">
                      {history.map((item, idx) => (
                        <Accordion key={idx} data={item} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
