const getSchools = {
  summary: "Get a list of schools. [admin/super-admin]",
  description: "You can use this endpoint to get a list of schools.",
  responses: {
    200: {
      description: "A list of schools.",
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
                      description: "school ID",
                    },
                    name: {
                      type: "string",
                      description: "school name",
                    },
                    admins: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                      description: "list of admin IDs",
                    },
                    classrooms: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                      description: "list of classroom IDs",
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
  tags: ["School"],
};

const getStudentsBySchoolId = {
  summary: "Get a paginated list of students by school ID. [admin/super-admin]",
  description: "Retrieve a paginated list of students by school ID.",

  parameters: [
    {
      name: "id",
      in: "query",
      style: "form",
      schema: {
        type: "string",
      },
      description: "school ID",
    },
  ],
  responses: {
    200: {
      description: "A school.",
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
                  name: {
                    type: "string",
                    description: "student name",
                  },
                  age: {
                    type: "integer",
                    description: "student age",
                  },
                  schoolId: {
                    type: "string",
                    description: "school ID",
                  },
                  classroomId: {
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
  tags: ["School"],
};

const createSchool = {
  summary: "Create a school. [admin/super-admin]",
  description: "Create a school.",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "school name",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "A school.",
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
                    description: "school ID",
                  },
                  name: {
                    type: "string",
                    description: "school name",
                  },
                  admins: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    description: "list of admin IDs",
                  },
                  classrooms: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    description: "list of classroom IDs",
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
  tags: ["School"],
};

const updateSchool = {
  summary: "Update a school. [admin/super-admin]",
  description: "Update a school.",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "school name",
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
      description: "school ID",
    },
  ],
  responses: {
    200: {
      description: "A school.",
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
                    description: "school ID",
                  },
                  name: {
                    type: "string",
                    description: "school name",
                  },
                  admins: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    description: "list of admin IDs",
                  },
                  classrooms: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    description: "list of classroom IDs",
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
  tags: ["School"],
};

module.exports = {
  "api/school/v1_getSchools": {
    get: getSchools,
  },
  "api/school/v1_getSchoolById": {
    get: getStudentsBySchoolId,
  },
  "api/school/v1_createSchool": {
    post: createSchool,
  },
  "api/school/v1_updateSchool": {
    put: updateSchool,
  },
  "api/school/v1_deleteSchool": {
    delete: {
      summary: "Delete a school. [admin/super-admin]",
      description: "Delete a school.",
      parameters: [
        {
          name: "id",
          in: "query",
          style: "form",
          schema: {
            type: "string",
          },
          description: "school ID",
        },
      ],
      responses: {
        200: {
          description: "A school.",
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
                        description: "school ID",
                      },
                      name: {
                        type: "string",
                        description: "school name",
                      },
                      admins: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        description: "list of admin IDs",
                      },
                      classrooms: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        description: "list of classroom IDs",
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
      tags: ["School"],
    },
  },
};
