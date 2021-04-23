const MongoClient = require('mongodb').MongoClient;

let db = null;
let user = null;

const mongoDB_uri = "mongodb+srv://sdgroup23username:sdgroup23pw@cluster0.4pi4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(mongoDB_uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect()
  .then(client => {
    db = client.db("cluster0");
    user = db.collection("user");
  })
  module.exports = user
  client.close();

