import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import instance from "../components/api";
import { MyContext } from "../components/MyContext";
import { LogInContext } from "../components/LogInContext";

const LoginPage = () => {
  useEffect(() => {
    getCompanies();
  }, []);

  const navigate = useNavigate();
  const [isLoggedIn, setIsloggedIn] = useContext(LogInContext);
  const [userDetails, setUserDetails] = useContext(MyContext);
  const [companies, setCompanies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginDetails, setLoginDetails] = useState({
    contactEmail: "",
    password: "",
    companyId: "",
  });

  const getCompanies = () => {
    instance
      .get("/company/allcompanies")
      .then((response) => {
        response = response.data;
        setCompanies(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error while fetching");
      });
  };

  const handleformUpdate = (e) => {
    setErrorMessage("");
    const fieldName = e.target.name;
    setLoginDetails({ ...loginDetails, [fieldName]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginDetails.contactEmail === "") {
      setErrorMessage("Email cannot be blank");
      return;
    }
    if (loginDetails.password === "") {
      setErrorMessage("Password cannot be blank");
      return;
    }

    instance
      .post("/company/adminlogin", loginDetails)
      .then((response) => {
        response = response.data;
        setUserDetails({
          ...userDetails,
          name: response.data.firstName,
          token: response.data.accessToken,
          company: response.data.company,
          companyId: loginDetails.companyId,
        });
        navigate("/dashboard");
        setIsloggedIn(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setErrorMessage("Invalid credentials");
      });
  };

  return (
    <div className=" w-full h-screen flex bg-cyan-50 pt-3">
      <div className="w-10/12 lg:w-2/6 m-auto py-4 bg-white rounded-md shadow-md">
        <p className="text-3xl text-cyan-700 text-center font-bold">
          <Link to="/">Verifyr</Link>{" "}
        </p>
        <p className="text-center my-4">Log in your account</p>
        <p className="text-center text-red-600 text-sm">{errorMessage}</p>
        <form className="mt-4 text-xs flex flex-col gap-4 p-4 ">
          <label className="basis-1/2 text-sm">
            Company Name
            <select
              name="companyId"
              className="bg-slate-200 w-full p-2 rounded-md"
              value={loginDetails.companyId}
              onChange={handleformUpdate}
            >
              <option>Select a company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            {" Email address"}
            <input
              name="contactEmail"
              value={loginDetails.contactEmail}
              onChange={handleformUpdate}
              type="text"
              className="w-full block border-2 rounded-md p-2"
            />
          </label>
          <label>
            {" Password"}
            <input
              name="password"
              value={loginDetails.password}
              onChange={handleformUpdate}
              type="text"
              className="w-full block border-2 rounded-md p-2"
            />
          </label>
          <p className="text-green-500 font-bold cursor-pointer">
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
          <button
            onClick={handleLogin}
            className="mx-auto text-white  px-3 py-2 rounded-md bg-cyan-700 w-1/4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
