import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MockPage from "./pages/MockPage";
import SignUp from "./pages/Signup";
import { Context } from "./main";
import Cookies from "js-cookie";
import axios from "axios";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import FullPage from "./pages/FullPage";
function App() {
  
  const {
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    user,
    history,
    setHistory,
    selectedData,
    setSelectedData
   
  } = useContext(Context);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const fetchUser = async () => {
        const res = await axios.get(
          "http://localhost:5002/api/v1/user/getUser",
          {
            withCredentials: true,
          }
        );
        setUser(res.data.user[0])
       // console.log(user)
        if (user) {
          setIsAuthenticated(true);
        }
      };
      fetchUser();
    }
  }, []);
 //console.log(user)
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mock" element={<MockPage />} />
          <Route path="/dashboard" element={<Profile user={user}/>} />
          <Route path="/previoustest" element={<FullPage data={selectedData}/>} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
