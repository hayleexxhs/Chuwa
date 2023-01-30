const mongoose = require("mongoose");
// process.env.NODE_ENV;

// //直接定义在云端
// const connectionString = `mongodb+srv://ChuwaProject:${process.env.DB_PWD}@cluster0.b9iu9fg.mongodb.net/?retryWrites=true&w=majority`;

const connectionString =
  "mongodb+srv://ChuwaProject:ChuwaProject@cluster0.b9iu9fg.mongodb.net/chuwaproject?retryWrites=true&w=majority";

const connectToMongoose = () => {
  mongoose.connect(connectionString);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console), "connection error");
  db.on("open", () => {
    console.log("connect to mongodb!");
  });
};

module.exports = connectToMongoose;
