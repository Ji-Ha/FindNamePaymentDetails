var express = require('express');
var 
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/hello', function(req, res){
    res.render('hello', {name:req.query.nameQuery});
});

app.get('/hello/:nameParam', function(req, res){
    res.render('hello', {name:req.params.nameParam});
});

app.get('/problem', function(req, res){
    res.send('문제가 보이나요 ? ');
});

var port = 3000;

app.listen(port, function(){
    console.log('server on! http://localhost:' + port);
});