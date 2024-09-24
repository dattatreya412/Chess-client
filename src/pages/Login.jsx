import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        user
      );
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("Chess:username", user.username);
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  }

  function handleChange(event) {
    setUser((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function onKeyDown(event){
    if(event.key === 'Enter'){
      handleLogin(event)
    }
  }

  return (
    <section className="w-screen h-screen flex items-center justify-center ">
      <div className="bg-gray-700 bg-opacity-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <form onSubmit={handleLogin} className="mb-4">
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="username"
              placeholder="User Name"
              onChange={handleChange}
              onKeyDown={onKeyDown}
              value={user.username}
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onKeyDown={onKeyDown}
              value={user.password}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-medium text-blue-500 hover:text-blue-400 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
