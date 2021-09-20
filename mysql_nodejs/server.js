const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
global.__basedir = __dirname;
 
const db = require('./app/config/db.config.js');

const Sul = db.Sul;

let router = require('./app/routers/router.js');

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/', router);

// Create a Server
const server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  Sul.sync().then(() => {
    const suls = [
      { date: 2015, name: 'abc', 
                amount: 5, distance: 9},
      { date: 2016, name: 'def', 
                amount: 6, distance: 2},
      { date: 2017, name: 'ghi', 
                amount: 9, distance: 7},
    ]
    
    for(let i=0; i<suls.length; i++){
      Sul.create(suls[i]);
    }
  })
}); 