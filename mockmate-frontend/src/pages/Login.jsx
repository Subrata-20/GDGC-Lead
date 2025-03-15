import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  const { setIsAuthenticated } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5002/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(res)
      const token = res.data.token;
      localStorage.setItem("token", token);
      toast.success("Logged in successfully");
      setEmail("");
      setPassword("");
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      toast.error("Error while logging in!!");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="mx-auto my-auto max-w-4xl bg-white rounded-lg shadow-md p-8 flex flex-col justify-center items-center md:flex-row w-full">
        <div className="w-full max-w-md md:w-1/2 md:pr-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-500 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <input
                  type="email"
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-500 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
            >
              Submit
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to={"/signup"}
              className="text-blue-500 hover:underline text-sm"
            >
              Don't have an account ?
            </Link>
          </div>
        </div>

        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <img
            src="Login.jpg"
            alt="Desktop workspace with plants"
            className="w-full rounded-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
