require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');

const TasksRouters = require('./routes/TasksRouters');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60, // 14 days
  }),
}));

// Routes
app.get('/', (req, res) => {
  res.send("Server is working");
});

app.use('/api/tasks', TasksRouters);

// 404 handler
app.use((req, res, next) => {
  res.status(404).send('404 - Not Found');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500 - Internal Server Error');
});

// Server start
app.listen(PORT, () => {
  console.log(`\n  Server ready \n`);
  console.log(`Server is running on port ${PORT}`);
  console.log(`  ➜  Local:   http://localhost:${PORT}/`);
  console.log('  ➜  Network: use --host to expose');
});
