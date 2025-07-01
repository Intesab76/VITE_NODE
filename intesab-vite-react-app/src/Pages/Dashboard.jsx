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
      <div className="d-flex flex-column align-items-center mt-5">
        <div className="text-center mb-4">
          <p
            className="fw-bold"
            style={{
              fontSize: "30px",
              border: "2px solid grey",
              borderRadius: "10px",
              backgroundColor: "#F5F0CD",
            }}
          >
            New User? Sign up Here.
          </p>
          <button
            className="btn btn-lg"
            style={{
              width: "150px",
              height: "60px",
              backgroundColor: "#00809D",
              fontWeight: "700",
              fontSize: "25px",
              color: "#EFE4D2",
            }}
            onClick={handleSignUp}
            disabled={isBtnDisabled}
          >
            Sign Up
          </button>
        </div>

        <div className="text-center mt-4">
          <p
            className="fw-bold"
            style={{
              fontSize: "30px",
              backgroundColor: "#F5F0CD",
              border: "2px solid grey",

              borderRadius: "10px",
            }}
          >
            Already an existing User? Log In
          </p>
          <button
            className="btn btn-lg"
            onClick={handleLogIn}
            disabled={isBtnDisabled}
            style={{
              width: "150px",
              height: "60px",
              backgroundColor: "#901E3E",
              fontWeight: "700",
              fontSize: "25px",
              color: "#EFE4D2",
            }}
          >
            Log In
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
