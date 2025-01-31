const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation de l\'API avec Swagger',
        },
        servers: [
            {
                url: 'http://31.207.38.203', // Change selon ton environnement
                description: 'Serveur de développement',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Facultatif, mais recommandé pour préciser qu'on utilise un JWT
                },
            },
        },
        security: [{ BearerAuth: [] }], // Active le token par défaut pour toutes les routes
    },
    apis: ['./routes/*.js'], // Indique où Swagger doit chercher les annotations
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
