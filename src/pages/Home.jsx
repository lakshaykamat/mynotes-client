import React from 'react'
import {AiOutlineFileAdd} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import AllNotes from '../components/AllNotes'
import Navbar from '../components/common/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <AllNotes/>
      <Link to="create-note">
      <div title="Create Note" className='cursor-pointer fixed bottom-5 p-2 rounded-lg right-5 bg-slate-900'>
        <AiOutlineFileAdd className='text-white w-7 h-7'/>
      </div>
      </Link>
    </div>
  )
}

export default Home
