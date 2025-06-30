import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const RedirectedAuth = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    axios
      .get(`${backendURL}/private`, { withCredentials: true })
      .then((res) => {
        if (res.data.name && res.data.imageUrl && res.data.gender) {
          setAuthUser(true);
        } else {
          setAuthUser(false);
        }
      })
      .catch((error) => {
        console.log("Error Occurred", error.message);
        setAuthUser(false);
      });
  }, []);

  if (authUser === null) return "";

  return authUser ? <Navigate to="/private" replace /> : children;
};

export default RedirectedAuth;
