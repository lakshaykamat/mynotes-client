import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponents = () => {
  const authToken = localStorage.getItem('token')
  return authToken ? <Outlet/> : <Navigate to='/register'/>
}

export default PrivateComponents
