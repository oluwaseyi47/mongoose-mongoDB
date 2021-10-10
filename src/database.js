const express = require('express')
const mongoose = require("mongoose");
let dotenv = require('dotenv').config({ path:'../env'})

const connectMongoDb = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
}


let db = mongoose.connection;
//Check Database connection
db.once("open", () => {
  console.log("db is connected");
});

//Check Database Errors
db.on("error", (err) => {
    console.log(err);
  });
  