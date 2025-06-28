import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import EnterOTP from "./Pages/EnterOTP";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import PrivateRoute from "./Pages/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import RedirectedAuth from "./Controllers/RedirectedAuth";
import AuthRequired from "./Controllers/AuthRequired";
import Navbar from "./Pages/Navbar";
import UpdateData from "./Pages/UpdateData";
import NotFound from "./Pages/NotFound";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("Light");

  const themeHandler = () => {
    if (theme === "Light") {
      setTheme("Dark");
    } else {
      setTheme("Light");
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/login"
          element={
            <RedirectedAuth>
              <Login />
            </RedirectedAuth>
          }
        ></Route>
        <Route
          path="/otp"
          element={
            <RedirectedAuth>
              <EnterOTP />
            </RedirectedAuth>
          }
        ></Route>
        <Route
          path="/private"
          element={
            <AuthRequired>
              <PrivateRoute />
            </AuthRequired>
          }
        />
        <Route
          path="/update"
          element={
            <AuthRequired>
              <UpdateData />
            </AuthRequired>
          }
        />
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
