const mongoose = require("mongoose");
require("dotenv").config({ path: "MONGODB_URL" });
const connectDB = () => {
  try {
    const db = mongoose.connect(
      "mongodb+srv://tloob:4231@goalsappcluster.5clop.mongodb.net/bulletinBoard-articles"
    );
    console.log("CONNECTED TO DB SUCCESSFULY");
  } catch {
    console.log("ERROR CONNECTION TO DATABASE");
  }
};

module.exports = { connectDB };
