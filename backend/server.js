// Import required modules
require('dotenv').config()
const cors = require('cors')
const express = require('express');
const TasksRouters = require('./routes/TasksRouters');
const mongoose = require('mongoose')

// Set up an Express server and define a port number
const app = express();
const PORT = process.env.PORT || 4000;

// Add CORS and JSON middleware to the server
app.use(cors());
app.use(express.json());

// Connect to a MongoDB database using Mongoose
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
    process.exit(1); // Exit process with failure
  });

// Add a router for handling tasks at the /api/tasks endpoint
app.use('/api/tasks', TasksRouters);

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});