
import express from "express";
import mongoose, { mongo } from "mongoose";

const app = express();
const PORT = 5200;

//----------------------------------------------------------

//database connection(express + mongodb)
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "Users",
  })
  .then(() => console.log("Database Connected"))
  .catch(() => console.log("Not connected"));

//Creating db Schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String
});

//create model (Calling/Create a collection)
const Messag = mongoose.model("details", messageSchema);

//----------------------------------------------------------

// using middlewares
app.use(express.urlencoded({ extended: true }));

//setting up view engine
app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log("Server is Working");
});

app.get("/", (req, res) => {
  res.render("index"); // if you don't write extesion every time then set ejs view engine[Line no 35]
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.post("/contact", async (req, res) => {
  await Messag.create({ name : req.body.name, email : req.body.email });
  res.redirect("/success");
  
  //instead of above two lines you can write code like this (destructuring concept)

  // const {name, email} = req.body;
  // await Messag.create({ name : name, email : email});
  // res.redirect("/success");
});
