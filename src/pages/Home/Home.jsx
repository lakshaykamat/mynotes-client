import React from 'react'
import {AiOutlineFileAdd} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import AllNotes from './AllNotes'
import Navbar from '../../components/common/Navbar'
import LandingPage from './LandingPage'

const Home = () => {
  return (
    <div>
      <AllNotes/>
      <Link to="create-note">
      <div title="Create Note" className='cursor-pointer flex flex-row-reverse fixed bottom-5 px-5 gap-3 py-3 hover:bg-slate-900 rounded-lg right-5 bg-slate-700'>
      <h1 className='text-white font-bold'>New Note</h1>
        <AiOutlineFileAdd className='text-white w-7 h-7'/>
      </div>
      </Link>
    </div>
  )
}

export default Home
