import React, { useState } from "react";
import Signup from "./Signup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const UpdateData = () => {
  const navigate = useNavigate();
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [updatedGender, setupdatedGender] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleUpdatedData = async (event) => {
    setIsDisabled(true);
    event.preventDefault();
    const formData = new FormData();
    if (updatedName) {
      formData.append("name", updatedName);
    }
    if (updatedEmail) {
      formData.append("email", updatedEmail);
    }
    if (updatedPassword) {
      formData.append("password", updatedPassword);
    }
    if (updatedGender) {
      formData.append("gender", updatedGender);
    }
    if (updatedImage) {
      formData.append("image", updatedImage);
    }
    const data = await axios.put(`${backendURL}/update`, formData, {
      withCredentials: true,
    });
    if (data.data.success) {
      setIsDisabled(false);
      setUpdatedName("");
      setUpdatedEmail("");
      setUpdatedImage("");
      setUpdatedPassword("");
      setupdatedGender("");

      toast.success(data.data.success);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      toast.error(data.data.error);
      setIsDisabled(false);
    }
  };

  const handleBackBtn = () => {
    navigate("/private");
  };

  return (
    <>
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ marginTop: "55px" }}
      >
        <button
          className="mx-2"
          style={{
            marginBottom: "420px",
            border: "10px solid white",
            borderRadius: "20px ",
            backgroundColor: "#D9EAFD",
            fontSize: "20px",
            fontWeight: "500",
          }}
          onClick={handleBackBtn}
        >
          Back
        </button>
        <div
          className="card p-3 shadow-lg"
          style={{
            width: "100%",
            maxWidth: "400px",
            border: "2px solid grey",
            borderRadius: "20px",
            backgroundColor: "#FFF0F5",
          }}
        >
          <form onSubmit={handleUpdatedData}>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="form-label"
                style={{ fontSize: "20px", fontWeight: "600" }}
              >
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Update your name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="form-label"
                style={{ fontSize: "20px", fontWeight: "600" }}
              >
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="your_name@example.com"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label"
                style={{ fontSize: "20px", fontWeight: "600" }}
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="**************"
                value={updatedPassword}
                onChange={(e) => setUpdatedPassword(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <input
                type="file"
                className="form-control w-100"
                onChange={(e) => setUpdatedImage(e.target.files[0])}
                style={{
                  width: "240px",
                  border: "1px solid black",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              ></input>
            </div>
            <div className="mb-2">
              <label className="mb-2 my-2">
                <select
                  value={updatedGender}
                  style={{
                    width: "300px",
                    fontWeight: "500",
                    marginLeft: "3px",
                    border: "2px solid grey",
                    borderRadius: "10px",
                    height: "40px",
                    fontSize: "20px",
                    // fontWeight: "600",
                  }}
                  onChange={(e) => setupdatedGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
            </div>
            <button
              type="submit"
              className="btn w-100 my-1"
              disabled={isDisabled}
              style={{
                marginTop: "-15px",
                border: "2px solid black",
                borderRadius: "40px",
                backgroundColor: "#901E3E",
                color: "#F5ECD5",
                fontWeight: "700",
                fontSize: "20px",
              }}
            >
              Click to Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateData;
