let express = require('express');
var cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let database = require('./database/db');
const MongoClient = require('mongodb').MongoClient;
const mongoDB = require('./mongoconnect');
const createError = require('http-errors');
const userRoute = require('./routes/user.routes')
const historyRoute = require('./routes/history.routes')
const jwt = require('express-jwt');
const withAuth = require('./routes/middleware');
const passport = require('passport')
const flash = require('connect-flash');
var session = require('express-session');
const path = require('path')







/* mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true
}).then(() => {
        console.log('Database connected successfully !')
    },
    error => {
        console.log('Database could not be connected : ' + error)
    }
)
*/

// MongoDB connect //
// mongoDB Schema - https://dbdiagram.io/d/6058c1e2ecb54e10c33cabc8
/*-----------------*/
/* const mongoDB_uri = "mongodb+srv://sdgroup23username:sdgroup23pw@cluster0.4pi4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoDB_client = new MongoClient(mongoDB_uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = "cluster0"; 
mongoDB.mongoDB_run(dbName, mongoDB_client).catch(console.dir); */
/*-----------------*/

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

app.get('/current_user', (req,res) => {
    console.log('inside /current_user')
    console.log("req.user: ",req.user);
    console.log("req.session: ",req.session)
})
app.use('/users', userRoute);
//app.use('/history', historyRoute);

app.get('/checktoken', withAuth, (req,res,next) => {
    console.log('token in /checktoken');
    console.log(req.cookie.token);
    res.sendStatus(200);
})


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
