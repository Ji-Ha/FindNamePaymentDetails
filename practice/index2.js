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

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'))

// DB schema
var problemSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  email:{type:String},
  phone:{type:String}
});
var Problem = mongoose.model('problem', problemSchema);

// Routes
// Home
app.get('/', function(req, res){
  res.redirect('/problems');
});
// Contacts - Index
app.get('/problems', function(req, res){
  Problem.find({}, function(err, problems){
    if(err) return res.json(err);
    res.render('problems/index', {problems:problems});
  });
});
// Contacts - New
app.get('/problems/new', function(req, res){
  res.render('problems/new');
});
// Contacts - create
app.post('/problems', function(req, res){
  Problem.create(req.body, function(err, problem){
    if(err) return res.json(err);
    res.redirect('/problems');
  });
});

// Port setting
var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});