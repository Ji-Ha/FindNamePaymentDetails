var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://xodhkd36:9872@cluster0.0a6bc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

var db = mongoose.connection;
db.once('open', function(){
  console.log('DB connected');
});
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({extended:true})); // 3
app.use(methodOverride('_method'))

app.use('/', require('./routes/home'));
app.use('/problems', require('./routes/problems'));

var port = 3000;
app.listen(port, function(){
    console.log('server on! http://localhost:' + port);
});
