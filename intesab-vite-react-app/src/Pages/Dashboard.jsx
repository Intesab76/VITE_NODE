import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const handleSignUp = () => {
    setIsBtnDisabled(true);
    setTimeout(() => {
      navigate("/signup");
    }, 1000);
  };

  const handleLogIn = () => {
    setIsBtnDisabled(true);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <>
      <p style={{ fontWeight: "700", marginTop: "30px", marginLeft: "20px" }}>
        New User? Sign up Here.
      </p>
      <button
        className="btn btn-info my-2 mx-4 btn-lg"
        onClick={handleSignUp}
        disabled={isBtnDisabled}
      >
        Sign Up
      </button>
      <br />
      <br />
      <p style={{ fontWeight: "700", marginTop: "30px", marginLeft: "20px" }}>
        Already an existing User? Log In
      </p>
      <button
        className="btn btn-danger mx-4 btn-lg"
        onClick={handleLogIn}
        disabled={isBtnDisabled}
      >
        Log In
      </button>
    </>
  );
};

export default Dashboard;
