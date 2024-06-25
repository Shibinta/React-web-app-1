const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to local MongoDB
mongoose.connect('mongodb://localhost:27017/dbs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// User model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  source: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Todo model
const TodoSchema = new mongoose.Schema({
  task: { type: String, required: true }
});

const Todo = mongoose.model('Todo', TodoSchema);

// Signup route (without password hashing)
app.post('/api/signup', async (req, res) => {
  const { username, password, phone, source } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user with plain text password
    const newUser = new User({ username, password, phone, source });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route (without password hashing)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add To-Do route
app.post('/api/todo', async (req, res) => {
  const { task } = req.body;

  try {
    const newTask = new Todo({ task });
    await newTask.save();

    res.status(201).json({ message: 'Task added successfully' });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get All To-Dos route
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update To-Do route
app.put('/api/todo/:id', async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { task },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTodo);
    } catch (error) {
        console.error('Failed to update task:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete To-Do route
app.delete('/api/todo/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Failed to delete task:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
