const getClassrooms = {
  summary: "Get a list of classrooms. [admin/super-admin]",
  description: "You can use this endpoint to get a list of classrooms.",
  responses: {
    200: {
      description: "A list of classrooms.",
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
                      description: "classroom ID",
                    },
                    name: {
                      type: "string",
                      description: "classroom name",
                    },
                    school: {
                      type: "string",
                      description: "school ID",
                    },
                    students: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                      description: "list of student IDs",
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
  tags: ["Classroom"],
};

const createClassroom = {
  summary: "Create a classroom. [admin/super-admin]",
  description: "Create a classroom.",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "classroom name",
            },
            school: {
              type: "string",
              description: "school ID",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "A classroom.",
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
                    description: "classroom ID",
                  },
                  name: {
                    type: "string",
                    description: "classroom name",
                  },
                  school: {
                    type: "string",
                    description: "school ID",
                  },
                  students: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    description: "list of student IDs",
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
  tags: ["Classroom"],
};

const updateClassroom = {
  summary: "Update a classroom. [admin/super-admin]",
  description: "Update a classroom.",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "classroom name",
            },
            school: {
              type: "string",
              description: "school ID",
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
      description: "classroom ID",
    },
  ],
  responses: {
    200: {
      description: "A classroom.",
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
                    description: "classroom ID",
                  },
                  name: {
                    type: "string",
                    description: "classroom name",
                  },
                  school: {
                    type: "string",
                    description: "school ID",
                  },
                  students: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    description: "list of student IDs",
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
  tags: ["Classroom"],
};

module.exports = {
  "api/classroom/v1_getClassrooms": {
    get: getClassrooms,
  },
  "api/classroom/v1_createClassroom": {
    post: createClassroom,
  },
  "api/classroom/v1_updateClassroom": {
    put: updateClassroom,
  },
  "api/classroom/v1_deleteClassroom": {
    delete: {
      summary: "Delete a classroom. [admin/super-admin]",
      description: "Delete a classroom.",
      parameters: [
        {
          name: "id",
          in: "query",
          style: "form",
          schema: {
            type: "string",
          },
          description: "classroom ID",
        },
      ],
      responses: {
        200: {
          description: "A classroom.",
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
                        description: "classroom ID",
                      },
                      name: {
                        type: "string",
                        description: "classroom name",
                      },
                      school: {
                        type: "string",
                        description: "school ID",
                      },
                      students: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        description: "list of student IDs",
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
      tags: ["Classroom"],
    },
  },
};
