import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const EnterOTP = () => {
  const location = useLocation();
  const inputRef = useRef([]);
  const email = location.state?.email;
  const navigate = useNavigate();
  const [otpDisabled, setOtpDisabled] = useState(false);
  // const [isResendOtpDisabled, setIsResendOtpDisabled] = useState(false);

  const [otp, setOtp] = useState(new Array(6).fill(""));

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  const handleOTP = async (event) => {
    setOtpDisabled(true);
    event.preventDefault();
    const otpData = await axios.post(
      `${backendURL}/verify-otp`,
      {
        otp: otp.join(""),
        email,
      },
      { withCredentials: true }
    );
    if (otpData.data.error) {
      setOtpDisabled(false);
      toast.error(otpData.data.error);
    } else {
      setOtpDisabled(false);
      setOtp([""]);
      toast.success(otpData.data.success);

      navigate("/private", { state: { email } });
    }
  };

  const handleOtpChange = (event, idx) => {
    const val = event.target.value;
    if (/^\d?$/.test(val)) {
      const updateOtpVal = [...otp];
      updateOtpVal[idx] = val;
      // console.log(updateOtpVal);
      setOtp(updateOtpVal);
      if (val && idx < 5) {
        inputRef.current[idx + 1].focus();
      }
    }
  };

  const handleOtpKeyDown = (event, idx) => {
    if (event.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRef.current[idx - 1].focus();
    }
  };

  const handleOtpSending = async (event) => {
    setOtpDisabled(true);
    event.preventDefault();
    const otpData = await axios.post(
      `${backendURL}/send-otp`,
      { email },
      { withCredentials: true }
    );
    // console.log(otpData.data);
    if (otpData.data.error) {
      setOtpDisabled(true);
      toast.error(otpData.data.error + ". Try Login Again.");
      setOtpDisabled(false);
    } else {
      setOtpDisabled(false);
      toast.success(otpData.data.success);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleOTP}>
          <label
            style={{
              marginLeft: "20px",
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Enter OTP
          </label>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "50px",
            }}
          >
            {otp.map((otpVal, idx) => {
              return (
                <input
                  key={idx}
                  maxLength="1"
                  type="text"
                  className="form-control text-center"
                  style={{
                    marginLeft: "20px",
                    width: "48px",
                    fontSize: "1.5rem",
                    border: "2px solid grey",
                    backgroundColor: "#FEF8DD",
                  }}
                  value={otpVal}
                  onChange={(event) => {
                    handleOtpChange(event, idx);
                  }}
                  onKeyDown={(event) => handleOtpKeyDown(event, idx)}
                  ref={(element) => (inputRef.current[idx] = element)}
                ></input>
              );
            })}
          </div>
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center">
              <button
                className="btn btn-warning btn-lg my-4"
                type="submit"
                disabled={otpDisabled}
              >
                Submit
              </button>
              <button
                className="btn btn-dark btn-lg"
                onClick={handleOtpSending}
                disabled={otpDisabled}
              >
                Send OTP
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EnterOTP;
