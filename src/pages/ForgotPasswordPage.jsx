import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../components/api";

const ForgotPasswordPage = () => {
  const [form, setForm] = useState(0);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [formDetails, setformDetails] = useState({
    contactEmail: "",
    resetPin: "",
    password: "",
    confirmPassword: "",
  });

  const updateFormDetails = (e) => {
    setError(false);
    const fieldName = e.target.name;
    setformDetails({ ...formDetails, [fieldName]: e.target.value.trim() });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const isEmail = (email) => {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );
    };

    if (!isEmail(formDetails.contactEmail) || formDetails.contactEmail === "") {
      setError(true);
      return;
    }

    instance
      .post("/company/forgot-password", formDetails)
      .then((response) => {
        response = response.data;
        setForm((cur) => cur + 1);
      })
      .catch((error) => {
        setError(true);
      });
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    setForm((cur) => cur + 1);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (formDetails.password !== formDetails.confirmPassword) {
      setError(true);
      return;
    }
    instance
      .post("/company/reset-password", formDetails)
      .then((response) => {
        response = response.data;
        navigate("/login");
      })
      .catch((error) => {
        setError(true);
        console.log(error.response.data);
      });
  };

  return (
    <div className=" w-full h-screen flex bg-cyan-50 pt-3">
      {form === 0 && (
        <div className="w-10/12 lg:w-2/6 m-auto p-4 bg-white rounded-md shadow-md">
          <p className="text-3xl text-cyan-700 text-center font-bold">
            <Link to="/">Verifyr</Link>{" "}
          </p>
          <p className="text-center mt-4">
            Enter the Email Address on your registered account
          </p>
          <form className="mt-4 text-xs flex flex-col gap-4 p-4 ">
            <label>
              {" Email address"}
              <input
                name="contactEmail"
                value={formDetails.contactEmail}
                onChange={updateFormDetails}
                type=""
                className="w-full block border-2 rounded-md p-2"
              />
            </label>
            {error && <small className="text-red-500">Email not found</small>}
            <button
              onClick={handleEmailSubmit}
              type="submit"
              className="mx-auto text-white  px-3 py-2 rounded-md bg-cyan-700 w-1/4"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {form === 1 && (
        <div className="w-10/12 lg:w-2/6 m-auto p-4 bg-white rounded-md shadow-md">
          <p className="text-3xl text-cyan-700 text-center font-bold">
            <Link to="/">Verifyr</Link>{" "}
          </p>
          <p className="text-center mt-4">
            OTP has been sent to your Email Address
          </p>
          <form className="mt-4 text-xs flex flex-col gap-4 p-4 ">
            <label>
              {" Enter OTP"}
              <input
                name="resetPin"
                onChange={updateFormDetails}
                value={formDetails.resetPin}
                type="text"
                className="w-full block border-2 rounded-md p-2"
              />
            </label>
            <div className="flex justify-between [&>*]:text-white [&>*]:rounded-md [&>*]:w-1/4 [&>*]:px-3 [&>*]:py-2">
              {" "}
              <button
                type="submit"
                className=" bg-red-500"
                onClick={(e) => {
                  e.preventDefault();
                  setForm((cur) => cur - 1);
                }}
              >
                Back
              </button>
              <button
                type="submit"
                onClick={handleOTPSubmit}
                className="bg-cyan-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {form === 2 && (
        <div className="w-10/12 lg:w-2/6 m-auto p-4 bg-white rounded-md shadow-md">
          <p className="text-3xl text-cyan-700 text-center font-bold">
            <Link to="/">Verifyr</Link>{" "}
          </p>
          <p className="text-center mt-4">Create your new password</p>
          <form className="mt-4 text-xs flex flex-col gap-4 p-4 ">
            <label>
              {" Password"}
              <input
                name="password"
                onChange={updateFormDetails}
                value={formDetails.password}
                type="text"
                className="w-full block border-2 rounded-md p-2"
              />
            </label>
            <label>
              {" Confirm Password"}
              <input
                name="confirmPassword"
                onChange={updateFormDetails}
                value={formDetails.confirmPassword}
                type="text"
                className="w-full block border-2 rounded-md p-2"
              />
            </label>
            {error && (
              <small className="text-red-500">Passwords don't match</small>
            )}
            <button
              onClick={handlePasswordSubmit}
              type="submit"
              className="mx-auto text-white  px-3 py-2 rounded-md bg-cyan-700 w-1/4"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
