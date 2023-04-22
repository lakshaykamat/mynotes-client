import React, { useCallback, useMemo } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const NoteCard = ({ title, body, tags, id, date,server_url }) => {
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
  let token
  const getAccessToken = useMemo(() => {
    console.log("Fetching token...")
     token = localStorage.getItem("token");
    if (!token) navigate("/login");
    return JSON.parse(token).accessToken;
  },[token])


  async function DeleteNote () {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${server_url}/api/notes/${id}`,
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
      },
    };
  
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          await axios.request(config);
          resolve("OKAY")
        } catch (error) {
          console.log(id)
          reject(error);
        }
      }),
      {
        pending: "Deleting...",
        success: "Deleted",
        error: "Failed to Delete",
        duration: 5000,
        onClose: () => {
          console.log("Toast closed");
        },
      }
    );
  }

  return (
    <>

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
                if (confirm) DeleteNote()
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
