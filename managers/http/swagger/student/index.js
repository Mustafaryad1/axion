const getStudents = {
  summary: "Get a list of students. [admin/super-admin]",
  description: "You can use this endpoint to get a list of students.",
  responses: {
    200: {
      description: "A list of students.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                description: "Indicates if the request was successful.",
              },
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      description: "student ID",
                    },
                    name: {
                      type: "string",
                      description: "student name",
                    },
                    classroom: {
                      type: "string",
                      description: "classroom ID",
                    },
                    __v: {
                      type: "integer",
                      description: "version key",
                    },
                  },
                },
              },
              errors: {
                type: "array",
                items: {
                  type: "string",
                },
                description: "list of errors",
              },
              message: {
                type: "string",
                description: "additional message",
              },
            },
          },
        },
      },
    },
  },
  tags: ["Student"],
};

const createStudent = {
  summary: "Create a student. [admin/super-admin]",
  description: "Create a student.",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "student name",
            },
            classroom: {
              type: "string",
              description: "classroom ID",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "A student.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                description: "Indicates if the request was successful.",
              },
              data: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    description: "student ID",
                  },
                  classroom: {
                    type: "string",
                    description: "classroom ID",
                  },
                  name: {
                    type: "string",
                    description: "student name",
                  },
                  __v: {
                    type: "integer",
                    description: "version key",
                  },
                },
              },
              errors: {
                type: "array",
                items: {
                  type: "string",
                },
                description: "list of errors",
              },
              message: {
                type: "string",
                description: "additional message",
              },
            },
          },
        },
      },
    },
  },
  tags: ["Student"],
};

const updateStudent = {
  summary: "Update a student. [admin/super-admin]",
  description: "Update a student.",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "student name",
            },
            classroom: {
              type: "string",
              description: "classroom ID",
            },
          },
        },
      },
    },
  },
  parameters: [
    {
      name: "id",
      in: "query",
      style: "form",
      schema: {
        type: "string",
      },
      description: "student ID",
    },
  ],
  responses: {
    200: {
      description: "A student.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                description: "Indicates if the request was successful.",
              },
              data: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    description: "student ID",
                  },
                  classroom: {
                    type: "string",
                    description: "classroom ID",
                  },
                  __v: {
                    type: "integer",
                    description: "version key",
                  },
                },
              },
              errors: {
                type: "array",
                items: {
                  type: "string",
                },
                description: "list of errors",
              },
              message: {
                type: "string",
                description: "additional message",
              },
            },
          },
        },
      },
    },
  },
  tags: ["Student"],
};

const deleteStudent = {
  summary: "Delete a student. [admin/super-admin]",
  description: "Delete a student.",
  parameters: [
    {
      name: "id",
      in: "query",
      style: "form",
      schema: {
        type: "string",
      },
      description: "student ID",
    },
  ],
  responses: {
    200: {
      description: "A student.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                description: "Indicates if the request was successful.",
              },
              data: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    description: "student ID",
                  },
                  classroom: {
                    type: "string",
                    description: "classroom ID",
                  },
                  __v: {
                    type: "integer",
                    description: "version key",
                  },
                },
              },
              errors: {
                type: "array",
                items: {
                  type: "string",
                },
                description: "list of errors",
              },
              message: {
                type: "string",
                description: "additional message",
              },
            },
          },
        },
      },
    },
  },
  tags: ["Student"],
};

module.exports = {
  "api/student/v1_getStudents": {
    get: getStudents,
  },
  "api/student/v1_createStudent": {
    post: createStudent,
  },
  "api/student/v1_updateStudent": {
    put: updateStudent,
  },
  "api/student/v1_deleteStudent": {
    delete: deleteStudent,
  },
};
