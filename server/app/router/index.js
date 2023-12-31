const express = require("express");
const Router = express.Router();
const userRoutes = require('./routes/user')
const eventRoutes = require('./routes/event')
const serviceRoutes = require('./routes/service')
const { authGuard } = require("../middleware/authGuard");

Router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// Define all the Endpoint here 
Router.use("/user", userRoutes);
Router.use("/event", eventRoutes);
Router.use("/service", serviceRoutes);

module.exports = Router;