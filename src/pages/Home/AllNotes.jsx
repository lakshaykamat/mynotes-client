import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NoteCard from "../../components/NotesCard";
import NoteNotFound from "../../components/NoteNotFound";
import Spinner from "../../components/common/Spinner";
const AllNotes = () => {
  const navigate = useNavigate();
  const [allNotes, setAllNotes] = useState(null);

  const getAccessToken = () => {
    console.log("Fetching token...");
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    return JSON.parse(token).accessToken;
  };

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost/api/notes/",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  async function makeRequest() {
    try {
      const response = await axios.request(config);
      console.log(response.data.length);
      if (response.data.length === 0) {
        setAllNotes([]);
      } else {
        setAllNotes(response.data);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.message === "User is not authorized") {
        navigate("/login");
      }
    }
  }
  useEffect(() => {
    makeRequest();
  }, [allNotes]);

  return (
    <div>
      {!allNotes ? (
        <Spinner />
      ) : allNotes.length === 0 ? (
        <NoteNotFound />
      ) : (
        <>
          <div className="my-7 mx-6 gap-2 flex flex-col">
            <h1 className="text-3xl font-bold">Saved Notes</h1>
            <h1 className="font-semibold">Total Notes {allNotes.length}</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mx-6 my-2">
            {allNotes.map((item, index) => {
              return (
                  <NoteCard
                  key={index}
                    id={item._id}
                    title={item.title}
                    body={item.body}
                    tags={item.tags}
                  />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default AllNotes;
