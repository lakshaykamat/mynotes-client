import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Spinner from "../../components/common/Spinner";
import ObjectSpinner from "../../components/common/ObjectSpinner";
const LoginForm = () => {
  const navigate = useNavigate();
  const [loginField, setLoginFiled] = useState({ email: "", password: "" });
  const [loginData, setLoginData] = useState({})
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setLoginFiled((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };
  let data = JSON.stringify({
    email: loginField.email,
    password: loginField.password,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://mynotes-server-jznn.onrender.com/api/user/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  async function makeRequest () {
    try {
      setMessage("");
      setLoginData(null)
      const response = await axios.request(config);
      setLoginData(response.data)
      localStorage.setItem("token", JSON.stringify(response.data))
      navigate('/home')
    } catch (error) {
      const errRes = error.response.data;
      console.log(errRes);
      if (errRes.message) {
        setMessage(errRes.message);
        setLoginData({})
      } else if (errRes.errors) {
        setMessage(`${errRes.errors[0].msg} in ${errRes.errors[0].param}`);
        setLoginData({})
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    makeRequest();
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="max-w-xl mx-5 sm:mx-auto mt-8">
        <h1 className="mb-5 text-3xl font-semibold">Login</h1>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginField.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginField.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-blue-500 flex justify-center  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loginData === null ? <ObjectSpinner /> : "Sign In"}

          </button>

          <div className="flex justify-between items-center">
            <p className="text-sm text-red-500 ">{message}</p>
            <p className="text-sm">New here <Link to='/register' className="underline text-blue-700">Register now</Link></p>
          </div>
        </div>
      </form>
    </>
  );
};
export default LoginForm;
