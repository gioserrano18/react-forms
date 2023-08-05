import React from "react";
import SignupForm from "./components/SignUpForm";
import AuthenticateButton from "./components/AuthenticateButton";
import "./App.css"

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <SignupForm />
      <AuthenticateButton />
    </div>
  );
}

export default App;