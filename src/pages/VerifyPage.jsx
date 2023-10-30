import Nav from "../components/Nav";
import instance from "../components/api";
import { useState, useEffect } from "react";
import StaffList from "../components/staffList";

const VerifyPage = () => {
  useEffect(() => {
    getCompanies();
  }, []);

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

  const [companies, setCompanies] = useState([]);
  const [companySearch, setCompanySearch] = useState({
    company: "",
    search: "",
  });
  const [foundUser, setFoundUser] = useState([]);
  const [staffFoundModal, setstaffFoundModal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (companySearch.company === "" || companySearch.search === "") {
      setstaffFoundModal(2);
      return;
    }
    setIsLoading(true);
    instance
      .get("/company/staff", { params: companySearch })
      .then((response) => {
        response = response.data;
        setIsLoading(false);
        setFoundUser(response.data);
        console.log(foundUser);
        setstaffFoundModal(1);
      })
      .catch((error) => {
        setIsLoading(false);
        setstaffFoundModal(2);
      });
  };

  const updateCompanyFormData = (e) => {
    const fieldName = e.target.name;
    setCompanySearch({ ...companySearch, [fieldName]: e.target.value });
  };

  return (
    <div className="mx-3 md:mx-10 lg:my-8 lg:mx-24">
      <Nav />
      <div className="mt-12 w-full">
        <form className="w-10/12  mx-auto flex flex-col gap-6 [&>*]:cursor-pointer lg:mx-24 lg:w-auto lg:flex-row lg:gap-2">
          <label className="basis-1/2 text-sm">
            Company Name
            <select
              name="company"
              className="bg-slate-200 w-full p-2 rounded-md"
              value={companySearch.company}
              onChange={updateCompanyFormData}
            >
              <option>Select a company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </label>
          <label className="basis-1/2 text-sm">
            Full Name/Email/Phone Number
            <input
              type="text"
              name="search"
              placeholder="John doe"
              className="bg-slate-200 w-full px-2 py-1.5 rounded-md"
              value={companySearch.search}
              onChange={updateCompanyFormData}
            />
          </label>
        </form>
        <button
          onClick={handleSearch}
          className="mx-auto flex bg-cyan-700 px-3 py-2 rounded-md mt-5 text-white"
        >
          Search
        </button>

        {isLoading && (
          <h4 className="text-center font-bold mt-8">Loading ...</h4>
        )}
        {staffFoundModal === 1 && (
          <section className="px-4 py-8 mt-16 bg-slate-200 w-10/12 mx-auto [&>*]:my-2 rounded-md ">
            <p className="text-center text-green-600 font-bold">Staff Found!</p>
            <div>
              {foundUser.map((user) => (
                <StaffList key={user._id} {...user} />
              ))}
            </div>
          </section>
        )}

        {staffFoundModal === 2 && (
          <section className="p-4 mt-16 bg-slate-200  w-10/12 mx-auto [&>*]:my-2 rounded-md lg:w-[40%]">
            <p className="text-red-500 text-center font-bold">
              Staff not found
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
