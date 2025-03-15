import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token") || localStorage.getItem("token");

      if (!token) {
        toast.error("No token found!");
        return;
      }

      await axios.get("http://localhost:5002/api/v1/user/logout", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token
        },
      });

      Cookies.remove("token", { path: "/" });
      localStorage.removeItem("token");
      setIsAuthenticated(false);

      toast.success("Logged out successfully");
      setTimeout(() => navigateTo("/"), 500);
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="flex justify-between items-center p-6 md:px-20">
      <div>
        <Link to={"/"} className="text-3xl text-green-700 font-serif">
          MockMate
        </Link>
      </div>
      <div className="text-xl text-green-700 font-serif flex justify-center items-center gap-8">
        <Link to={"/mock"}>
          <p className="cursor-pointer ">Give Mock</p>
        </Link>
        {isAuthenticated ? (
          <Link to={"/dashboard"}>
            <p className="cursor-pointer ">Dashboard</p>
          </Link>
        ) : null}

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="px-3 cursor-pointer py-2 rounded-sm text-white bg-red-600 hover:bg-stone-200 hover:border-red-900 hover:text-black transition-all duration-300"
          >
            Logout
          </button>
        ) : (
          <Link
            to={"/signup"}
            className="px-3 cursor-pointer py-2 rounded-sm text-white bg-green-800 hover:bg-stone-200 hover:border-green-900 hover:text-green-800 transition-all duration-300"
          >
            Signup
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
