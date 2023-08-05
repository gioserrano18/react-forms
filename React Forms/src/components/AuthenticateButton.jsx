import React, { useState } from "react";

function AuthenticateButton() {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAuthenticate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please signup before authenticating.");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setMessage(data.message);
        setIsSuccess(true);
      } else {
        setMessage("Authentication failed: " + data.message);
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
      setIsSuccess(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMessage("Logged out successfully.");
    setIsSuccess(false);
  };

  return (
    <div className="p-5">
      <button
        className="bg-green-500 text-white p-2 rounded mb-2 w-full"
        onClick={handleAuthenticate}
      >
        Authenticate
      </button>
      <button
        className="bg-red-500 text-white p-2 rounded w-full"
        onClick={handleLogout}
      >
        Logout
      </button>
      <p className={isSuccess ? "text-green-500 mt-2" : "text-red-500 mt-2"}>
        {message}
      </p>
    </div>
  );
}

export default AuthenticateButton;