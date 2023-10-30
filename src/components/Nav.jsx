import hamburger from "../assets/images/icon-menu.svg";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LogInContext } from "./LogInContext";
import { MyContext } from "./MyContext";

const Nav = () => {
  const [userDetails, setUserDetails] = useContext(MyContext);

  const [isLoggedIn, setIsloggedIn] = useContext(LogInContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <>
      <div className=" flex justify-between items-center">
        <p className="mt-4 font-bold text-3xl text-cyan-700 lg:mr-14 lg:mt-0 ">
          <Link to="/">VERIFYR</Link>
        </p>

        <div
          className="lg:hidden"
          onClick={() => {
            setShowMobileMenu(!showMobileMenu);
          }}
        >
          <img src={hamburger} alt="menu" />
        </div>
        <div
          className={`${
            showMobileMenu ? "flex" : "hidden"
          } absolute top-0 text-white right-0 py-4 w-7/12 bg-cyan-700 overflow-hidden duration-500 pl-5 flex-col gap-3 h-full lg:gap-0 lg:flex lg:text-black lg:pl-0 lg:h-auto lg:static lg:bg-white lg:py-0 lg:items-center lg:w-full lg:flex-row lg:justify-between lg:translate-x-0 lg:transition-none`}
        >
          <div className="lg:hidden">
            <svg
              width="26"
              height="26"
              xmlns="http://www.w3.org/2000/svg"
              className="float-right mr-4"
              onClick={() => {
                setShowMobileMenu(!showMobileMenu);
              }}
            >
              <g fill="white" fillRule="evenodd">
                <path d="m2.393.98 22.628 22.628-1.414 1.414L.979 2.395z" />
                <path d="M.98 23.607 23.609.979l1.414 1.414L2.395 25.021z" />
              </g>
            </svg>
          </div>
          <ul className="flex flex-col gap-4 lg:flex-row lg:gap-7 [&>*]:cursor-pointer">
            <li>Features</li>
            <li>Company</li>
            <li>Careers</li>
            <li>About</li>
          </ul>
          <div className="flex flex-col gap-4 lg:items-center lg:gap-7 lg:flex-row ">
            <span className="cursor-pointer">
              <Link
                to="/login"
                onClick={() => {
                  if (isLoggedIn === true) {
                    setIsloggedIn(false);
                  }
                }}
              >{`${!isLoggedIn ? "Login" : "Sign out"}`}</Link>
            </span>

            <span className="lg:bg-cyan-700 cursor-pointer text-white rounded-md lg:p-2">
              <Link to="/signup">{`${!isLoggedIn ? "Sign Up" : `Create New Admin`}`}</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
