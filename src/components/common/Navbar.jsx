import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import axios from "axios";

const Navbar = ({server_url,getAccessToken}) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [profilePIC,setProfilePIC] = useState('')
  const location = useLocation()
  const token = localStorage.getItem("token");
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const NAV_LINK = [
    {
      path: "/home",
      dest: "Home",
    },
    {
      path: "/about",
      dest: "About",
    },
    {
      path: "/contact",
      dest: "Contact",
    },
    {
      path: "/profile",
      dest: "Profile",
    },
  ];


  let currentUserConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${server_url}/api/user/current`,
    headers: { 
      'Authorization':`Bearer ${getAccessToken}`
    }
  };
  
  useEffect(()=>{
    token && currentUserData()
  },[token])
  async function currentUserData() {
    try {
      const response = await axios.request(currentUserConfig);
      setProfilePIC(response.data.avatar)
    }
    catch (error) {

      console.log(error.message)
      if(error.message && error.message == "Network Error") return alert("Failed")
      console.log(error);
    }
  }

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              <div className="flex justify-center items-center">
                PI Notes <img className="w-9 h-9 mx-3" src="https://cdn-icons-png.flaticon.com/512/3075/3075908.png" />
              </div>
            </Link>

          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {
                localStorage.getItem("token") &&
              <Link
                to="/home"
                className={`${location.pathname === "/home" && "bg-gray-600 text-white font-semibold"}  text-gray-300  px-3 py-2 rounded-md text-sm font-medium`}
              >
                Home
              </Link>
                }
              <Link
                to="/about"
                className={`${location.pathname === "/about" && "bg-gray-600 text-white font-semibold"}  text-gray-300  px-3 py-2 rounded-md text-sm font-medium`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`${location.pathname === "/contact" && "bg-gray-600 text-white font-semibold"}  text-gray-300  px-3 py-2 rounded-md text-sm font-medium`}
              >
                Contact
              </Link>

              {!token ? (
                <>
                  <Link
                    to="/login"
                    className={`${location.pathname === "/login" && "bg-gray-600 text-white font-semibold"}  text-gray-300  px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`${location.pathname === "/register" && "bg-gray-600 text-white font-semibold"}  text-gray-300  px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                {
                profilePIC ? 
                <img className="w-9 h-9 rounded-[50%]" src={`${profilePIC}`}></img> :
                <BsPersonCircle title="Profile" className="w-6 h-6" />
                }
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Register
              </Link>
            </>
          ) : (
            <Link
              to="/profile"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
            <div className="flex items-center gap-3">
             {
                profilePIC ? 
                <img className="w-9 h-9 rounded-[50%]" src={`${profilePIC}`}></img> :
                <BsPersonCircle title="Profile" className="w-6 h-6" />
                }
                <h1>Profile</h1>
            </div>
            </Link>
          )}
        </div>
      </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
