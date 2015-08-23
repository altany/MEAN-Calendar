var express = require('express');
var router = express.Router();

/*
 * GET /tasks/all
 */
router.get('/all', function(req, res) {
    var db = req.db;
    db.collection('taskCollection').find().toArray( function (err, items) {
        res.json(items);
    });
});

/*
 * GET /tasks/date/:date
 */
router.get('/date/:date', function(req, res) {
    var db = req.db;
	db.collection('taskCollection').find({ date: req.params.date }).toArray( function (err, items) {
        res.json(items);
    });
});
// db.collection.find( { field: { $gt: value1, $lt: value2 } } );


/*
 * GET /tasks/id/:id
 */
router.get('/id/:id', function(req, res) {
    var db = req.db;
	db.collection('taskCollection').findById(req.params.id, function (err, items) {
        res.json(items);
    });
});

/*
 * POST to /tasks/new.
 */
router.post('/new', function(req, res) {
	if(!req.body) { return res.send(400); } // 6
    var db = req.db;
	req.body.done = false;
    db.collection('taskCollection').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to tasks/:id.
 */
router.delete('/:id', function(req, res) {
    var db = req.db;
    var taskToDelete = req.params.id;
    db.collection('taskCollection').removeById(taskToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

/*
 * PUT to /tasks/:id.
 */
router.put('/', function(req, res) {
	
    var db = req.db;
	if(!req.body) { return res.send(400); } 
	 db.collection('taskCollection').findById(req.body._id, function(err, result){
		 
		if(err) { return res.send(500, err); }
		if(!result) { return res.send(404); }
		
		var data = {};
		if (req.body.title) {
			data.title = req.body.title;
		}
		 if (req.body.deadline) {
			data.deadline = req.body.deadline;
		}
		if (req.body.location) {
			data.location = req.body.location;
		}
		
		data.done = req.body.done;

		db.collection('taskCollection').updateById(req.body._id, 
		{$set: data},
		function(errUpd) { 
			if(errUpd) {
                return res.send(500, errUpd);
            }
            res.send(result);
		});
    });
	
});


module.exports = router;
