const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();

module.exports = class UserServer {
  constructor({ config, managers }) {
    this.config = config;
    this.userApi = managers.userApi;
  }

  /** for injecting middlewares */
  use(args) {
    app.use(args);
  }

  /** server configs */
  run() {
    /** load routes */
    const schoolRoutes = require("./routes/school.route");
    const classroomRoutes = require("./routes/classroom.route");
    const studentRoutes = require("./routes/student.route");

    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/static", express.static("public"));

    /** an error handler */
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });

    /** load routes */
    app.use("/api/schools", schoolRoutes);
    app.use("/api/classrooms", classroomRoutes);
    app.use("/api/students", studentRoutes);

    /** a single middleware to handle all */
    app.all("/api/:moduleName/:fnName", this.userApi.mw);

    let server = http.createServer(app);
    server.listen(this.config.dotEnv.USER_PORT, () => {
      console.log(
        `${this.config.dotEnv.SERVICE_NAME.toUpperCase()} is running on port: ${
          this.config.dotEnv.USER_PORT
        }`
      );
    });
  }
};
