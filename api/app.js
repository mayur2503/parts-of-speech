const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express(); //Create new instance
const PORT = process.env.PORT || 5000; //Declare the port number
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json()); //allows us to access request body as req.body
app.use(morgan("dev")); //enable incoming request logging in dev mode
global.__basedir = __dirname;
const uploadController = require("./src/controllers/uploadController");

//Define the endpoint
app.get("/ping", (req, res) => {
  return res.send({
    status: "Healthy",
  });
});
app.post("/upload", uploadController.upload);
app.listen(PORT, () => {
  console.log("Server started listening on port : ", PORT);
});
