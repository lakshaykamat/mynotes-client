import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const PrivateComponents = () => {
  const authToken = localStorage.getItem('token')
  return authToken ? <Outlet/> : <Navigate to='/register'/>
}

export default PrivateComponents
