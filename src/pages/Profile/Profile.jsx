import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/common/Spinner";
import Navbar from "../../components/common/Navbar";
const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  });
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const deleteAllNotes = () => {
    deleteNoteData()
  };


  const getAccessToken = () => {
    console.log("Fetching token...");
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    return JSON.parse(token).accessToken;
  };

  useEffect(()=>{
    currentUserData()
  },[profileData])

  let currentUserConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://mynotes-server-jznn.onrender.com/api/user/current',
    headers: { 
      'Authorization':`Bearer ${getAccessToken()}`
    }
  };
  
  async function currentUserData() {
    try {
      const response = await axios.request(currentUserConfig);
      setProfileData(response.data)
    }
    catch (error) {
      console.log(error);
    }
  }
  


  let deleteNoteConfig = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: 'http://localhost/api/notes/',
    headers: { 
      'Authorization': `Bearer ${getAccessToken()}`
    }
  };
  
  async function deleteNoteData() {
    try {
      const response = await axios.request(deleteNoteConfig);
      alert("Deleted All Notes")
    }
    catch (error) {
      console.log(error);
    }
  }
  
  
  
  return (
    <>
      <Navbar/>

      {!profileData ? (
        <Spinner/>
      ) : (
        <ProfileCard
          userImg={profileData.avatar}
          name={profileData.name}
          email={profileData.email}
          logout={logout}
          deleteAllNotes={deleteAllNotes}
        />
      )}
    </>
  );
};
const ProfileCard = ({ userImg, name, email, logout, deleteAllNotes }) => {
  return (
    <>  
    <div className="flex flex-col items-center bg-slate-700 sm:w-[50%] my-8 mx-3 sm:mx-auto rounded-lg shadow-lg p-8">
      <div className="w-32 h-32 rounded-full overflow-hidden">
        <img src={userImg} alt="Avatar" className="w-full h-full object-cover" />
      </div>
      <h2 className="text-2xl text-white font-bold mt-4">{name}</h2>
      <p className="text-white">{email}</p>
      <div className="mt-8 flex flex-wrap justify-start items-center gap-2">
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded mr-4"
        >
          Logout
        </button>
        <button
          onClick={deleteAllNotes}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete All
        </button>
      </div>
    </div>
    </>
  );
};
export default Profile;
