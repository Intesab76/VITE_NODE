import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AuthRequired = ({ children }) => {
  const navigate = useNavigate();
  // console.log("Authorised User");
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(`${backendURL}/private`, {
          withCredentials: true,
        });
        // console.log("DATA FROM AUTH PAGE:: ", data);
        if (data.data.error) {
          toast.error(data.data.error);
          setTimeout(() => {
            setAuthenticated(false);
            navigate("/login");
          }, 2000);
        } else {
          setAuthenticated(true);
          toast.success("Logged in ");
        }
      } catch (error) {}
    };
    getData();
    // .then((res) => {
    //   // console.log("Authorised");
    //   if (res.data.name && res.data.image) {
    //     setAuthenticated(true);
    //   } else {
    //     setAuthenticated(false);
    //   }
    // })
    // .catch((error) => console.log("Error Occurred ", error));
  }, []);

  if (authenticated === null) return <p> </p>;

  return authenticated ? children : <Navigate to="/login" replace />;
};

export default AuthRequired;
