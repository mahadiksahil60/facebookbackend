const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const { connectToDb } = require("./db");

//Defining routes
app.get("/", (req, res) => {
  res.send(`<h1>Hello from the backend</h1>`);
});

app.get("/profile", (req, res) => {
  res.send(`<h1>This is the profile section</h1>>`);
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

connectToDb();

const PORT = 4000;

app.listen(PORT, () => {
  console.log("The backend is up and running");
});
