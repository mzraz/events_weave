// Swagger SetUp 
// All the api routes file in this folder 
// will be automatically accessed by the swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Event-Weave',
            description: 'API documentation',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: 'Bearer token to access these api endpoints',
                    scheme: 'bearer',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./app/swagger/*.swagger.js'],
};

module.exports = swaggerOptions