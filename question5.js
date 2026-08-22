const express = require('express');
const app = express();

app.use(express.json());
app.listen(8080);

const users = [];
let nextId = 1;


app.post('/register', (req, res) => {
    const errors = [];
    const {username, email, password} = req.body;
    if (!username || !email || !password){
        return res.status(400).json({
            error: "Username , email and password must be present"
        })
    } 
    if (username.length < 3){
        errors.push("Username must include at least 3 characters")
    }
    if (!email.includes('@')){
        errors.push("Email must include @")
    }
    if (password.length < 6){
        errors.push("Password must have at least 6 characters")
    }

    if (errors.length > 0) { 
        return res.status(400).json({
            errors: errors
        })
    } else {
        const newUser = {
            username,
            email
        }
        users.push(newUser);
        return res.status(201).json(newUser)

    }
})

app.get('/register', (req, res)=> {
    return res.json(users)
})