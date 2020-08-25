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

// PR
const  Primus = require('primus.io')
      , http = require('http')
      , server = http.createServer(app),
      primus = new Primus(server, { transformer: 'websockets' });

const mongoose = require("mongoose"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      bodyParser = require("body-parser"),
      methodOverride = require("method-override");

const Account = require("./modules/account");

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


// Primus
primus.on('connection', function (spark) {
  //  here goes text?
  primus.write('Some data');
});

//recall user every time
app.use((req,res,next) => {
  res.locals.currentUser = req.user;
  next();
});

// ======== Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', userRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(process.env.PORT || 3000, () => console.log("Port is listening"));

module.exports = app;