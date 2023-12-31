import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import Login from '../modules/auth/login'
import Register from '../modules/auth/register';
import Home from '../modules/home';
import AnimateRoute from './animateRoute';
import ForgetPassword from '../modules/auth/forgetPassword';
import NewPassword from '../modules/auth/newPassword';

const AppRoutes= ( { token } )=> {
  
  return (
    <Routes>
        {/* <Route exact path="/" element={<AnimateRoute><Home/></AnimateRoute>} /> */}
        { token =="" &&
          <>
            <Route exact path="/login" element={ <AnimateRoute><Login/></AnimateRoute> } />
            <Route exact path="/register" element={ <AnimateRoute><Register/></AnimateRoute>} />
            <Route exact path="/forgetPassword" element={ <AnimateRoute><ForgetPassword/></AnimateRoute>} />
            <Route exact path="/newPassword/:token" element={ <AnimateRoute><NewPassword/></AnimateRoute>} />
            <Route exact path="/verifyEmail/:token" element={ <AnimateRoute><NewPassword/></AnimateRoute>} />
          </>
        }
        <Route
          path="/"
          element={
            <ProtectedRoute token ={ token } redirectPath={"/login"}>
              <Home/>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}
 
export default AppRoutes
