const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./modules/auth/auth.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);


app.post("/test", (req, res) => {
  res.json({
    success: true,
    message: "Test route working",
  });
});

app.get("/", (req, res) => {
  res.json({
    project: "MERN Authentication Assignment",
    status: "Running"
  });
});
module.exports = app;
console.log("🔥 THIS IS MY APP.JS");