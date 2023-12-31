const express = require("express");
const eventController = require("../../controllers/event");
const { upload } = require('../../middleware/multer');
const Router = express.Router();

// Only Auth Andpoints here

Router.post("/create", eventController.createEvent )

Router.get('/get/:userId', eventController.getEventsByUserId);

Router.put('/update/:eventId', eventController.updateEvent);

Router.delete('/delete/:eventId', eventController.deleteEvent);

module.exports = Router;