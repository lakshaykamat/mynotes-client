import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token) navigate("/login")
    })
    const logout = ()=>{
        localStorage.clear()
        navigate('/login')
    }
  return (
    <div>
      <h1 className='text-center text-3xl'>Profile Page</h1>
      <div className="flex bg-slate-300 p-5 m-5">
        <h1>Name</h1>
        <h1>Email</h1>
      </div>
      <button 
      onClick={logout}
      className='bg-red-500 hover:bg-red-600 px-6 py-2 mx-auto block rounded-md text-white'>LOGOUT</button>
    </div>
  )
}

export default Profile
