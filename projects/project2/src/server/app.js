var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { message } = require("antd");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

console.log("Server Start!");

//mock database
let userInfo = [
  { email: "useremail1@gmail.com", password: "user1" },
  { email: "useremail2@gmail.com", password: "user2" },
  { email: "useremail3@gmail.com", password: "user3" },
];

const backendValidation = ({ req, isAddData = false }) => {
  return isAddData
    ? req.body &&
        req.body.content &&
        req.body.email !== undefined &&
        req.body.password !== undefined
    : {};
};

//Sign In
app.post("/api/signin", (req, res) => {
  // res.json(userInfo);
  console.log("Backend --Sign In");
  res.json({
    message: "succeed",
    status: "200",
  });
});

//Sign Up
app.post("/api/signup", (req, res) => {
  console.log("Backend --Sign Up");
  //backend validation
  backendValidation(req, true);
  if(true) {
    userInfo = [...userInfo, req.body];
    res.json({
      message: 'succeed',
      status: '201',
    });
  }{
    //error handling
    res.status(404).json({
      error: 'failed',
      message: 'Input is not valid',
    });
  }
})

//Sign Out
app.post('/api/signout', (req, res)=>{
  // res.json(userInfo);
  console.log("Backend --Sign Out");
  res.json({
    message: "succeed",
    status: "200",
  });
});

//3.(PUT) => mod a todo 
//4.(DELETE) => delete a todo

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
