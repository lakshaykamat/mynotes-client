import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/common/Spinner";
import Navbar from "../../components/common/Navbar";
import { ToastContainer, toast } from "react-toastify";
const Profile = ({server_url}) => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  },[]);
  const logout = () => {
    const confirmAction = window.confirm("Are you sure you want to logout?")
    if(confirmAction){
      localStorage.clear();
      navigate("/login");
    }
  };
  const deleteAllNotes = () => {
    if(window.confirm("DANGER: Delete all Notes")){
      deleteNoteData()
    }
  };


  const getAccessToken = () => {
    console.log("Fetching token...");
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    return JSON.parse(token).accessToken;
  };

  useEffect(()=>{
    currentUserData()
  },[])

  let currentUserConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${server_url}/api/user/current`,
    headers: { 
      'Authorization':`Bearer ${getAccessToken()}`
    }
  };
  
  async function currentUserData() {
    try {
      const response = await axios.request(currentUserConfig);
      console.log(response.data)
      setProfileData(response.data)
    }
    catch (error) {
      console.log(error);
    }
  }
  


  let deleteNoteConfig = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `${server_url}/api/notes/`,
    headers: { 
      'Authorization': `Bearer ${getAccessToken()}`
    }
  };
  
  async function deleteNoteData() {

    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          await axios.request(deleteNoteConfig);
          resolve("OKAY")
        } catch (error) {
          reject(error);
        }
      }),
      {
        pending: "Deleting...",
        success: "Deleted",
        error: "Failed to Save",
        duration: 5000,
        onClose: () => {
          console.log("Toast closed");
        },
      }
    );

  }
  
  if(!profileData) return <Spinner/>
  
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
        <ProfileCard
          userImg={profileData.avatar}
          name={profileData.name}
          email={profileData.email}
          logout={logout}
          createdAt={profileData.createdAt}
          deleteAllNotes={deleteAllNotes}
        />
    </>
  );
};
const ProfileCard = ({ userImg, name, email,createdAt ,logout, deleteAllNotes }) => {
  function formatDate (date) {
    // Define month names
    const monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];

    // Get date components
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Format the date string
    return `${month} ${year}`
    // return `${day} ${month} ${year}`p
  }
  return (
    <>  
    <div className="flex flex-col items-center bg-slate-700 sm:w-[50%] my-8 mx-3 sm:mx-auto rounded-lg shadow-lg p-8">
      <div className="w-32 h-32 rounded-full overflow-hidden">
        <img src={userImg} alt="Avatar" className="w-full h-full object-cover" />
      </div>
      <h2 className="text-2xl text-white font-bold mt-4">{name}</h2>
      <p className="text-white">{email}</p>
      <p className="text-white">{formatDate(new Date(createdAt))}</p>
      <div>

      </div>
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
          Delete All Notes
        </button>
      </div>
    </div>
    </>
  );
};
export default Profile;
