import React, { useEffect, useState } from 'react'
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
const Home = ({ server_url, allNotes, fetchingNotes, getAccessToken, setAllNotes }) => {

  //State for Search input box
  const [searchTerm, setSearchTerm] = useState("");
  // state for toggle button
  const [toggleButtonStatus, setToggleButtonStatus] = useState(true)
  const [searchNote, setSearchNote] = useState(null)


  //Fetch all user notes when page loads
  useEffect(() => {
    setAllNotes(null)
    getAccessToken && fetchingNotes()
  }, [])


  async function makeRequest () {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${server_url}/api/notes/search/${searchTerm}`,
      headers: {
        'Authorization': `Bearer ${getAccessToken}`
      }
    };
    try {
      const response = await axios.request(config);
      setSearchNote(response.data)
      console.log(JSON.stringify(response.data));
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    setSearchNote(null)
    if (searchTerm) {
      makeRequest()
    }
  }, [searchTerm])


  const sortToLatest = (a,b)=>{
    return new Date(b.createdAt) - new Date(a.createdAt)
  }
  const sortToOldest= (a,b)=>{
    return new Date(a.createdAt) - new Date(b.createdAt)
  }
  return (
    <>

      {
        !allNotes ? <Spinner />
          :
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
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {
              searchTerm ?
                <SearchResults searchNote={searchNote} searchTerm={searchTerm} getAccessToken={getAccessToken} />
                :
                <>
                  <div className=" my-7 mx-6 gap-2 flex flex-col">
                    <h1 className="text-3xl font-bold">Saved Notes</h1>
                    <h1 className="font-semibold">Total Notes {allNotes.length}</h1>
                    <div className="gap-3 flex flex-col justify-start items-start sm:items-center sm:justify-start sm:flex-row">
                      <Filtering
                        allNotes={allNotes}
                        setAllNotes={setAllNotes}
                        toggleButtonStatus={toggleButtonStatus}
                        setToggleButtonStatus={setToggleButtonStatus}
                        fetchingNotes={fetchingNotes}
                        getAccessToken={getAccessToken}
                        server_url={server_url}
                      />
                    </div>
                  </div>
                  <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 mx-6 my-2`}>
                    {
                      toggleButtonStatus ? allNotes.sort(sortToLatest).map((item, index) => {
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
                            getAccessToken={getAccessToken}
                          />
                        );
                      })
                      :
                      allNotes.sort(sortToOldest).map((item, index) => {
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
                            getAccessToken={getAccessToken}
                          />
                        );
                      })
                    }
                  </div>
                </>

            }
            <Link to="create-note">
              <div title="Create Note" className='flex flex-row-reverse text-white  font-bold gap-3 cursor-pointer fixed bottom-5 p-2 rounded-lg right-5 bg-slate-700 hover:bg-slate-900'>
                <h1>New Note</h1>
                <AiOutlineFileAdd className='text-white w-7 h-7' />
              </div>
            </Link>
          </div>
      }

    </>
  )
}
const Filtering = ({ allNotes, toggleButtonStatus, setToggleButtonStatus, fetchingNotes, getAccessToken, setAllNotes ,server_url}) => {

  //state for tags
  const [selectedTag, setSelectedTags] = useState("#all");
  const [allTags, setAllTags] = useState([])


  async function fetchTags () {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${server_url}/api/notes/tags/all`,
      headers: {
        'Authorization': `Bearer ${getAccessToken}`
      }
    }
    try {
      const response = await axios.request(config);
      setAllTags(response.data)
      console.log(JSON.stringify(response.data));
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])


  const removeFilter = () => {
    //* Remove all filters show all notes
    if (selectedTag == "#all") return
    setSelectedTags('#all')
    fetchingNotes()
  }

  const filterNotes = () => {
    if (selectedTag == "#all") return
    const notes = allNotes.filter(note => note.tags.includes(selectedTag))
    setAllNotes(notes)
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

              allTags.map((item, index) => {
                return <option key={index} value={item}>{item}</option>
              })
            }
          </select>
        </div>
        <div className="flex gap-3">
          <button onClick={removeFilter}
            className="bg-gray-500 px-5 hover:bg-gray-900 py-2 rounded text-white"><FiDelete /></button>
          <button onClick={filterNotes} className="bg-gray-500 px-5 hover:bg-gray-900 py-2 rounded text-white"><BiFilterAlt /></button>
        </div>
      </div>
      <div className="flex gap-2">
        <h1 className="font-semibold">Sort by Latest</h1>
        <ToggleButton toggleButtonStatus={toggleButtonStatus} setToggleButtonStatus={setToggleButtonStatus} />
      </div>
    </div>
  )
}
export default Home
