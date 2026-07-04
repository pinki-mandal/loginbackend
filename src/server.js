require("dotenv").config();
const rateLimit = require("express-rate-limit");
const app = require("./app");
const connectDB = require("./database/db");

const PORT = process.env.PORT || 5000;


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
  message: "Too many requests, please try again later",
});
(async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
})();