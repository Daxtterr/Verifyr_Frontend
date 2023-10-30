import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import VerifyPage from "./pages/VerifyPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/forgotPasswordPage";
import Dashboard from "./pages/Dashboard";
import { MyContext } from "./components/MyContext";
import { LogInContext } from "./components/LogInContext";
import { useState } from "react";
function App() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    token: "",
  });
  const [isLoggedIn, setIsloggedIn] = useState(false);
  return (
    <>
      <LogInContext.Provider value={[isLoggedIn, setIsloggedIn]}>
        <MyContext.Provider value={[userDetails, setUserDetails]}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </MyContext.Provider>
      </LogInContext.Provider>
    </>
  );
}

export default App;
