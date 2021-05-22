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

// DB schema // 4
var problemSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  content:{type:String},
  answer:{type:String}
});
var Problem = mongoose.model('problem', problemSchema); // 5

// Routes
// Home // 6
app.get('/', function(req, res){
  res.redirect('/problems');
});

app.get('/problems', function(req, res){
  Problem.find({}, function(err, problems){
    if(err) return res.json(err);
    res.render('problems/index', {problems:problems});
  });
});

app.get('/problems/new', function(req, res){
  res.render('problems/new');
});

app.post('/problems', function(req, res){
  Problem.create(req.body, function(err, problem){
    if(err) return res.json(err);
    res.redirect('/problems');
  });
});

app.get('/problems/:id', function(req, res){
  Problem.findOne({_id:req.params.id}, function(err, problem){
    if(err) return res.json(err);
    res.render('problems/show', {problem:problem});
  });
});

app.get('/problems/:id/edit', function(req, res){
  Problem.findOne({_id:req.params.id}, req.body, function(err, problem){
    if(err) return res.json(err);
    res.render('problems/edit', {problem:problem});
  });
});

app.put('/problems/:id', function(req, res){
  Problem.findOneAndUpdate({_id : req.params.id}, req.body, function(err, problem){
    if(err) return res.json(err);
    res.redirect('/problems/' + req.params.id);
  });
});

app.delete('/problems/:id', function(req, res){
  Problem.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect('/problems');
  });
});

var port = 3000;

app.listen(port, function(){
    console.log('server on! http://localhost:' + port);
});
