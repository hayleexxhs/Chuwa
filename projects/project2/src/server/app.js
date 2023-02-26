var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

//connect to database
const connectToMongoose = require("./database/connect");
const User = require("./database/usermodel");
const Product = require("./database/productmodel");
const { resolveSoa } = require("dns");
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

//Update User
app.post("/api/updateuser", async (req, res) => {
  // res.json(userInfo);
  console.log("Backend --Update User");
  console.log(req.body);
  const id = req.body.id;
  const _user = await User.findOne({ id });
  res.json({
    message: "succeed",
    status: "200",
    user: _user,
  });
  return;
});

//Sign In
app.post("/api/signin", async (req, res) => {
  // res.json(userInfo);
  console.log("Backend --Sign In");
  console.log(req.body);
  if (validateUserInfo(req)) {
    const findUserByEmail = await User.find({
      email: req.body.email,
    });
    // console.log(findUserByEmail);
    if (findUserByEmail.length) {
      if (findUserByEmail[0].password === req.body.password) {
        //generate token
        const id = findUserByEmail[0].id;
        const token = jwt.sign({ id: id }, "secret", { expiresIn: "1h" });
        // console.log(`token: ${token}`);
        const cart = findUserByEmail[0].cart;
        const arrs = [...req.body.cart, ...cart];
        let map = new Map();
        for (let item of arrs) {
          if (map.has(item.id)) {
            const newQuantity = map.get(item.id).quantity + item.quantity;
            const newitem = {
              id: item.id,
              quantity: newQuantity,
            };
            map.set(item.id, newitem);
          } else map.set(item.id, item);
        }
        let newCart = [...map.values()];
        const queryResult = await User.findOne({ id });
        const { modifiedCount } = await queryResult.updateOne({
          quantity: queryResult.quantity + req.body.quantity,
          totPrice: Number(queryResult.totPrice) + Number(req.body.totPrice),
          cart: newCart,
        });
        const _user = await User.findOne({ id });
        console.log(token);
        console.log(_user);
        res.json({
          message: "succeed",
          status: "200",
          user: _user,
          token: token,
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
    console.log(findUserByEmail);
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
      userType: "regular",
      quantity: req.body.quantity,
      totPrice: req.body.totPrice,
      cart: req.body.cart,
    });

    const addNewUser = await newUser.save();
    if (newUser === addNewUser) {
      res.json({
        message: "succeed",
        status: "200",
        user: {
          id: addNewUser.id,
          email: addNewUser.email,
          password: addNewUser.password,
          userType: addNewUser.userType,
          cart: addNewUser.cart,
          quantity: addNewUser.quantity,
          totPrice: addNewUser.totPrice,
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
app.post("/api/signout", async (req, res) => {
  console.log("Backend --Sign Out");
  res.json({
    message: "succeed",
    status: "200",
  });
  return;
});

//Add One Product
app.post("/api/addone", async (req, res) => {
  console.log("Backend --Add One");
  const id = req.body.uid;
  const pid = req.body.id;
  let newCart = [];
  console.log(req.body.uid);
  const user = await User.findOne({ id });
  console.log(user);
  if (user.cart.find((pd) => pd.id === pid)) {
    newCart = user.cart.map((pd) => {
      if (pd.id !== pid) return pd;
      return { ...pd, quantity: pd.quantity + 1 };
    });
  } else {
    newCart = [...user.cart, { id: pid, quantity: 1 }];
  }
  const { modifiedCount } = await user.updateOne({
    quantity: user.quantity + 1,
    totPrice: Number(user.totPrice) + Number(req.body.price),
    cart: newCart,
  });
  res.json({
    message: "succeed",
    status: "200",
  });
  return;
});

//Subtract One Product
app.post("/api/subtractone", async (req, res) => {
  console.log("Backend --Subtract One");
  const id = req.body.uid;
  const pid = req.body.id;
  const user = await User.findOne({ id });
  console.log(user);
  const newCart = user.cart
    .map((pd) => {
      if (pd.id !== pid) return pd;
      return { ...pd, quantity: pd.quantity - 1 };
    })
    .filter((pd) => pd.quantity > 0);
  const { modifiedCount } = await user.updateOne({
    quantity: user.quantity - 1,
    totPrice: Number(user.totPrice) - Number(req.body.price),
    cart: newCart,
  });
  res.json({
    message: "succeed",
    status: "200",
  });
  return;
});

//Remove One Product
app.post("/api/removeone", async (req, res) => {
  console.log("Backend --Remove One");
  const id = req.body.uid;
  const pid = req.body.id;
  const user = await User.findOne({ id });
  console.log(user);
  const newCart = user.cart.filter((pd) => pd.id !== pid);
  const { modifiedCount } = await user.updateOne({
    quantity: user.quantity - req.body.quantity,
    totPrice:
      Number(user.totPrice) - req.body.quantity * Number(req.body.price),
    cart: newCart,
  });
  res.json({
    message: "succeed",
    status: "200",
  });
  return;
});

//Show Product
app.get("/api/showproduct", async (_, res) => {
  const findProducts = await (await Product.find({})).reverse();
  const productsList = findProducts.map(
    ({ id, name, description, category, price, quantityInStock, imgSrc }) => {
      return {
        id: id,
        name: name,
        description: description,
        category: category,
        price: price,
        quantityInStock: quantityInStock,
        imgSrc: imgSrc,
        quantity: 0,
      };
    }
  );
  res.json(productsList);
  return;
});

//Add Product
app.post("/api/addproduct", async (req, res) => {
  console.log("Backend --Add Product");
  console.log(req.body);

  //backend validation
  if (validateProductInfo(req)) {
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
          quantity: 0,
        },
      });
      return;
    }
    res.status("400").json({
      message: "Add product failed",
    });
    return;
  }
  //error handling
  console.log("Input is not valid");
  res.status(404).json({
    error: "failed",
    message: "Input is not valid",
  });
  return;
});

//Edit Product
app.put("/api/editproduct", async (req, res) => {
  console.log("Backend --Edit Product");
  console.log(req.body);

  //backend validation
  if (validateProductInfo(req)) {
    const id = req.body.id;
    const queryResult = await Product.findOne({ id });
    const { modifiedCount } = await queryResult.updateOne({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantityInStock: req.body.quantityInStock,
      imgSrc: req.body.imgSrc,
    });

    if (modifiedCount) {
      res.status("200").json({
        message: "succeed",
        // newProduct: {
        //   id: addNewProduct.id,
        //   name: addNewProduct.name,
        //   description: addNewProduct.description,
        //   category: addNewProduct.category,
        //   price: addNewProduct.price,
        //   quantityInStock: addNewProduct.quantityInStock,
        //   imgSrc: addNewProduct.imgSrc,
        // },
      });
      return;
    }
    res.status("400").json({
      message: "Edit product failed",
    });
    return;
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
