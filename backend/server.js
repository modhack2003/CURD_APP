require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const TasksRouters = require('./routes/TasksRouters');
const loginRouter = require('./routes/api/login');
const registerRouter = require('./routes/api/register');
require('./config/passport')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, {
  writeConcern: {
    w: 'majority',
  },
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB', err);
  process.exit(1);
});

// Define routes

app.use('/api/users/login', loginRouter); 
app.use('/api/users/register', registerRouter);
app.use('/api/tasks', TasksRouters);
// Catch-all error handler
app.use((req, res, next) => {
  res.status(404).send('404 - Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500 - Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
