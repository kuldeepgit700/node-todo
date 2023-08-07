const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();


const app = express();

const router = require('./routes/todos');
const Todo = require('./models/todo');




// routes
// app.use(router);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/todos', (req, res, next) => {

    Todo.find().then(todosList => {
      res.status(200).json({ data: todosList });

    }).catch(err => {
        console.log('Error to fetch data');
        res.status(204).json({message : "Error to fetch data", data: todosList });
    });

   
});


app.post('/todos', (req, res, next) => {
    const todoText = req.body.message;

    let todos = new Todo({
        message: todoText
    });

    todos.save().then(result => {
        if (result) {
            res.status(200).json({ message: 'Data saved successfully!', data: result });
        }

    }).catch(err => {
        console.log('Error in save data', err);
        res.status(200).json({ message: 'Error in save data!', err });
    });

});


app.put('/todos/:id', (req, res, next) => {

    const todoId = req.params.id;
    const updateMessage = req.body.message;

    Todo.findByIdAndUpdate(todoId, { message: updateMessage }, { new: true, runValidators: true }).then(updatedResult => {
        if (updatedResult) {
            res.status(200).json({ message: "Todo has been updated", todosData: updatedResult });
        } else {
            res.status(204).json({ message: "Failed to update todos!", todosData: [] });
        }
    });
});



app.delete('/todos/:id', (req, res, next) => {
    const todoId = req.params.id;
    let todos = [];
    Todo.deleteOne({ _id: todoId }).then(deleteRecord => {
        if (deleteRecord.deletedCount > 0) {
            todos = deleteRecord;
           res.status(200).json({ message: "Todo has been deleted!", todosData: todos });
        } 
    }).catch(err => {
        console.log('error to delete todo', err);
        res.status(204).json({ message: "error to delete todo", todosData: todos });
    });
   
});

mongoose.connect(process.env.DB_CONNECTION_URI).then(result => {
    app.listen(process.env.APP_PORT, () => {
        console.log('app is running on port: 2020');
    });

}).catch(err => {
    console.log('Connection failed with error message :' + err);
});
