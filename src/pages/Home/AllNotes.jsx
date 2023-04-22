import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { BiFilterAlt } from 'react-icons/bi'
import { FiDelete } from 'react-icons/fi'

import NoteCard from "../../components/NotesCard";
import NoteNotFound from "../../components/NoteNotFound";
import Spinner from "../../components/common/Spinner";
import ToggleButton from "./ToggleButton";
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
  const [selectedTag, setSelectedTags] = useState("#all");
  //notes by tags
  const [notesByTag, setNotesByTag] = useState(null)

  const [toggleButtonStatus, setToggleButtonStatus] = useState(true)

  const handleChange = (event) => {
    setSelectedTags(event.target.value);
  };
  let token
  const getAccessToken = useMemo(() => {
    console.log("fetching     ")
    token = localStorage.getItem("token");
    if (!token) navigate("/login");
    return JSON.parse(token).accessToken;
  }, [token])



  const fetchingNotes = async () => {
    //!Fetch Notes API
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: toggleButtonStatus ? `${server_url}/api/notes/sort` : `${server_url}/api/notes/`,
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
      },
    };
    try {
      const response = await axios.request(config);
      if (response.data.notes.length === 0) {
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
    fetchingNotes()
  }, [allNotes])

  //IF savedAllNotes is undefined ==> return spinner
  if (!allNotes) return <Spinner />





  async function makeSearch () {
      //! Search API
  let searchConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${server_url}/api/notes/search/${searchTerm}`,
    headers: {
      'Authorization': `Bearer ${getAccessToken}`
    }
  };
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
    url: `${server_url}/api/notes/tags/${selectedTag.substring(1)}`,
    headers: {
      'Authorization': `Bearer ${getAccessToken}`
    }
  };
  async function notesByTagAPI () {
    try {
      const response = await axios.request(notesByTagConfig);
      console.log(JSON.stringify(response.data));
      setNotesByTag(response.data)
    }
    catch (error) {
      console.log(error);
    }
  }

  const onFilter = () => {
    if (selectedTag == "#all") return
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
        searchTerm ?

          <SearchResults searchTerm={searchTerm} searchNote={searchNote} server_url={server_url} />

          :

          <>
            <div className=" my-7 mx-6 gap-2 flex flex-col">
              <h1 className="text-3xl font-bold">Saved Notes</h1>
              <h1 className="font-semibold">Total Notes {allNotes.notes && allNotes.notes.length}</h1>
              <div className="gap-3 flex flex-col justify-start items-start sm:items-center sm:justify-start sm:flex-row">
                {
                  allNotes.notes &&
                  allNotes.notes.length !== 0 &&
                  <>
                    <div className="flex justify-between w-full items-center flex-wrap gap-3">

                      <div className="flex gap-3">
                        <div className="flex  items-center gap-3">
                          <h1 className="font-bold">Tags</h1>
                          <select
                            className="block w-full px-4 py-2  pr-8 font-semibold leading-tight bg-gray-300 border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                            value={selectedTag}
                            onChange={handleChange}
                          >
                            <option value={"#all"} disabled>{"#all"}</option>
                            {

                              allNotes.tags.length > 0 && allNotes.tags.map((item, index) => {
                                return <option key={index} value={item}>{item}</option>
                              })
                            }
                          </select>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => {
                            setSelectedTags('#all')
                            setNotesByTag(null)
                          }
                          } className="bg-gray-500 px-5 hover:bg-gray-900 py-2 rounded text-white"><FiDelete /></button>
                          <button onClick={onFilter} className="bg-gray-500 px-5 hover:bg-gray-900 py-2 rounded text-white"><BiFilterAlt /></button>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <h1 className="font-semibold">Sort by Latest</h1>
                        <ToggleButton toggleButtonStatus={toggleButtonStatus} setToggleButtonStatus={setToggleButtonStatus} />
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>

            {
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 mx-6 my-2">
                  {!notesByTag ? allNotes.notes && allNotes.notes.map((item, index) => {
                    return (
                      <NoteCard
                        date={item.createdAt}
                        key={index}
                        id={item._id}
                        title={item.title}
                        body={item.body}
                        tags={item.tags}
                        server_url={server_url}
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
                        server_url={server_url}
                      />
                    );
                  })}
                </div>
            }
          </>
      }
    </div>
  );
};
const SearchResults = ({ searchTerm, searchNote, server_url }) => {
  return (
    <>
      {
        searchTerm &&
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
      }
    </>
  )
}
export default AllNotes;
