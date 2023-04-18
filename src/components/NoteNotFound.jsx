import React from 'react'
import notFound from '../assets/no-found.gif'
const NoteNotFound = () => {
  return (
    <div className=' flex my-12  rounded-sm p-5  flex-col justify-center items-center '>
      <img className='w-64' src={notFound} alt="" />
        <h1 className='text-3xl text-center font-bold my-2'>Not Found</h1>
    </div>
  )
}

export default NoteNotFound
