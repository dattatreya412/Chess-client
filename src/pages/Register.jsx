import React, { useState } from "react";
import axios from "axios";
import CountrySelector from "../components/Register/CountrySelector";
import { useNavigate } from "react-router";

const inputStyles = "bg-black bg-opacity-45 outline-none";


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
      alert("Password mismatched.");
      return;
    }
    const messageCreationResponse = await axios.post(
      "http://localhost:4000/notes",
      { notes: [] }
    );
    console.log(JSON.stringify(messageCreationResponse.data.newNotes._id));
     
    try {
      const updatedDetails = {
        ...registrationDetails,
        password: passwords.password,
        playerNotes: messageCreationResponse.data.newNotes._id,
      };
      console.log(updatedDetails);

      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        updatedDetails
      );
      console.log(response);
      navigate("/");
    } catch (err) {
      console.error("Error during registration:", err);
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
    <section>
      <form className="flex flex-col" onSubmit={handleRegistration}>
        <div>
          <label>User Name: </label>
          <input
            type="text"
            name="username"
            className={inputStyles}
            onChange={handleChange}
            value={registrationDetails.username}
            required
          />
        </div>
        <div>
          <label>First Name: </label>
          <input
            type="text"
            name="firstName"
            className={inputStyles}
            onChange={handleChange}
            value={registrationDetails.firstName}
            required
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input
            type="text"
            name="lastName"
            className={inputStyles}
            onChange={handleChange}
            value={registrationDetails.lastName}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            className={inputStyles}
            onChange={handleChange}
            value={registrationDetails.email}
            required
          />
        </div>
        <CountrySelector
          onChange={handleChange}
          value={registrationDetails.country}
        />
        <div>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            className={inputStyles}
            onChange={handlePassword}
            value={passwords.password}
            required
          />
        </div>
        <div>
          <label>Conform Password: </label>
          <input
            type="password"
            name="conformPassword"
            className={inputStyles}
            onChange={handlePassword}
            value={passwords.conformPassword}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default Register;
