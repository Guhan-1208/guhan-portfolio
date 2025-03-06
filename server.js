const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/login', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post('/login', async (req, res) => {
  const { username, email, password } = req.body;

  // Store the login information in MongoDB
  const newUser = new User({ username, email, password });
  await newUser.save();

  res.send('User information saved!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
