import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginDisabled, setIsLoginDisabled] = useState(false);
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
      setIsLoginDisabled(false);
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
      if (!email) {
        navigate("/login");
      }
      navigate("/otp", { state: { email } });
    }
  };

  const handleSignup = (event) => {
    setIsSignupDisabled(true);
    event.preventDefault();
    setTimeout(() => {
      setIsSignupDisabled(false);
      navigate("/signup");
    }, 2000);
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

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={isLoginDisabled}
            >
              Log In
            </button>
            <p
              style={{
                marginTop: "25px",
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
