const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const logger = require('./config/logger');
const PORT = 6200;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
    'mongodb://mongo:27017/todos', 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
);
const connection = mongoose.connection;

connection.once('open', function() {
    logger.info("MongoDB database connection established successfully");
})

todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            // console.log(err);
            logger.error(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.route('/add').post(function(req, res) {
    
    let todo = new Todo(req.body);

    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            // console.log("Error:" + err);
            logger.error(err);
            res.status(400).send('adding new todo failed');
        });
});

app.use('/todos', todoRoutes);

app.listen(PORT, function() {
    logger.info("Server is running on Port: " + PORT);

    logger.error("Esto es un error");
    // error: 0,
    logger.warn("Esto es un warn");
    // warn: 1,
    logger.info("Esto es un info");
    // info: 2,
    logger.http("Esto es un http");
    // http: 3,
    logger.verbose("Esto es un verbose");
    // verbose: 4,
    logger.debug("Esto es un debug");
    // debug: 5,
    logger.silly("Esto es un silly");
    // silly: 6

});