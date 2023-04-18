import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Assuming you're using React Router for routing

const LandingPage = () => {
  const navigate = useNavigate()
  const getAccessToken = () => {
    const token = localStorage.getItem("token");
    if(token){
      navigate("/home");
    }
  };
  useEffect(()=>{
    getAccessToken()
  },[])

  return (
    <>

      <div className="bg-gradient-to-r from-gray-800 to-gray-600 min-h-screen flex items-center justify-center">
        <div className="text-white max-w-xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-center">Welcome to PINotes</h1>
          <p className="text-xl mb-8 text-center">
            Your all-in-one notes app for organizing your ideas, thoughts, and inspirations.
          </p>
          {/* <div className="flex justify-center mb-12">
          <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3R1ZGVudHxlbnwwfDF8MHx8&auto=format&fit=crop&w=600&q=60" alt="Notebook" className="h-48 w-48" />
        </div> */}
          <div className="flex justify-center space-x-4">
            <Link
              to="/home"
              className="bg-white text-gray-800 hover:bg-gray-900 hover:text-white px-6 py-3 rounded-full font-medium text-lg transition duration-200"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-transparent text-white hover:bg-white hover:text-gray-800 px-6 py-3 rounded-full font-medium text-lg transition duration-200 border-2 border-white"
            >
              Log In
            </Link>
          </div>
          <div className="mt-12 text-center">
            <p className="text-xl mb-2">Already have an account?</p>
            <Link
              to="/login"
              className="text-white hover:text-gray-200 font-medium text-lg transition duration-200"
            >
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
