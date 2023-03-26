import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const navigate = useNavigate();
    const [message,setMessage] = useState(null)
  const [registrationField, setregistrationField] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    console.log(registrationField)
    e.preventDefault();
    makeRequest()
  };
  const handleChange = (e)=>{
    setregistrationField((prevData) => {
        return { ...prevData, [e.target.name]: e.target.value };
      });
  }

  let data = JSON.stringify({
    name: registrationField.name,
    email: registrationField.email,
    password: registrationField.password,
  });


  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://mynotes-server-jznn.onrender.com/api/user/register`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  async function makeRequest() {
    try {
      setMessage("");
      const response = await axios.request(config);
      console.log(response. data);
      localStorage.setItem("token",JSON.stringify(response.data));
      navigate("/")
    } catch (error) {
       console.log(error.response.data);
      if (error.response.data.message) {
        setMessage(error.response.data.message);
      } else if (error.response.data.errors) {
        setMessage(
          `${error.response.data.errors[0].msg} in ${error.response.data.errors[0].param}`
        );
      }

    }
  }
  return (
    <form action="post" onSubmit={handleSubmit} className="max-w-xl mx-5 sm:mx-auto mt-8">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={registrationField.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
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
          value={registrationField.email}
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
          value={registrationField.password}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {message && <p className="text-sm text-red-500 mb-4">{message}</p>}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
