var express = require('express');

var todoController = require('./controllers/todoController');

var app = express();


//setting up the templating engine
app.set('view engine', 'ejs');


//serving static files
app.use(express.static('./public'));

//firing the controllers
todoController(app);


app.listen(9000);