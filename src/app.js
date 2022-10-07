require('dotenv/config')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//Basics Middlewares
app.use(express.json());

//CORS Middleware
app.use(cors());

const appointmentsRoute = require('./routes/activities');
const usersRoute = require('./routes/users');

//USING ROUTES
app.use('/api/activities', appointmentsRoute); // http://localhost:3000/api/appointments -> Access to appointments.js
app.use('/api/users', usersRoute); // http://localhost:3000/api/users -> Access to users.js

// Connect to MongoDB using Mongoose
// get the connection string from the .env file
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('connected to DB!')
});

//PORT
app.listen(5000, () => console.log('Server started on port 5000 🔥'));