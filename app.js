let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// ROUTERS
const indexRouter = require('./routes/index'),
  usersRouter = require('./routes/users'),
  userRoute = require('./routes/api/v1/user');

const app = express();

// PRIMUS
const Primus = require('primus')
  , http = require('http')
  , server = http.createServer(app),
  primus = new Primus(server, {});

const mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override");

const Account = require("./modules/account"),
      Message = require("./modules/message");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ========= Mongoose Configuration 
mongoose.connect('mongodb+srv://bthChatUser:nMdzASvd0lhkcs6T@cluster0.boljx.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error.message));

// ============== PASSPORT
//Passport
app.use(require("express-session")({
  secret: "Some secret words",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//recall user every time
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//  Primus
primus.on('connection', spark => {
  //  here goes text?
  console.log("Connection...");
  let user = spark.id;
  //detect new user
  //current user
  spark.write("Welcome to chat " + spark.id);
  //for rest of the users
  primus.forEach( (spark, id, connections) => {
    if (spark.id == user) return;
    spark.write('New user!');
  });
  //send data
  spark.on("data", function (data) {
    primus.write(data);
    saveInDB(data);
  });


});

let saveInDB = (data) => {

  let msg = {username: data.username, message: data.message}
  Message.create(msg, (err, message) => {
      if (err) {
        console.log(err);
      }
    });
};



// ======== Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', userRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(process.env.PORT || 3000, () => console.log("Port is listening"));

module.exports = app;