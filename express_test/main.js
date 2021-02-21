const express = require('express')
const fs = require('fs')
const path = require('path')
const qs = require('querystring');
const bodyParser = require('body-parser'); 
const app = express()
const template = require('./lib/template.js');
const indexRouter = require('./routes/index');
const topicRouter = require('./routes/topic');
const passport = require('passport')
  , LocalStrategy = require('passport-local')
  .Strategy;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.get('*', function (request, response, next) {
  fs.readdir('./data', function (error, filelist) {
    request.list = filelist;
    next();
  });
});



app.use('/', indexRouter);
app.use('/topic', topicRouter);

app.use(function(request, response, next) {
  response.status(404).send('Sorry cant find that!');
})

app.use(function(err, request, response, next){
  console.error(err.stack)
  response.status(500).send('Something broke!');
})

app.listen(3000, () => console.log('Example app listening on port 3000'))