let express = require('express');
var cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser');
let cors = require('cors');
let bodyParser = require('body-parser');
const createError = require('http-errors');
const userRoute = require('./routes/user.routes')
const passport = require('passport')
const flash = require('connect-flash');
var session = require('express-session');
const path = require('path')


const app = express();
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    resave: false,
    saveUninitialized: false,
    keys:'asdfa',
    secret: 'group23secret',
    cookie: { path: '/',httpOnly: false, maxAge: 30*25*60*1000, secure: false }
}))

app.use(passport.initialize());
app.use(passport.session());


app.use(flash());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
/*
app.get('/current_user', (req,res) => {
    console.log('inside /current_user')
    console.log("req.user: ",req.user);
    console.log("req.session: ",req.session)
})
 */
app.use('/users', userRoute);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Error Handling
app.use((req, res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../build/index.html'))
  })

module.exports = server
