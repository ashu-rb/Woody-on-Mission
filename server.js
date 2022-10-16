require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

const ParentController = require("./controllers/parentController");
const ChildController = require("./controllers/childController");
const TaskController = require("./controllers/taskController");
const PointsController = require("./controllers/pointsController");
const UserController = require("./controllers/userController");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("client/build"));
mongoose.connect("mongodb+srv://admin:aaryan12@cluster0.mpqana6.mongodb.net/taskDB")

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

//tester
app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

app.use("/api/parent", ParentController);
app.use("/api/child", ChildController);
app.use("/api/tasks", TaskController);
app.use("/api/user", UserController);
app.use("/api/points", PointsController);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
