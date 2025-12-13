const app = require("./app");
const { connectDB } = require("./config/database");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("DB connection error", err);
  });
