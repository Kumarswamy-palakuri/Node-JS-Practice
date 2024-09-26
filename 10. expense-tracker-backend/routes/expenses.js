const express = require('express');
const Expense = require('../models/Expense');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = 'your_jwt_secret';

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Add Expense
router.post('/', authenticate, async (req, res) => {
  const { date, amount, category, description } = req.body;
  const newExpense = new Expense({ userId: req.userId, date, amount, category, description });

  await newExpense.save();
  res.status(201).json({ message: 'Expense added successfully' });
});

// Get Expenses
router.get('/', authenticate, async (req, res) => {
  const expenses = await Expense.find({ userId: req.userId });
  res.json(expenses);
});

// Edit Expense
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { date, amount, category, description } = req.body;
  const expense = await Expense.findByIdAndUpdate(id, { date, amount, category, description }, { new: true });

  if (!expense) return res.status(404).json({ message: 'Expense not found' });
  res.json(expense);
});

// Delete Expense
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const expense = await Expense.findByIdAndDelete(id);

  if (!expense) return res.status(404).json({ message: 'Expense not found' });
  res.json({ message: 'Expense deleted successfully' });
});

module.exports = router;
