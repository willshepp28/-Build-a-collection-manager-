const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// Replace "test" with your database name.
mongoose.connect('mongodb://localhost:27017/carCollection');


const index = require('./routes/index');


const app = express();

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// set static files
app.use('/assets', express.static(path.join(__dirname, 'public')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




app.use('/', index);

app.listen(3000, function(){
    console.log('Server listening on port 3000');
});