const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    title: String,
    content: String,
  },
  { timestamps: true }
);

module.exports = Article = mongoose.model("article", articleSchema, "articles");
