const express = require("express");
const mongoose = require("mongoose");

function connecttoMongo() {
  const url = `mongodb://sahil:sahil123@thefacebook-shard-00-00.v1au4.mongodb.net:27017,thefacebook-shard-00-01.v1au4.mongodb.net:27017,thefacebook-shard-00-02.v1au4.mongodb.net:27017/?ssl=true&replicaSet=atlas-j2t6be-shard-0&authSource=admin&retryWrites=true&w=majority&appName=thefacebook`;

  //function to connect to mongodb database
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connection to database established");
    })
    .catch((error) => {
      console.log(error);
    });
}
module.exports = {
  connectToDb: connecttoMongo,
};
