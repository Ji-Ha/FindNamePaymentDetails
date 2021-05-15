var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://@cluster0.0a6bc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

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

// DB schema // 4
var contactSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  email:{type:String},
  phone:{type:String}
});
var Problem = mongoose.model('contact', contactSchema); // 5

// Routes
// Home // 6
app.get('/', function(req, res){
  res.redirect('/contacts');
});
// Contacts - Index // 7
app.get('/contacts', function(req, res){
  Problem.find({}, function(err, contacts){
    if(err) return res.json(err);
    res.render('contacts/index', {contacts:contacts});
  });
});
// Contacts - New // 8
app.get('/contacts/new', function(req, res){
  res.render('contacts/new');
});
// Contacts - create // 9
app.post('/contacts', function(req, res){
  Problem.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});
var port = 3000;

app.listen(port, function(){
    console.log('server on! http://localhost:' + port);
});
