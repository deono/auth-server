const express = require("express");
require("dotenv").config();
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
const router = require("./router");
const mongoose = require("mongoose");

// DB setup
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// app setup
// middleware
app.use(morgan("combined")); // logging framework
app.use(bodyParser.json({ type: "*/*" }));
router(app);

// server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("server listening on ", port);
