const express = require("express");
const { signIn, signUp, forgotPassword, newPassword, verifyToken, verifyEmail, getLocation } = require("../../controllers/auth");
const { authGuard } = require("../../middleware/authGuard");
const Router = express.Router();

// Only Auth Andpoints here
Router.post('/signIn', signIn);
Router.post('/signUp', signUp);
Router.post('/forgotPassword', forgotPassword);
Router.get('/verifyToken', authGuard, verifyToken);
Router.post('/newPassword', authGuard, newPassword); 
Router.post('/verifyEmail/:token', verifyEmail);
Router.get('/location/:ip', getLocation);

module.exports = Router;