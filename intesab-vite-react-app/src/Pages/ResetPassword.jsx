import React from "react";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRef } from "react";
import { useEffect } from "react";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const ResetPassword = () => {
  const passwordRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const otpPurpose = location.state?.otpPurpose;
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    passwordRef.current.focus();
  });
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordVisibility = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setIsDisabled(true);
    const data = await axios.post(
      `${backendURL}/reset-password`,
      { email, password, otpPurpose },
      { withCredentials: true }
    );

    if (data.data.error) {
      toast.error(data.data.error);
      setIsDisabled(false);
      return;
    }
    toast.success(data.data.success);
    setPassword("");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  return (
    <>
      <form onSubmit={handleResetPassword}>
        <div className="d-flex flex-column align-items-center mt-5">
          <div className="position-relative w-50 my-3">
            <input
              className="form-control pe-5"
              ref={passwordRef}
              placeholder="Enter New Password"
              value={password}
              onChange={handlePasswordChange}
              style={{
                border: "2px solid grey",
                height: "50px",
                fontSize: "20px",
              }}
              type={showPassword ? "text" : "password"}
            />
            <span
              className={`bi ${
                showPassword ? "bi-eye-slash" : "bi-eye"
              } position-absolute`}
              onClick={handlePasswordVisibility}
              style={{
                top: "50%",
                right: "15px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#6c757d",
                zIndex: 2,
              }}
            ></span>
          </div>
          <button
            type="submit"
            className="btn btn-success btn-lg"
            disabled={isDisabled}
          >
            Reset Password
          </button>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
