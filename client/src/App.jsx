import React, { useState } from 'react'
import Routes from './routes/routes'
import { useSelector } from 'react-redux'

function App() {
  const token = useSelector((state)=> state.auth.accessToken)
  
  return (
    <>
      <Routes token={ token }/> 
    </>
  )
}

export default App
