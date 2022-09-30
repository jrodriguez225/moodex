const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
const corsOptions = {origin: "http://localhost:4200"}
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use("/api/employees", require("./routes/employee.routes"));

module.exports = app;