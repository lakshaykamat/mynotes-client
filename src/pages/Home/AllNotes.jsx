import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {BiFilterAlt} from 'react-icons/bi'
import {FiDelete} from 'react-icons/fi'

import NoteCard from "../../components/NotesCard";
import NoteNotFound from "../../components/NoteNotFound";
import Spinner from "../../components/common/Spinner";
import SearchBar from "./SearchBar";

const AllNotes = ({ server_url }) => {

  const navigate = useNavigate();
  //state for search bar
  const [searchTerm, setSearchTerm] = useState("");
  //state for user notes
  const [allNotes, setAllNotes] = useState(null);
  //state for search data
  const [searchNote, setSearchNote] = useState(null)
  //state for tags
  const [selectedTag, setSelectedTags] = useState("#general");
  //fetchedTags
  const [fetchedTags, setFetchedTags] = useState(null)
  //notes by tags
  const [notesByTag, setNotesByTag] = useState(null)

  const handleChange = (event) => {
    setSelectedTags(event.target.value);
  };
  const getAccessToken = () => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    return JSON.parse(token).accessToken;
  };

  //!Fetch Notes API
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${server_url}/api/notes/sort`,
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


  //!Fetch all tags used in notes
  let fetchTagConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost/api/notes/tags/all',
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`
    }
  };

  async function tagFetching () {
    try {
      const response = await axios.request(fetchTagConfig);
      setFetchedTags(response.data)
      console.log(JSON.stringify(response.data));
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchingNotes();
    tagFetching()
  }, []);

  //IF savedAllNotes is undefined ==> return spinner
  if (!allNotes) return <Spinner />



  //! Search API
  let searchConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${server_url}/api/notes/search/${searchTerm}`,
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`
    }
  };

  async function makeSearch () {
    try {
      const response = await axios.request(searchConfig);
      setSearchNote(response.data)
      console.log(searchNote)
    }
    catch (error) {
      console.log(error);
    }
  }





  //!Fetch Notes by Tags
  let notesByTagConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost/api/notes/tags/${selectedTag.substring(1)}`,
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`
    }
  };

  async function notesByTagAPI () {
    try {
      console.log("R")
      const response = await axios.request(notesByTagConfig);
      console.log(JSON.stringify(response.data));
      setNotesByTag(response.data)
    }
    catch (error) {
      console.log(error);
    }
  }

  const onFilter = () => {
    console.log(selectedTag.substring(1))
    notesByTagAPI()
  }
  return (
    <div>
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
      <SearchBar searchTerm={searchTerm} makeSearch={makeSearch} setSearchTerm={setSearchTerm} />


      {
        /*
        IF searchbar have any string ==> HIT the API
        IF searchNote is null ==> fetching the data ==> show spinner
        IF searchNote array length is 0 ==> Note not found
        IF searchNote array have any data ==> Show the note
        */
        searchTerm ?
          <div className="mx-4">
            <h1 className="text-2xl font-semibold my-4">Search Results for {searchTerm}</h1>
            {
              !searchNote ?
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mx-6 my-2`}>
                  <Spinner />
                </div>
                :
                <div className={` ${searchNote.length === 0 ? "flex  justify-center items-center" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mx-6 my-2"}`}>
                  {

                    searchNote.length === 0 ? <NoteNotFound /> :
                      searchNote.map((item, index) => {
                        return (
                          <NoteCard
                            date={item.createdAt}
                            key={index}
                            id={item._id}
                            title={item.title}
                            body={item.body}
                            tags={item.tags}
                            server_url={server_url} />

                        )
                      })
                  }
                </div>
            }

          </div>


          :


          <>
            {/* SAVED NOTES */}
            <div className="my-7 mx-6 gap-2 flex flex-col">
              <h1 className="text-3xl font-bold">Saved Notes</h1>
              <h1 className="font-semibold">Total Notes {allNotes.length}</h1>
              <div className="gap-3 flex flex-col justify-start items-start sm:items-center sm:justify-start sm:flex-row max-w-xl">
              <div className="flex  items-center gap-3">

            
                <h1 className="font-bold">Tags</h1>
                <select
                  className="block w-full px-4 py-2  pr-8 font-semibold leading-tight bg-gray-300 border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                  value={selectedTag}
                  onChange={handleChange}
                >  
                  {
                    fetchedTags && fetchedTags.map((item, index) => {
                      return <option value={item}>{item}</option>
                    })
                  }
                </select>
                </div>
                {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.95 7.293a1 1 0 0 0-1.414 0L10 10.336l-3.536-3.043a1 1 0 1 0-1.237 1.554l4 3.445a1 1 0 0 0 1.237 0l4-3.445a1 1 0 0 0 0-1.554z"
                    />
                  </svg>
                </div> */}
                <div className="flex gap-3">

                <button onClick={()=>{
                setSelectedTags('#general')
                setNotesByTag(null)
                }
                } className="bg-gray-500 px-5 hover:bg-gray-900 py-2 rounded text-white"><FiDelete/></button>
                <button onClick={onFilter} className="bg-gray-500 px-5 hover:bg-gray-900 py-2 rounded text-white"><BiFilterAlt/></button>
                </div>
              </div>
            </div>

            {

<>
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 mx-6 my-2">
                {allNotes.map((item, index) => {
                  return (
                    <NoteCard
                      date={item.createdAt}
                      key={index}
                      id={item._id}
                      title={item.title}
                      body={item.body}
                      tags={item.tags}
                    />
                  );
                })}
              </div> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 mx-6 my-2">
                {!notesByTag ? allNotes.map((item, index) => {
                  return (
                    <NoteCard
                      date={item.createdAt}
                      key={index}
                      id={item._id}
                      title={item.title}
                      body={item.body}
                      tags={item.tags}
                    />
                  );
                }) : notesByTag.map((item, index) => {
                  return (
                    <NoteCard
                      date={item.createdAt}
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
          </>
      }
    </div>
  );
};

export default AllNotes;
