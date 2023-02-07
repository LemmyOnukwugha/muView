var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//connect to the database with Mongoose
require("./config/database");

var indexRouter = require("./routes/index");
var albumsRouter = require("./routes/albums");
var reviewsRouter = require("./routes/reviews");
var methodOverride = require("method-override");
var multer = require("multer");
const upload = multer({ dest: "./public/images" });

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/albums", albumsRouter);
app.use("/", reviewsRouter);

app.post("/albums", upload.single("cover"), (req, res) => {
  res.render("albums/new");
  console.log(req.file, req.body);
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
