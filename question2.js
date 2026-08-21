const express = require('express');
const app = express();

const requestLogger = (req, res, next) => {
    const start = new Date();
    const timestamp = new Date().toISOString();

    res.on('finish', ()=> {
        const responseTime = new Date() - start;
        console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - ${responseTime}ms`)
    })
    next();
}

app.use(requestLogger);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome here "
    })
})
app.get('/users', (req, res) => {
    res.status(200).json({
        users: [
      { id: 1, name: "Volonte" },
      { id: 2, name: "Rwicha" }
    ]
    })
})

app.listen(3000)