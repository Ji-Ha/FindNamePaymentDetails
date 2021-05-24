var express = require('express');
var router = express.Router();
var Problem = require('../models/Problem');

router.get('/', function (req, res) {
    Problem.find({}, function (err, problems) {
        if (err) return res.json(err);
        res.render('problems/index', { problems: problems });
    });
});

router.get('/new', function (req, res) {
    res.render('problems/new');
});

router.post('/', function (req, res) {
    Problem.create(req.body, function (err, problem) {
        if (err) return res.json(err);
        res.redirect('/problems');
    });
});

router.get('/:id', function (req, res) {
    Problem.findOne({ _id: req.params.id }, function (err, problem) {
        if (err) return res.json(err);
        res.render('problems/show', { problem: problem });
    });
});

router.get('/:id/edit', function (req, res) {
    Problem.findOne({ _id: req.params.id }, req.body, function (err, problem) {
        if (err) return res.json(err);
        res.render('problems/edit', { problem: problem });
    });
});

router.put('/:id', function (req, res) {
    Problem.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, problem) {
        if (err) return res.json(err);
        res.redirect('/problems/' + req.params.id);
    });
});

router.delete('/:id', function (req, res) {
    Problem.deleteOne({ _id: req.params.id }, function (err) {
        if (err) return res.json(err);
        res.redirect('/problems');
    });
});

module.exports = router;