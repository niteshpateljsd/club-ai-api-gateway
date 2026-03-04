const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const spec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Camel API Gateway", version: "1.0.0" },
    servers: [{ url: "http://localhost:4001/api/v1" }],
  },
  apis: ["./docs/*.js"],
});

function connectSwagger(app) {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(spec));
}

module.exports = connectSwagger;
