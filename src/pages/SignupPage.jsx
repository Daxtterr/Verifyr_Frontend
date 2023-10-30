import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../components/api";
const SignupPage = () => {
  const [error, setError] = useState("");
  const [currentForm, setCurrentForm] = useState(1);
  const navigate = useNavigate();
  const [companyFormData, setCompanyFormData] = useState({
    name: "",
    address: "",
    contactEmail: "",
    regNo: "",
    website: "",
    contactPhone: "",
  });
  const [adminFormData, setAdminFormData] = useState({
    firstName: "",
    lastName: "",
    contactEmail: "",
    contactNo: "",
    staffId: "",
    companyRole: "",
  });

  const updateCompanyFormData = (e) => {
    const fieldName = e.target.name;
    setCompanyFormData({
      ...companyFormData,
      [fieldName]: e.target.value.trim(),
    });
  };

  const submitCreateCompany = (e) => {
    e.preventDefault();
    setCurrentForm(1);
    // instance
    //   .post("/company/createcompanyaccount", companyFormData)
    //   .then((response) => {
    //     response = response.data;

    //   })
    //   .catch((error) => {
    //     setError(error.response.data.message);
    //   });
  };

  return (
    <div className=" w-full h-screen bg-cyan-50 pt-3">
      {currentForm == 0 && (
        <div className=" w-10/12 lg:w-2/6 mx-auto my-8 py-4 bg-white rounded-md shadow-md">
          <p className="text-3xl text-cyan-700 text-center font-bold">
            <Link to="/">Verifyr</Link>
          </p>
          <p className="mt-4 text-center">Create your company account</p>
          <p className="text-center text-red-500 mt-4">{error}</p>
          <form className="mt-6 text-xs flex flex-col gap-4 p-4 ">
            <label>
              {" Company Name "}
              <input
                name="name"
                type="text"
                className="block w-full border-2 rounded-md p-2"
                value={companyFormData.name}
                onChange={updateCompanyFormData}
              />
            </label>
            <label>
              {"Email Address "}
              <input
                name="contactEmail"
                type="text"
                className="w-full block border-2 rounded-md p-2"
                value={companyFormData.contactEmail}
                onChange={updateCompanyFormData}
              />
            </label>
            <div className="flex gap-2 justify-between">
              <label className="basis-1/2">
                {"Phone Number "}
                <input
                  name="contactPhone"
                  type="text"
                  className=" block border-2 rounded-md p-2 w-full"
                  value={companyFormData.contactPhone}
                  onChange={updateCompanyFormData}
                />
              </label>
              <label className="basis-1/2">
                {" Registration Number "}
                <input
                  name="regNo"
                  type="text"
                  className="block border-2 rounded-md p-2 w-full"
                  value={companyFormData.regNo}
                  onChange={updateCompanyFormData}
                />
              </label>
            </div>
            <label>
              {"Website "}
              <input
                name="website"
                type="text"
                className="w-full block border-2 rounded-md p-2"
                value={companyFormData.website}
                onChange={updateCompanyFormData}
              />
            </label>
            <label>
              {"Address "}
              <input
                name="address"
                type="text"
                className="w-full block border-2 rounded-md p-2"
                value={companyFormData.address}
                onChange={updateCompanyFormData}
              />
            </label>
            <button
              type="submit"
              className="bg-cyan-700 w-1/5 mx-auto text-white p-2 rounded-md"
              onClick={submitCreateCompany}
            >
              Next
            </button>
          </form>
        </div>
      )}

      {currentForm == 1 && (
        <div className=" w-10/12 lg:w-2/6 mx-auto py-4 bg-white rounded-md shadow-md">
          <p className="text-3xl text-cyan-700 text-center font-bold">
            <Link to="/">Verifyr</Link>
          </p>
          <p className="mt-4 text-center">Create an Admin for your Company</p>
          <p className="text-center text-red-500 mt-4">{error}</p>
          <form className="mt-6 text-xs flex flex-col gap-4 p-4 ">
            <div className="flex gap-2">
              <label className="basis-1/2">
                {" First Name "}
                <input
                  name="firstName"
                  type="text"
                  className="block w-full border-2 rounded-md p-2"
                />
              </label>
              <label className="basis-1/2">
                {" Last Name "}
                <input
                  name="lastName"
                  type="text"
                  className="block w-full border-2 rounded-md p-2"
                />
              </label>
            </div>

            <label>
              {"Email Address "}
              <input
                name="contactEmail"
                type="text"
                className="w-full block border-2 rounded-md p-2"
                value={companyFormData.contactEmail}
                onChange={updateCompanyFormData}
              />
            </label>
            <div className="flex gap-2 justify-between">
              <label className="basis-1/2">
                {"Phone Number "}
                <input
                  name="contactPhone"
                  type="text"
                  className=" block border-2 rounded-md p-2 w-full"
                  value={companyFormData.contactPhone}
                  onChange={updateCompanyFormData}
                />
              </label>
              <label className="basis-1/2">
                {" Staff ID "}
                <input
                  name="staffId"
                  type="text"
                  className="block border-2 rounded-md p-2 w-full"
                />
              </label>
            </div>
            <label>
              {"Company Role "}
              <input
                name="companyRole"
                type="text"
                className="w-full block border-2 rounded-md p-2"
              />
            </label>
            <label>
              {"Date of Birth "}
              <input
                name="dateOfBirth"
                type="date"
                className="w-full block border-2 rounded-md p-2"
              />
            </label>
            <label>
              {"Password "}
              <input
                name="password"
                type="text"
                className="w-full block border-2 rounded-md p-2"
              />
            </label>
            <div className="flex justify-between [&>*]:cursor-pointer [&>*]:w-1/5 [&>*]:rounded-md [&>*]:text-white [&>*]:p-2">
              <button
                className="bg-red-700"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentForm(0);
                }}
              >
                Back
              </button>
              <button type="submit" className="bg-cyan-700 ">
                Next
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
