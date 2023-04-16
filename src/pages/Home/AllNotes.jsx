import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import NoteCard from "../../components/NotesCard";
import NoteNotFound from "../../components/NoteNotFound";
import Spinner from "../../components/common/Spinner";
import SearchBar from "./SearchBar";

const AllNotes = () => {

  const navigate = useNavigate();
  //state for search bar
  const [searchTerm, setSearchTerm] = useState("");
  //state for user notes
  const [allNotes, setAllNotes] = useState(null);
  //state for search data
  const [searchNote, setSearchNote] = useState(null)

  const getAccessToken = () => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    return JSON.parse(token).accessToken;
  };

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://mynotes-server-jznn.onrender.com/api/notes/",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  async function fetchingNotes () {
    try {
      const response = await axios.request(config);
      if (response.data.length === 0) {
        setAllNotes([]);
      } else {
        setAllNotes(response.data);
      }
    } catch (error) {
      console.log(error)
      if (error.response.data.message === "User is not authorized") {
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    fetchingNotes();
  }, [allNotes]);

  //if notes is undefined return spinner
  if (!allNotes) {
    return <Spinner />
    //if notes length is 0 then return note not found
  } else if (allNotes.length === 0) {
    return <NoteNotFound />
  }



  let searchConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost/api/notes/search/${searchTerm}`,
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`
    }
  };

  async function makeSearch () {
    try {
      const response = await axios.request(searchConfig);
      setSearchNote(response.data)
    }
    catch (error) {
      console.log(error);
    }
  }



  return (
    <div>

        <SearchBar searchTerm={searchTerm} makeSearch={makeSearch} setSearchTerm={setSearchTerm} />


      {
        //if search bar have any string or search notes array have any array so print the searched notes
        searchTerm && searchNote ?
          <div className="mx-4">
            <h1 className="text-2xl font-semibold my-4">Search Results for {searchTerm}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mx-6 my-2">
              {
                searchNote.map((item, index) => {
                  return (
                    <NoteCard
                      key={index}
                      id={item._id}
                      title={item.title}
                      body={item.body}
                      tags={item.tags} />

                  )
                })
              }
            </div>
          </div>


          :

          
          <>
            {/* SAVED NOTES */}
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
      }
    </div>
  );
};

export default AllNotes;
