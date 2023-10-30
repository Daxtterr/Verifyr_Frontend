import { useState, useContext, useEffect } from "react";
import Nav from "../components/Nav";
import instance from "../components/api";
import StaffList from "../components/staffList";
import { MyContext } from "../components/MyContext";

const Dashboard = () => {
  useEffect(() => {
    getAllStaff();
  }, []);

  const [userDetails, setUserDetails] = useContext(MyContext);
  const [addStaff, setAddStaff] = useState(false);
  const [allStaff, setAllStaff] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    contactEmail: "",
    staffId: "",
    companyRole: "",
    dateOfBirth: "",
    company: userDetails.companyId,
  });

  const formDataChange = (e) => {
    setError("");
    setSuccess("");
    const fieldName = e.target.name;
    setFormData({ ...formData, [fieldName]: e.target.value.trim() });
  };

  const getAllStaff = () => {
    instance
      .post(
        "/company/allstaff",
        { companyId: userDetails.companyId },
        {
          headers: {
            Authorization: `Bearer ${userDetails.token}`,
          },
        }
      )
      .then((response) => {
        response = response.data;
        setAllStaff(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (
      formData.firstName === " " ||
      formData.lastName === "" ||
      formData.contactEmail === "" ||
      formData.contactNo === "" ||
      formData.dateOfBirth === "" ||
      formData.companyRole === "" ||
      formData.staffId === ""
    ) {
      setError("Please input all fields");
      return;
    }
    instance
      .post("company/createstaff", formData, {
        headers: {
          Authorization: `Bearer ${userDetails.token}`,
        },
      })
      .then((response) => {
        setSuccess("User created successfully");
        getAllStaff();
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
      });
  };

  return (
    <div className="mx-3 lg:mx-24 md:mx-10 lg:my-8">
      <Nav />
      <div className="flex justify-between mt-6">
        <div
          className={`${
            !addStaff ? "border-b-4" : "border-b-0"
          } border-cyan-500 basis-1/2`}
        >
          <p
            className="text-center cursor-pointer"
            onClick={() => {
              setAddStaff(false);
            }}
          >
            Staff List
          </p>
        </div>
        <div
          className={`${
            addStaff ? "border-b-4" : "border-b-0"
          } border-cyan-500 basis-1/2`}
        >
          <p
            className="text-center cursor-pointer"
            onClick={() => {
              setAddStaff(true);
            }}
          >
            Add New Staff
          </p>
        </div>
      </div>
      <p className=" my-4 font-bold text-center">Welcome {userDetails.name}</p>
      <div className=" lg:mt-10">
        {!addStaff && (
          <div>
            {allStaff.map((staff) => (
              <StaffList key={staff._id} {...staff} />
            ))}
          </div>
        )}

        {addStaff && (
          <div className=" w-10/12 lg:w-2/6 mx-auto bg-white rounded-md shadow-md">
            <form className=" text-xs flex flex-col gap-4 p-4 ">
              <p className="text-center text-red-500">{error}</p>
              <p className="text-center text-green-500">{success}</p>
              <div className="flex gap-2">
                <label className="basis-1/2">
                  {" First Name "}
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={formDataChange}
                    type="text"
                    className="w-full block border-2 rounded-md p-2"
                  />
                </label>
                <label className="basis-1/2">
                  {"Last Name "}
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={formDataChange}
                    type="text"
                    className="w-full block border-2 rounded-md p-2"
                  />
                </label>
              </div>
              <label>
                {" Email address"}
                <input
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={formDataChange}
                  type="text"
                  className="w-full block border-2 rounded-md p-2"
                />
              </label>
              <div className="flex gap-2">
                <label className="basis-1/2">
                  {"Phone Number "}
                  <input
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={formDataChange}
                    type="text"
                    className="w-full block border-2 rounded-md p-2"
                  />
                </label>
                <label className="basis-1/2">
                  {" Date of birth "}
                  <input
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={formDataChange}
                    type="date"
                    className=" w-full block border-2 rounded-md p-2"
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <label className="basis-1/2">
                  {" Staff Id"}
                  <input
                    name="staffId"
                    value={formData.staffId}
                    onChange={formDataChange}
                    type="text"
                    className="w-full block border-2 rounded-md p-2"
                  />
                </label>
                <label className="basis-1/2">
                  {" Company Role "}
                  <input
                    name="companyRole"
                    value={formData.companyRole}
                    onChange={formDataChange}
                    type="text"
                    className=" w-full block border-2 rounded-md p-2"
                  />
                </label>
              </div>

              <button
                type="submit"
                onClick={formSubmit}
                className="text-white w-1/4 px-4 py-2 rounded-md mx-auto bg-cyan-700"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
