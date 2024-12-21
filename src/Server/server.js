import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = 'mongodb://localhost:27017/your-database-name'; // Update "your-database-name" accordingly
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Task Schema
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, default: 'active' },
  priority: { type: String, default: 'low' },
  dueDate: { type: Date, required: true },
});

const Task = mongoose.model('Task', taskSchema);

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: 'User registered' });
  } catch (error) {
    res.status(400).send({ error: 'Registration failed', details: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, 'secret-key', { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Login failed', details: error.message });
  }
});

// Middleware to protect routes
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, 'secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid token' });
  }
};

// Task CRUD
app.get('/api/tasks', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch tasks', details: error.message });
  }
});

app.post('/api/tasks', authenticate, async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send({ error: 'Failed to create task', details: error.message });
  }
});

app.put('/api/tasks/:id', authenticate, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).send({ error: 'Task not found' });
    res.send(task);
  } catch (error) {
    res.status(400).send({ error: 'Failed to update task', details: error.message });
  }
});

app.delete('/api/tasks/:id', authenticate, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send({ error: 'Task not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete task', details: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
