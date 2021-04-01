let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let database = require('./database/db');
const MongoClient = require('mongodb').MongoClient;
const mongoDB = require('./mongoconnect');
const createError = require('http-errors');
const userRoute = require('./routes/user.routes')
const jwt = require('express-jwt');


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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
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