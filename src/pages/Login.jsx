import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

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
    <section className="w-screen h-screen">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="User Name"
          onChange={handleChange}
          onKeyDown = {onkeydown}
          value={user.username}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          onKeyDown = {onkeydown}
          value={user.password}
          required
        />
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default Login;
