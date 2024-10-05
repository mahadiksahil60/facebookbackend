const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const { connectToDb } = require("./db");
const cors = require('cors');

//Configuring Cors
app.use(cors());

//Defining routes
app.get("/", (req, res) => {
  res.send(`<h1>Welcome to The Facebook</h1>`);
});


app.use("/users", userRoutes);
app.use("/auth", authRoutes);

connectToDb();

const PORT = 4000;

app.listen(PORT, () => {
  console.log("The backend is up and running");
});


