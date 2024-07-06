module.exports = {
  createSchool: [
    {
      model: "name",
      required: true,
    },
    {
      model: "admins",
      required: false,
    },
  ],
  updateSchool: [
    {
      model: "name",
      required: false,
    },
  ],
};
