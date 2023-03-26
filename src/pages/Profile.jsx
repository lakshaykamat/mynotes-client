import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PFP } from "../assets/PFP";
import axios from "axios";
const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  });
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const randomImg = () => {
    const index = Math.floor(Math.random() * PFP.length);
    setUserImg(PFP[index]);
  };

  useEffect(() => {
    randomImg();
  }, []);

  const getAccessToken = () => {
    console.log("Fetching token...");
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    return JSON.parse(token).accessToken;
  };

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://mynotes-server-jznn.onrender.com/api/user/current",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  async function makeRequest() {
    try {
      const response = await axios.request(config);
      setProfileData(response.data);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    makeRequest();
  }, []);

  const deleteAllNotes = () => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: "https://mynotes-server-jznn.onrender.com/api/notes/",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  };
  return (
    <>
      {!profileData ? (
        <h1 className="my-6 text-3xl">Loading...</h1>
      ) : (
        <ProfileCard
          userImg={userImg}
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
    <div className="max-w-xl drop-shadow-xl rounded-xl flex  items-center justify-center mx-6 sm:mx-auto">
      <div className=" bg-slate-200 p-5 m-5">
        <div className="">
          <img
            className="mx-auto w-32 h-32 rounded-[50%]"
            src={userImg}
            alt=""
          />
        </div>
        <div className="text-lg gap-3">
          <h1 className="font-bold"> Name</h1>
          {name}

          <h1 className="font-bold">Email</h1>
          {email}
        </div>

        <div className="flex justify-center items-center flex-wrap gap-4 mt-4">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 mx-auto block rounded-md text-white"
          >
            LOGOUT
          </button>
          <button
            onClick={deleteAllNotes}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 mx-auto block rounded-md text-white"
          >
            DELETE NOTES
          </button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
