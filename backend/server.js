const express = require("express");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const { connectDB } = require("./config/db");
const { default: mongoose } = require("mongoose");
const Article = require("./models/articleSchema");

const app = express();

connectDB();

const db = mongoose.connection;

app.set("port", port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/");

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});

app.get("/articles", async (req, res) => {
  const count = await Article.countDocuments();
  console.log(count);
  Article.find()
    .exec()
    .then((resOne) => {
      res.status(200).json({ articles: resOne });
    })
    .catch((error) => {
      return res.status(400).json({ error: "something error" });
    });
});

app.post("/newArticle", (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(200).json({ message: "no data" });
    return;
  }
  const { title, content } = req.body;
  const newArticle = new Article({ title: title, content: content });
  newArticle.save(function (err, article) {
    if (err) return console.error(err);
    console.log(article.title + " saved to articles collection.");
  });
});

app.put("/articles/:id", (req, res) => {
  const { title, content } = req.body;
  const options = req.body;

  Article.findByIdAndUpdate(req.params.id, options, function (err, doc) {
    console.log("XX: ", err, doc);
    if (err) {
      return res.send(400).json({ message: "something wrong" });
    } else {
      return res.send(200).json({ message: "updated successfully" });
    }
  });
});
