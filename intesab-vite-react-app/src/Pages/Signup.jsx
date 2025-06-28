import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [isLoginDisabled, setIsLoginDisabled] = useState(false);
  const [isSignupDisabled, setIsSignupDisabled] = useState(false);

  const handleSignup = async (event) => {
    setIsSignupDisabled(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("image", image);

    const data = await axios.post(`${backendURL}/signup`, formData, {
      withCredentials: true,
    });

    console.log("DATA ", data);
    if (data.data.error) {
      setIsSignupDisabled(false);
      toast.error(data.data.error);
    } else {
      setIsSignupDisabled(false);
      setName("");
      setPassword("");
      setEmail("");
      setGender("");
      setImage("");
      toast.success(data.data.success);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const handleLoginBtn = (event) => {
    setIsLoginDisabled(true);
    event.preventDefault();
    setTimeout(() => {
      setIsLoginDisabled(false);
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ marginTop: "20px" }}
      >
        <div
          className="card p-3 shadow-lg"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h4 className="text-center mb-2">Sign Up</h4>
          <form onSubmit={handleSignup}>
            <div className="mb-2">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="your_name@example.com"
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
                placeholder="**************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="mb-2 my-2">
                <select
                  value={gender}
                  style={{
                    width: "360px",
                    fontWeight: "500",
                    marginLeft: "3px",
                    border: "2px solid grey",
                    borderRadius: "10px",
                    height: "35px",
                  }}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
            </div>
            <div className="mb-2">
              <input
                type="file"
                className="form-control w-100"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ width: "240px", border: "1px solid black" }}
              ></input>
            </div>
            <button
              type="submit"
              className="btn btn-success w-100 my-2"
              style={{ marginTop: "-15px" }}
              disabled={isSignupDisabled}
            >
              Sign Up
            </button>
            <p
              style={{
                marginTop: "2px",
                marginBottom: "3px",
                fontWeight: "700",
              }}
            >
              Already a User? Login Below.
            </p>
            <button
              type="submit"
              className="btn btn-dark w-100 my-1"
              onClick={handleLoginBtn}
              disabled={isLoginDisabled}
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
