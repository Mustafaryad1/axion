const createUser = {
  tags: ["User"],
  description: "Create a user",
  operationId: "createUser",
  security: [],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            username: {
              type: "string",
            },
            password: {
              type: "string",
            },
            role: {
              type: "string",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                  },
                  username: {
                    type: "string",
                  },
                  role: {
                    type: "string",
                  },
                },
              },
              longToken: {
                type: "string",
              },
            },
          },
        },
      },
      description: "User created successfully",
    },
    400: {
      description: "Bad request",
    },
    500: {
      description: "Internal server error",
    },
  },
};

const login = {
  tags: ["User"],
  description: "Login",
  operationId: "login",
  security: [],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            username: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                  },
                  username: {
                    type: "string",
                  },
                  role: {
                    type: "string",
                  },
                },
              },
              longToken: {
                type: "string",
              },
            },
          },
        },
      },
      description: "Logged in successfully",
    },
    400: {
      description: "Bad request",
    },
    500: {
      description: "Internal server error",
    },
  },
};

module.exports = {
  "/user/v1_createUser": {
    post: createUser,
  },
  "/user/v1_login": {
    post: login,
  },
};
