import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const ForgotPassword = () => {
  const otpPurpose = "ForgotPassword";
  const emailRef = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    emailRef.current.focus();
  }, []);
  const handleOtpForPasswordReset = async (event) => {
    event.preventDefault();
    setIsDisabled(true);
    const data = await axios.post(`${backendURL}/send-otp`, { email });
    if (data.data.error) {
      toast.error(data.data.error);
      setIsDisabled(false);
    } else {
      setEmail("");
      toast.success(data.data.success);
      setTimeout(() => {
        navigate("/otp", {
          state: { email, otpPurpose },
        });
      }, 2000);
    }
  };

  return (
    <>
      <form onSubmit={handleOtpForPasswordReset}>
        <div className="d-flex flex-column align-items-center mt-5">
          <input
            className="form-control  w-50 my-4"
            ref={emailRef}
            placeholder="Enter Email ID"
            value={email}
            style={{
              border: "2px solid grey",
              height: "50px",
              fontSize: "20px",
            }}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isDisabled}
          ></input>
          <button
            type="submit"
            className="btn btn-info btn-lg"
            disabled={isDisabled}
          >
            Send OTP
          </button>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
