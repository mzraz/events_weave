const express = require("express");
const serviceController = require("../../controllers/service");
const { authGuard } = require("../../middleware/authGuard");
const Router = express.Router();

// Only Auth Andpoints here
Router.post('/create', serviceController.createService);

Router.get('/get/:userId', serviceController.getServicesByUser);

Router.put('/update/:serviceId', serviceController.updateServicesByUserId);

Router.delete('/delete', serviceController.deleteServicesOfUser);

Router.get('/getservicefeed/:userId', serviceController.getEventsByServiceProviderId);

module.exports = Router;