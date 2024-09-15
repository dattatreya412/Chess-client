// utils/auth.js
import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token) => {
  if (!token) {
    return false; // No token means not valid
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds

    if (decoded.exp < currentTime) {
      return false; // Token has expired
    }
    // console.log("recived a valid Token from Server..");
    return true; // Token is valid
  } catch (error) {
    console.error("Invalid token format:", error);
    return false; // Invalid token format or decoding error
  }
};
