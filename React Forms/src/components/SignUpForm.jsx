import React, { useState } from 'react';

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignup = async () => {
    if (username.length < 3) {
      setMessage("Username must be at least 3 characters.");
      setIsSuccess(false);
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        setMessage(data.message);
        setIsSuccess(true);
      } else {
        setMessage("Signup failed: " + data.message);
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
      setIsSuccess(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-4">Signup</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded mb-2 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded mb-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
          onClick={handleSignup}
        >
          Signup
        </button>
      </form>
      <p className={isSuccess ? "text-green-500 mt-2" : "text-red-500 mt-2"}>
        {message}
      </p>
    </div>
  );
}

export default SignupForm;