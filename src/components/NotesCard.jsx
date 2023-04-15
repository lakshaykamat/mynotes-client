import React from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
const NoteCard = ({ title, body, tags, id }) => {
  const limitedBody = body.length > 70 ? `${body.slice(0, 70)}...` : body;

  const getAccessToken = () => {
    console.log("Fetching token...");
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

  async function makeRequest() {
    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      id={id}
      className="bg-slate-300 flex flex-col justify-start items-start hover:bg-slate-400 transition outline outline-1 outline-slate-900  rounded-lg shadow-md p-6"
    >
      

      <div className="flex justify-between items-center w-full">
      <Link to={`/home/edit-note/${id}`}>
      <h2 className="text-lg font-medium mb-2 hover:underline transition">{title}</h2>
      </Link>
        <AiOutlineDelete
        title="Delete Note"
        onClick={makeRequest}
        className="w-6 text-slate-500 hover:text-slate-900 h-6"
      />
      </div>
        
      <p className="text-gray-700 mb-4">{limitedBody}</p>
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
  );
};

export default NoteCard;
