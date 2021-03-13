import express from 'express';

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/components/Login');
  });

  
const port = 9000 // Port we will listen on

app.listen(port, () => console.log(`This app is listening on port ${port}`));


