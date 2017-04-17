const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./bin/config');

const app = express();
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

require('./routes/auth')(app);
require('./routes/post')(app);
require('./routes/user')(app);
require('./routes/comment')(app);
app.get('/', (req, res) => res.status(200).send({message:'Welcome'}));
module.exports = app;