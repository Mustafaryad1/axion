const swaggerJSDoc = require("swagger-jsdoc");
const schoolManagerPaths = require("./swagger/school");
const classroomManagerPaths = require("./swagger/classroom");
const studentManagerPaths = require("./swagger/student");
const { serve } = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "My API Description",
  },
  tags: [
    {
      name: "School",
      description: "School API",
    },
    {
      name: "Classroom",
      description: "Classroom API",
    },
    {
      name: "Student",
      description: "Student API",
    },
  ],

  servers: [
    {
      url: "http://localhost:5111",
      description: "Development server",
    },
  ],
  components: {
    parameters: {
      Authorization: {
        name: "Authorization",
        in: "header",
        required: true,
        style: "simple",
        schema: {
          type: "string",
        },
      },
    },
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        name: "Authorization",
        scheme: "bearer",
        description: "Enter JWT token",
        in: "header",
      },
    },
  },
  security: [{ ApiKeyAuth: [] }],

  externalDocs: { url: "", description: "" },
  warnings: [],
  paths: {
    ...schoolManagerPaths,
    ...classroomManagerPaths,
    ...studentManagerPaths,
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
