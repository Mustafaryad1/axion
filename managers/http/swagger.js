const swaggerJSDoc = require("swagger-jsdoc");
const schoolManagerPaths = require("./swagger/school");
const classroomManagerPaths = require("./swagger/classroom");
const studentManagerPaths = require("./swagger/student");
const userManagerPaths = require("./swagger/user");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "My API Description",
  },
  tags: [
    {
      name: "User",
      description: "User API",
    },
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
      description: "local server",
    },
    {
      url: " http://142.93.47.38:5111",
      description: "deployment server",
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
    ...userManagerPaths,
    ...schoolManagerPaths,
    ...classroomManagerPaths,
    ...studentManagerPaths,
  },
};

const options = {
  swaggerDefinition,
  apis: ["./UserServer.manager.js"], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
