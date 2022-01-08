const express = require("express");
const session = require("express-session");
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const port = 3000;
const app = express();
connectDB();

app.use(
  session({
    secret: "some secret key",
    resave: true, // saves the session after ever request
    loggedin: false,
    saveUninitialized: false // stores the session if it hasn't been stored
  })
);
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/',require('./routes/homepage'));
app.use('/login',require('./routes/login'));
app.use('/register',require('./routes/register'));
app.use('/landing',require('./routes/landing'))
app.use('/url',require('./routes/url'))
app.use('/links',require('./routes/links'))
app.use('/copy',require('./routes/copy'));
app.use(express.static(__dirname + '/views'));

app.listen(port);
console.log(`Listening on port ${port}`);