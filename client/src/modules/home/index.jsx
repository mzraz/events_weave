import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Home = () => {
  const dispatch= useDispatch()

  const handleLogout=()=>{
    dispatch(logout())
  }  

  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <h3>Home Page</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home