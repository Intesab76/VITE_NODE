import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handleDashboardBtn = () => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <img
          src="https://www.cloudns.net/blog/wp-content/uploads/2023/10/Error-404-Page-Not-Found.png"
          alt=""
          className="img-fluid"
          style={{ height: "300px", width: "400px", marginTop: "60px" }}
        />
      </div>
      <div className="d-flex justify-content-center my-3">
        <button className="btn btn-dark" onClick={handleDashboardBtn}>
          Go to Dashboard
        </button>
      </div>
    </>
  );
};

export default NotFound;
