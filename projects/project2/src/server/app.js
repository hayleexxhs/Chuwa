var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { v4: uuidv4 } = require("uuid");

//connect to database
const connectToMongoose = require("./database/connect");
const User = require("./database/model");
const Product = require("./database/model");
connectToMongoose();

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

const validateUserInfo = (req) => {
  return req.body && req.body.email && req.body.password;
};

const validateProductInfo = (req) => {
  return (
    req.body &&
    req.body.name &&
    req.body.description &&
    req.body.category &&
    req.body.price &&
    req.body.quantityInStock &&
    req.body.imgSrc
  );
};

//Sign In
app.post("/api/signin", async (req, res) => {
  // res.json(userInfo);
  console.log("Backend --Sign In");
  console.log(req.body);
  if (validateUserInfo(req)) {
    const findUserByEmail = await User.find({
      email: req.body.email,
    });
    console.log(findUserByEmail);
    if (findUserByEmail.length) {
      if (findUserByEmail[0].password === req.body.password) {
        res.json({
          message: "succeed",
          status: "200",
        });
        return;
      }
      {
        console.log("Password incorrect");
        res.status(404).json({
          error: "failed",
          message: "Password incorrect",
        });
        return;
      }
    }
    console.log("User does not exist");
    res.status(404).json({
      error: "failed",
      message: "User does not exist",
    });
    return;
  }
  console.log("Input is not valid");
  res.status(404).json({
    error: "failed",
    message: "Input is not valid",
  });
  return;
});

//Sign Up
app.post("/api/signup", async (req, res) => {
  console.log("Backend --Sign Up");
  console.log(req.body);

  //backend validation
  if (validateUserInfo(req)) {
    const findUserByEmail = await User.find({
      email: req.body.email,
    });
    if (findUserByEmail.length) {
      res.status(404).json({
        error: "failed",
        message: "Already Signed",
      });
      return;
    }

    const newUser = new User({
      id: uuidv4(),
      email: req.body.email,
      password: req.body.password,
    });

    const addNewUser = await newUser.save();
    if (newUser === addNewUser) {
      res.json({
        message: "succeed",
        status: "200",
        newUser: {
          id: addNewUser.id,
          email: addNewUser.email,
          password: addNewUser.password,
        },
      });
      return;
    }
    res.status("400").json({
      message: "Sign up failed",
    });
  }
  //error handling
  console.log("Input is not valid");
  res.status(404).json({
    error: "failed",
    message: "Input is not valid",
  });
  return;
});

//Sign Out
app.post("/api/signout", (req, res) => {
  // res.json(userInfo);
  console.log("Backend --Sign Out");
  res.json({
    message: "succeed",
    status: "200",
  });
});

//Show Product
app.get("/api/showproduct", async (_, res) => {
  const findProducts = await Product.find({});
  const productsList = findProducts.map(({ imgSrc, name, price }) => {
    return {
      imgSrc: imgSrc,
      productName: name,
      price: price,
      quantity: 0,
    };
  });
  res.json(productsList);
  return;
});

//Add Product
app.post("/api/addproduct", async (req, res) => {
  console.log("Backend --Add Product");
  console.log(req.body);

  //backend validation
  if (validateProductInfo(req)) {
    const findProductByName = await User.find({
      name: req.body.name,
    });
    if (findProductByName.length) {
      res.status(404).json({
        error: "failed",
        message: "Already Exist",
      });
      return;
    }

    const newProduct = new Product({
      id: uuidv4(),
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantityInStock: req.body.quantityInStock,
      imgSrc: req.body.imgSrc,
    });

    const addNewProduct = await newProduct.save();
    if (newProduct === addNewProduct) {
      res.json({
        message: "succeed",
        status: "200",
        newProduct: {
          id: addNewProduct.id,
          name: addNewProduct.name,
          description: addNewProduct.description,
          category: addNewProduct.category,
          price: addNewProduct.price,
          quantityInStock: addNewProduct.quantityInStock,
          imgSrc: addNewProduct.imgSrc,
        },
      });
      return;
    }
    res.status("400").json({
      message: "Add product failed",
    });
  }
  //error handling
  console.log("Input is not valid");
  res.status(404).json({
    error: "failed",
    message: "Input is not valid",
  });
  return;
});

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
