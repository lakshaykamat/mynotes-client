import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import ObjectSpinner from "../../components/common/ObjectSpinner";
import avatars from '../../assets/avatars.js'


const RegistrationForm = ({server_url}) => {
  const navigate = useNavigate();
  const [errMessage, setErrorMessage] = useState('')
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [registerDetail,setRegisterDetail] = useState({})

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleSubmit = (e) => {
    setRegisterDetail(null)
    e.preventDefault();
    makeRequest();

  };
  let data = JSON.stringify({
    "name": name,
    "email": email,
    "password": password,
    "avatar": selectedAvatar
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${server_url}/api/user/register`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  async function makeRequest () {
    try {
      setErrorMessage("");
      const response = await axios.request(config);
      setRegisterDetail(response.data)
      localStorage.setItem("token", JSON.stringify(response.data));
      navigate("/home")
    }
    catch (error) {
      console.log(error);
      if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setRegisterDetail({})
      } else if (error.response.data.errors) {
        setErrorMessage(
          `${error.response.data.errors[0].msg} in ${error.response.data.errors[0].param}`
          );
          setRegisterDetail({})
      }
    }
  }



  return (
    <>
      <div className="w-full sm:w-96 bg-white p-6 rounded-md shadow-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6">Registration</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 mb-4 rounded-md border focus:outline-none focus:border-blue-500"
            value={name}
            onChange={handleNameChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 rounded-md border focus:outline-none focus:border-blue-500"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 rounded-md border focus:outline-none focus:border-blue-500"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="flex flex-wrap mb-4 justify-start">
            <p className="w-full mb-2">Select an Avatar:</p>
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`w-16 h-16 p-1 cursor-pointer ${selectedAvatar === avatar ? "bg-gray-400" : ""
                  }`}
                onClick={() => handleAvatarSelect(avatar)}
              >
                <img
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className="w-full h-full rounded-md object-cover"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="flex justify-center items-center mt-6 text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full"
            disabled={registerDetail ?  false : true}
          >
            {registerDetail ? "Register" : <ObjectSpinner/>}
          </button>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-red-500 ">{errMessage}</p>
            <p className="text-sm">Already have an account <Link to='/login' className="underline text-blue-700">Login</Link></p>
          </div>

        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
