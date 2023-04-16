import React from 'react'
import notFound from '../assets/no-found.gif'
import { Link } from 'react-router-dom'
const NoteNotFound = () => {
  return (
    <div className='drop-shadow-lg flex my-12 bg-slate-100 rounded-sm p-5 flex-col justify-center items-center mx-5 sm:mx-auto max-w-xl'>
      <img className='w-64' src={notFound} alt="" />
        <h1 className='text-3xl  text-center font-bold my-2'>You haven't created a note now</h1>
        <Link to="create-note" className='bg-gray-500 transition hover:bg-gray-600 text-center w-full text-white p-3 rounded font-semibold outline'>
        <button>Create Note</button>
        </Link>
    </div>
  )
}

export default NoteNotFound
