import React from 'react'
import notFound from '../assets/no-found.gif'
const NoteNotFound = () => {
  return (
    <div className='flex my-12 bg-slate-100 rounded-sm p-5 flex-col justify-center items-center mx-5 sm:mx-auto max-w-xl'>
        <h1 className='text-3xl  text-center font-bold my-2'>You haven't created a note now</h1>
      <img className='w-64' src={notFound} alt="" />
    </div>
  )
}

export default NoteNotFound
