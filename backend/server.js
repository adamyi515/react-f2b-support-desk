const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const { errorMiddleware } = require('./middlewares/errorMiddleware');


// DB CONNECTION
connectDB();


// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Support Desk API.'
    });
});

// Setting up routes.
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorMiddleware);



app.listen(PORT, () => console.log('SERVER started on: ' + PORT));