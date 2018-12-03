var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var urlEncodedParser = bodyParser.urlencoded({ extended: false });

//Setting up MongoDB
mongoose.connect('mongodb://test:test123@ds157702.mlab.com:57702/kshitiz');
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);





module.exports = function(app) {

    app.get('/todo', function(req, res) {

        Todo.find({}, function(err, data) {
            if (err) throw err;
            else {
                res.render('todo', { todos: data })
            }
        })


    });

    app.post('/todo', urlEncodedParser, function(req, res) {

        var newData = Todo(req.body).save(function(err, data) {
            if(err) throw err;
            res.json(data);
        });
    });





    app.delete('/todo/:item', function(req, res) {

        console.log(req.url);


        Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function(err, data) {
            if (err) throw err;
           
                res.json(data);
            
        })


    });

}