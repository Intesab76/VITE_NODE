import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation, data } from "react-router-dom";
import toast from "react-hot-toast";
// import { useThemeMode } from "../Controllers/TextThemeContext";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const PrivateRoute = () => {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  const [showMesssage, setShowMessage] = useState([]);
  const [picture, setPicture] = useState(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  // const [textColor, setTextColor] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  // const { theme, themeHandler } = useThemeMode();

  // useEffect(() => {
  //   if (theme === "Light") {
  //     console.log("THEME COLOR::", theme);
  //     setTextColor("blue");
  //   } else {
  //     console.log("THEME COLOR::", theme);
  //     setTextColor("pink");
  //   }
  // }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`${backendURL}/private`, {
          withCredentials: true,
        });

        if (data.status === 200 && data.data) {
          setShowMessage(data.data.success);
          setPicture(data.data.imageUrl);
          setName(data.data.name);
          setGender(data.data.gender);
          setShowBtn(true);
        } else {
          toast.error(data.data.error);
          // console.log("Cookie Deleted.");
          navigate("/login");
        }
      } catch (error) {
        setShowBtn(false);
        navigate("/login");
        // console.log("Not Authenticated");
        setShowMessage("Not logged In");
      }
    };
    fetchData();
  }, []);

  const handleSignOut = async (event) => {
    event.preventDefault();
    const resp = await axios.post(
      `${backendURL}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    setName("");
    setPicture(null);
    setGender("");
    setShowMessage("Signed Out");
    setShowBtn(false);

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleUpdateData = () => {
    setIsDisabled(true);
    setTimeout(() => {
      navigate("/update", { state: email, gender, name, picture });
    }, 2000);
  };

  return (
    <>
      <h2
        style={{
          textAlign: "center",
          marginTop: "30px",
          fontWeight: "800",
          color: "#A52A2A",
        }}
      >
        Name : {name}
      </h2>
      <p
        style={{
          textAlign: "center",
          fontWeight: "900",
          fontSize: "23px",
          color: "#A52A2A",
        }}
      >
        Gender : {gender}
      </p>

      {picture ? (
        <img
          src={picture}
          alt="profile"
          style={{
            marginTop: "30px",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            height: "300px",
            width: "450px",
            border: "2px solid black",
            borderRadius: "20px",
          }}
        />
      ) : (
        ""
      )}
      <br></br>
      {showBtn ? (
        <button
          type="button"
          className="btn btn-sm"
          disabled={isDisabled}
          style={{
            margin: "auto",
            border: "2px solid grey",
            // borderRadius:
            backgroundColor: "#FFEAD8",
            display: "flex",
            justifyContent: "center",
            marginTop: "-10px",
            marginBottom: "5px",
            fontWeight: "600",
            fontSize: "17px",
            width: "450px",
          }}
          onClick={handleUpdateData}
        >
          <i className="bi bi-pencil me-2">Edit the Data</i>
        </button>
      ) : (
        ""
      )}

      {showBtn ? (
        <button
          className="btn btn-danger my-1"
          // disabled
          onClick={handleSignOut}
          style={{
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            width: "450px",
          }}
          disabled={isDisabled}
        >
          Sign Out
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default PrivateRoute;
