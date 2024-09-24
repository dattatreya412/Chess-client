import React, { useState } from "react";
import axios from "axios";
import CountrySelector from "../components/Register/CountrySelector";
import { useNavigate } from "react-router";

const inputStyles = "w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelStyles = "block mb-2 text-sm font-medium text-gray-300";
const buttonStyles = "w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300";

const Register = () => {
  const [passwords, setPasswords] = useState({
    password: "",
    conformPassword: "",
  });
 
  const navigate = useNavigate();
  const [registrationDetails, setRegistrationDetails] = useState({
    username: "",
    firstName: "",
    lastName: "", 
    email: "",
    country: "",
    password: "",
    playerNotes: "",
  });

  async function handleRegistration(event) {
    event.preventDefault();
    if (passwords.password !== passwords.conformPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const messageCreationResponse = await axios.post(
        "http://localhost:4000/notes",
        { notes: [] }
      );
      
      const updatedDetails = {
        ...registrationDetails,
        password: passwords.password,
        playerNotes: messageCreationResponse.data.newNotes._id,
      };

      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        updatedDetails
      );
      console.log(response);
      navigate("/");
    } catch (err) {
      console.error("Error during registration:", err);
      alert("Registration failed. Please try again.");
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setRegistrationDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  function handlePassword(event) {
    const { name, value } = event.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  }

  return (
    <section className="pt-20 h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegistration}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="username" className={labelStyles}>
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={inputStyles}
                placeholder="Username"
                onChange={handleChange}
                value={registrationDetails.username}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="firstName" className={labelStyles}>
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className={inputStyles}
                placeholder="First Name"
                onChange={handleChange}
                value={registrationDetails.firstName}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className={labelStyles}>
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className={inputStyles}
                placeholder="Last Name"
                onChange={handleChange}
                value={registrationDetails.lastName}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className={labelStyles}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={inputStyles}
                placeholder="Email address"
                onChange={handleChange}
                value={registrationDetails.email}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="country" className={labelStyles}>
                Country
              </label>
              <CountrySelector
                onChange={handleChange}
                value={registrationDetails.country}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className={labelStyles}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={inputStyles}
                placeholder="Password"
                onChange={handlePassword}
                value={passwords.password}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="conformPassword" className={labelStyles}>
                Confirm Password
              </label>
              <input
                id="conformPassword"
                name="conformPassword"
                type="password"
                autoComplete="new-password"
                required
                className={inputStyles}
                placeholder="Confirm password"
                onChange={handlePassword}
                value={passwords.conformPassword}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={buttonStyles}
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/")}
              className="font-medium text-blue-500 hover:text-blue-400 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
