import { createContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TextThemeContext } from "../Controllers/TextThemeContext";

// const Context = createContext();

const Navbar = () => {
  const [backgroundColor, setBackgroundColor] = useState("#f9f4f4");
  const [mode, setMode] = useState("Light");
  const [isHovered, setIsHovered] = useState(false);
  const [loginBtnFeatures, setLoginBtnFeatures] = useState({
    color: "white",
    fontSize: "20px",
  });
  const [signupBtnFeatures, setSignupBtnFeatures] = useState({
    color: "white",
    fontSize: "20px",
  });

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);

  const handleBackgroundColor = () => {
    if (mode === "Light") {
      setBackgroundColor((document.body.style.backgroundColor = "#0B192C"));
      setMode("Dark");
    } else {
      setBackgroundColor((document.body.style.backgroundColor = "#f9f4f4"));
      setMode("Light");
    }
  };

  const loginHandleMouseEnter = () => {
    setIsHovered(true);
    setLoginBtnFeatures({
      color: "maroon",
      border: "2px solid #D11149",
      borderRadius: "10px",
      backgroundColor: "#fdf0d5",
      transition: "background-color 1.5s ease, transform 1.5s ease",
      transform: "scale(1.05)",
      fontSize: "22px",
    });
  };

  const loginHandleMouseLeave = () => {
    setLoginBtnFeatures({
      color: "white",
      fontSize: "20px",
    });
  };

  const signupHandleMouseEnter = () => {
    setSignupBtnFeatures({
      color: "maroon",
      border: "2px solid #D11149",
      borderRadius: "10px",
      backgroundColor: "#fdf0d5",
      transition: "background-color 1.5s ease, transform 1.5s ease",
      transform: "scale(1.05)",
      fontSize: "22px",
    });
  };

  const signupHandleMouseLeave = () => {
    setSignupBtnFeatures({ color: "white", fontSize: "20px" });
  };

  return (
    <>
      <TextThemeContext theme={mode} themeHandler={handleBackgroundColor}>
        <nav
          className="navbar navbar-expand-lg navbar"
          style={{ backgroundColor: "#23211f" }}
        >
          <div className="container-fluid ">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{
                backgroundColor: "#f9f4f4",
                marginBottom: "10px",
              }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    to="/login"
                    style={{
                      margin: "12px",
                      textDecoration: "none",
                      fontWeight: "900",
                      fontSize: loginBtnFeatures.fontSize,
                      color: loginBtnFeatures.color,
                      border: loginBtnFeatures.border,
                      borderRadius: loginBtnFeatures.borderRadius,
                      backgroundColor: loginBtnFeatures.backgroundColor,
                      transition: loginBtnFeatures.transition,
                      transform: loginBtnFeatures.transform,
                    }}
                    onMouseEnter={loginHandleMouseEnter}
                    onMouseLeave={loginHandleMouseLeave}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signup"
                    style={{
                      margin: "12px",
                      textDecoration: "none",
                      fontWeight: "900",
                      fontSize: signupBtnFeatures.fontSize,
                      color: signupBtnFeatures.color,
                      border: signupBtnFeatures.border,
                      borderRadius: signupBtnFeatures.borderRadius,
                      backgroundColor: signupBtnFeatures.backgroundColor,
                      transition: signupBtnFeatures.transition,
                      transform: signupBtnFeatures.transform,
                    }}
                    onMouseEnter={signupHandleMouseEnter}
                    onMouseLeave={signupHandleMouseLeave}
                  >
                    Signup
                  </Link>
                </li>
                <li className="nav-item"></li>
                <li className="nav-item"></li>
              </ul>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input  my-2"
                type="checkbox"
                onClick={handleBackgroundColor}
              />
              <label
                className="form-check-label"
                style={{ color: "white", fontWeight: "800", fontSize: "20px" }}
              >
                {mode} Mode
              </label>
            </div>
          </div>
        </nav>
      </TextThemeContext>
    </>
  );
};

export default Navbar;
