module.exports = {
  createStudent: [
    {
      model: "name",
      required: true,
    },
    {
      model: "classroom",
      required: true,
    },
  ],
  updateStudent: [
    {
      model: "name",
      required: false,
    },
    {
      model: "classroom",
      required: false,
    },
  ],
};
