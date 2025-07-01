import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const otpLoginProp = "loginOtp";
  const otpPurpose = "LoginUser";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginDisabled, setIsLoginDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignupDisabled, setIsSignupDisabled] = useState(false);

  const handleLogin = async (event) => {
    setIsLoginDisabled(true);
    event.preventDefault();
    const data = await axios.post(
      `${backendURL}/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    if (data.data.error) {
      toast.error(data.data.error);
      setIsLoginDisabled(false);
    } else {
      toast.success(data.data.success);
      setEmail("");
      setPassword("");
      const otpData = await axios.post(
        `${backendURL}/send-otp`,
        {
          email,
        },
        { withCredentials: true }
      );
      setIsLoginDisabled(false);
      if (!email) {
        navigate("/login");
      }
      // setTimeout(() => {
      navigate("/otp", { state: { email, otpPurpose, otpLoginProp } });
      // }, 2000);
    }
  };

  const handleSignup = (event) => {
    setIsSignupDisabled(true);
    event.preventDefault();
    setIsSignupDisabled(false);
    navigate("/signup");
  };
  const handleForgotPassword = (event) => {
    event.preventDefault();
    navigate("/forgot-password");
  };
  const handlePasswordVisibility = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <div
          className="card p-4 shadow-lg"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h3 className="text-center mb-3">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="**************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className={`bi ${
                  showPassword ? "bi-eye-slash" : "bi-eye"
                } position-absolute`}
                onClick={handlePasswordVisibility}
                style={{
                  top: "38px",
                  right: "10px",
                  cursor: "pointer",
                  color: "#6c757d",
                  zIndex: 2,
                }}
              ></span>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={isLoginDisabled}
            >
              Log In
            </button>
            <a
              style={{ cursor: "pointer" }}
              onClick={handleForgotPassword}
              className="text-decoration-none text-secondary d-block text-end mt-2"
            >
              Forgot Password
            </a>
            <p
              style={{
                marginTop: "7px",
                marginBottom: "3px",
                fontWeight: "700",
              }}
            >
              New User? Signup Below.
            </p>
            <button
              type="submit"
              className="btn btn-dark w-100 my-1"
              onClick={handleSignup}
              disabled={isSignupDisabled}
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
