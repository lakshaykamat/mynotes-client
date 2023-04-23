import React, { useEffect, useMemo, useState } from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import { BiFilterAlt } from 'react-icons/bi'
import { FiDelete } from 'react-icons/fi'
import Spinner from '../../components/common/Spinner'
import axios from 'axios'
import SearchBar from './SearchBar'
import NoteCard from "../../components/NotesCard";
import ToggleButton from "./ToggleButton";
import SearchResults from './SearchResults';

const Home = ({ server_url, allNotes, fetchingNotes, toggleButtonStatus, setToggleButtonStatus, getAccessToken,setAllNotes }) => {

  //State for Search input box
  const [searchTerm, setSearchTerm] = useState("");
  //state for search data
  const [searchNote, setSearchNote] = useState(null)
  //notes by tags
  const [notesByTag, setNotesByTag] = useState(null)
  //loading screen state
  const [showSpinner,setShowSpinner] =  useState(false)



  //! Search API
  async function makeSearch () {
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
    }
    catch (error) {
      console.log(error);
    }
  }




  //Fetch all user notes when page loads
  useEffect(() => {
    setAllNotes(null)
    fetchingNotes()
  }, [])


  //IF savedAllNotes is false ==> return spinner
  if (!allNotes) return <Spinner />


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
                  //If user notes
                  allNotes.notes &&
                  <>
                    <Filtering
                      allNotes={allNotes}
                      setNotesByTag={setNotesByTag}
                      toggleButtonStatus={toggleButtonStatus}
                      setToggleButtonStatus={setToggleButtonStatus}
                      fetchingNotes={fetchingNotes}
                      server_url={server_url}
                      getAccessToken={getAccessToken}
                      setShowSpinner={setShowSpinner}
                    />
                  </>
                }
              </div>
            </div>
            {
              showSpinner ? <div className='mt-8'><Spinner/></div>

              : 
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 mx-6 my-2">
                {notesByTag ? notesByTag.map((item, index) => {
                  return (
                    <NoteCard
                      date={item.createdAt}
                      key={index}
                      id={item._id}
                      title={item.title}
                      body={item.body}
                      tags={item.tags}
                      server_url={server_url}
                      fetchingNotes={fetchingNotes}
                    />)
                }) : allNotes.notes && allNotes.notes.map((item, index) => {
                  return (
                    <NoteCard
                      date={item.createdAt}
                      key={index}
                      id={item._id}
                      title={item.title}
                      body={item.body}
                      tags={item.tags}
                      server_url={server_url}
                      fetchingNotes={fetchingNotes}
                    />
                  );
                })}
              </div>
            }

          </>
      }
      <Link to="create-note">
        <div title="Create Note" className='flex flex-row-reverse text-white  font-bold gap-3 cursor-pointer fixed bottom-5 p-2 rounded-lg right-5 bg-slate-700 hover:bg-slate-900'>
          <h1>New Note</h1>
          <AiOutlineFileAdd className='text-white w-7 h-7' />
        </div>
      </Link>
    </div>
  )
}
const Filtering = ({ allNotes, setNotesByTag, toggleButtonStatus, setToggleButtonStatus, fetchingNotes, server_url, getAccessToken,setShowSpinner}) => {

  //state for tags
  const [selectedTag, setSelectedTags] = useState("#all");


  //!Fetch Notes by Tags
  async function notesByTagAPI () {
    setShowSpinner(true)
    let notesByTagConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${server_url}/api/notes/tags/${selectedTag.substring(1)}`,
      headers: {
        'Authorization': `Bearer ${getAccessToken}`
      }
    };
    try {
      const response = await axios.request(notesByTagConfig);
      setNotesByTag(response.data)
      setShowSpinner(false)
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-between w-full items-center flex-wrap gap-3">
      <div className="flex gap-3">
        <div className="flex  items-center gap-3">
          <h1 className="font-bold">Tags</h1>
          <select
            className="block w-full px-4 py-2  pr-8 font-semibold leading-tight bg-gray-300 border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
            value={selectedTag}
            onChange={(event) => setSelectedTags(event.target.value)}
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
            //* Remove all filters show all notes
            setSelectedTags('#all')
            setNotesByTag(null)
          }
          } className="bg-gray-500 px-5 hover:bg-gray-900 py-2 rounded text-white"><FiDelete /></button>
          <button onClick={() => {
            //* Filter notes by tags
            if (selectedTag == "#all") return
            notesByTagAPI()
          }} className="bg-gray-500 px-5 hover:bg-gray-900 py-2 rounded text-white"><BiFilterAlt /></button>
        </div>
      </div>
      <div className="flex gap-2">
        <h1 className="font-semibold">Sort by Latest</h1>
        <ToggleButton toggleButtonStatus={toggleButtonStatus} setToggleButtonStatus={setToggleButtonStatus} fetchingNotes={fetchingNotes} setShowSpinner={setShowSpinner} />
      </div>
    </div>
  )
}
export default Home
