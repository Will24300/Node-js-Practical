const express = require('express');
const app = express();

app.use(express.json())
app.listen(3000)

let todos = [];
let nextId = 1;

app.post('/todos', (req, res) => {

    const {title} = req.body;
    if (!title || typeof title !== 'string' || title.trim() === ''){
        return res.status(400).json({
            error: "Invalid request body. 'title' is required and must be a non-empty string."
        })
    }

    const newTodo = {
        id: nextId++,
        title,
        completed: false
    }
    todos.push(newTodo)

    return res.status(201).json(newTodo);
})

app.get('/todos', (req, res) => {
    return res.status(201).json(todos)
})

app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)){
        return res.status(400).json({
            error: "It is not the format required"
        })
    }
    const copyTodo = todos.find((todo) => todo.id === id);
    if (!copyTodo) {
    return res.status(404).json({ error: `Todo with id ${id} not found.` });
  }
    copyTodo.completed = !copyTodo.completed;

    return res.json(copyTodo);
    
})

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)){
        return res.status(400).json({
            error: "Id must be a number"
        })
    }
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
        res.status(400).json({
            error: `A todo with the id ${id} was not found`
        })
    }
    todos.filter((t)=> t.id !== todo.id );

    return res.json({
        message: "todo successfully removed"
    })
})
