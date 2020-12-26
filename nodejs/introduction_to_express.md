# Express

> what is Express and why should we use it?

- Express is a minimal node.js framework, which means it is actually built on top of node.js.
- Express contains a very robust and very useful set of features.
  - Things like complex routing.
  - Easier handling of requests and responses.
  - adding middleware, server-side rendering.

> Install `express`

```bash
npm i express
```

> ## Express App

```javascript
//App.js

//import express
const express = require("express");

//create app
const app = express();

//Define urls:
app.get("/", (req, res) => {
  res.send("Hello");
});

// Start listening to requests on a port
const port = 5000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
```

> ## Basic features

> - Handling requests
>   - GET
>   - POST
>   - PATCH
>   - DELETE
> - Routes
> - Middleware
>   - Own and 3rd party middleware
>   - Chaining multiple middleware
> - Param Middleware
> - Serving static files
> - Environment variables

```javascript
//import express
const express = require("express");
const bodyParser = require("body-parser");

const testObj = [];

//create app
const app = express();

////////////////////////////////////////////////
// MIDDLE WARES
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// user defined middle ware
app.use((req, res, next) => {
  console.log("Hello from the middle ware");
  next(); // it is imp to use next else request will not go to next level and stuck here.
});

//-------------------------------------------------//

/////////////////////////////////////////////
//Define routing rules
/////////////////////////////////////////////

//GET
app.get("/", (req, res) => {
  res.status(200);
  res.send("Hello");
});

// Send json response
app.get("/data", (req, res) => {
  res.status(200);
  res.json({ msg: "Hello" });
});

// Get with params
//:param is used to extract params.
// Available in req.params
app.get("/data/:id", (req, res) => {
  console.log(reg.params);
  res.status(200);
  res.send("test");
});

//POST
app.post("/add", (req, res) => {
  testObj.push(req.body);
  console.log(testObj);
  res.status(201);
  res.send({ msg: "Success" });
});

// PATCH
app.patch("/data/:id", (req, res) => {
  console.log(reg.params);
  console.log(req.body);
  res.status(200);
  res.send("test");
});

//DELETE
app.delete("/data/:id", (req, res) => {
  console.log(reg.params);
  console.log(req.body);
  res.status(204); // no data
  res.send(null);
});

// Using function to handel request
const sendData = (req, res) => {
  console.log(reg.params);
  res.status(200);
  res.send("test");
};
app.get("/data/:id", sendData);

//-------------------------------------------------//

/////////////////////////////////////////////////
// using app.route and chaining requests
const getAllData = (req, res) => {};
const addData = (req, res) => {};
const getDataById = (req, res) => {};
const updateData = (req, res) => {};
const deleteData = (req, res) => {};
const getAllUser = (req, res) => {};
const addUser = (req, res) => {};
const getUserById = (req, res) => {};
const updateUser = (req, res) => {};
const deleteUser = (req, res) => {};

app.route("/data/").get(getAllData).post(addData);

app.route("/data/:id").get(getDataById).patch(updateData).delete(deleteData);

//-------------------------------------------------//

////////////////////////////////////////////////////
// Multiple routers

const dataRouter = express.Router();
const userRouter = express.Router();

dataRouter.route("/").get(getAllData).post(addData);
dataRouter.route("/:id").get(getDataById).patch(updateData).delete(deleteData);

userRouter.route("/").get(getAllUser).post(addUser);
userRouter.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

app.use("/data", dataRouter); // used after declaring the routes
app.use("/user", userRouter); // used after declaring the routes

//----------------------------------------------------//

///////////////////////////////////////////////////////
// Param middle ware.
// runs only when a parameter is passed on which it is configured to run
//It get 4 arguments
//val holds the passed value

dataRouter.param("id", (req, res, next, val) => {
  console.log(`The passed id is ${val}`);
  next();
});

//----------------------------------------------------//

////////////////////////////////////////////////////////
// serving static files
app.use(express.static(`${__dirname}/public`));

//----------------------------------------------------//

///////////////////////////////////////////////////////
// Environment variable
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

console.log(process.env);

//-----------------------------------------------//

// Start listening to requests on a port
const port = 5000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
```

> ## Error Handling

> - Debugging with ndb
> - Handling unhandled routes
> - Global error handling middleware
> - Defining own error handling class
> - Catching errors in async function
> - 404 not found
> - Error outside express, unhandled promises rejections
> - catching uncaught exception

> Handling unhandled routes

```javascript
// added after all defined routers

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});
```

> Global error handling middleware

- By default express considers a function defined with 4 parameters in app.use as error handling middleware
- The error handling middle ware is error first function. It means first argument is error.

```javascript
// middle ware

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // if status code is defined in error due to which this middle ware is being hit then we are using the same else setting it to 500.
  err.status = err.status || "error"; // same here if err.status not defined setting it to 'error'

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message, // this will come from the actual error due to which this middleware is hit.
  });
});
```

```javascript
//create error

app.all("*", (req, res, next) => {
  const err = Error(`Can't find ${req.originalUrl} on this server`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});
```

`Note: If anything passes in next(err) function then express considers it as an error and directly goes to global error handling middleware and skips all other middleware in the series.`

> Error handling class

```javascript
// AppError.js

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperationalError = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.export(AppError);
```

```javascript
// usage of AppError class

cost AppError = require('./AppError');


app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`,404));
});

```

> Error outside express, unhandled promises rejections

```javascript
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection, shutting down the server");
  server.close(() => {
    process.exit(1);
  });
});
```

> Catching uncaught exception

```javascript
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception, shutting down the server");
  server.close(() => {
    process.exit(1);
  });
});
```

`NOTE: These unhandledRejection and uncaughtException should be at top of file, ie. before any other code executes. Else it would not be able to catch any exception which occurs before listening to the events.`
