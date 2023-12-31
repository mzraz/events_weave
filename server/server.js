// Access env Through out the project files
require('dotenv').config();

const express = require('express');
const http = require('http');
const httpPort = process.env.HTTP_PORT;
const hostname = process.env.LOCAL_HOST;
const app = express();
const httpServer = http.createServer(app);

const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./app/router/index.js');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./app/swagger/index.js');
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Enabling cores and body Parser
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: true }));

// Setting Up the api and swagger routes 
app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Server startup
const startServer = (server, port) => {
    server.listen(port, hostname, () => {
        console.log(`App listening at http://${hostname}:${port}`);
    });
};

startServer(httpServer, httpPort);