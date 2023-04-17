import React from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
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
    const hour = date.getHours();
    const minute = date.getMinutes();

    // Format the date string
    const formattedDate = `${day} ${month} ${year} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

    return formattedDate;
  }
  const limitedBody = body.length > 70 ? `${body.slice(0, 70)}...` : body;

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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div
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
        <span className="text-sm  mb-4 hover:underline transition text-white font-semibold">{formatDate(new Date(date))}</span>
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
      </div>


      {/* <div className="bg-gray-600 shadow-lg rounded-md p-4 max-w-xs mx-auto">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white">{body}</p>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-800 text-white font-medium rounded-full px-3 py-1 text-sm mr-2 mt-2"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <button
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center"
        // onClick={onDelete}
      >
        <RiDeleteBinLine className="mr-2" />
        Delete
      </button>
    </div> */}
    </>
  )
};

export default NoteCard;
