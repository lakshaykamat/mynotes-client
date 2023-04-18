import React from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const NoteCard = ({ title, body, tags, id, date }) => {

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
    return `${day} ${month} ${year}`
  }

  function formatTime (date) {
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }

  const limitedBody = body.length > 50 ? `${body.slice(0, 50)}...` : body;
  const getAccessToken = () => {

    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    return JSON.parse(token).accessToken;
  };

  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `http://localhost/api/notes/${id}`,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  async function makeRequest () {
    try {
      const response = await axios.request(config);
      toast.success('Deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

 

      {/* <div
        id={id}
        className="bg-gray-600 flex flex-col justify-start items-start hover:bg-gray-800 transition outline outline-1 outline-slate-900  rounded-lg shadow-md p-6"
      >


        <div className="flex justify-between items-center w-full">
          <Link to={`/home/edit-note/${id}`}>
            <h2 className="text-xl  mb-2 hover:underline transition text-white font-semibold">{title}</h2>
          </Link>
          <RiDeleteBinLine
            title="Delete Note"
            onClick={makeRequest}
            className="w-6 text-white hover:text-red-600 h-6"
          />
        </div>

        <p className="text-white mb-2" >{limitedBody}</p>
        <div className="flex flex-col mb-2">
        <span className="text-sm  text-white">{formatDate(new Date(date))}</span>
        <span className="text-sm  text-white font-thin">{formatTime(new Date(date))}</span>

        </div>
        <div className="flex flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 rounded-full text-gray-700 text-sm px-3 py-1 mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div> */}


      <div
        className="bg-gray-600 text-white p-4 rounded shadow-md" // Attach the right-click event handler
      >
        <div className="flex justify-between items-center mb-2">
          <Link to={`/home/edit-note/${id}`}>
            <div className="font-bold text-lg">{title}</div>
          </Link>
          <button
            className="text-red-600 hover:text-red-700"
            onClick={
              () => {
                const confirm = window.confirm("Delete Note")
                if (confirm) makeRequest()
              }
            }
          >
            <FaTrashAlt />
          </button>
        </div>
        <div className="text-gray-200 text-sm mb-2">{limitedBody}</div>
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map(tag => (
            <div
              key={tag}
              className="bg-gray-200 text-gray-700 text-xs py-1 px-2 rounded"
            >
              {tag}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-gray-500 text-xs">
          <div className="flex items-center text-gray-300">
            <span>{formatDate(new Date(date))}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <span>{formatTime(new Date(date))}</span>
          </div>
        </div>
      </div>

    </>
  )
};

export default NoteCard;
