const express = require('express');
const router = express.Router();
const Birthday = require('../models/Birthday');

// ✅ Get birthdays for a specific user
router.get('/', async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ message: 'Username is required' });

  const birthdays = await Birthday.find({ username }).sort({ date: 1 });
  res.json(birthdays);
});

// ✅ Add new birthday (with username)
router.post('/', async (req, res) => {
  const { name, date, note, username } = req.body;
  if (!username) return res.status(400).json({ message: 'Username is required' });

  const newBirthday = new Birthday({ name, date, note, username });
  const saved = await newBirthday.save();
  res.json(saved);
});

// ✅ Update (username not required here, just use ID)
router.put('/:id', async (req, res) => {
  const updated = await Birthday.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// ✅ Delete (ID only)
router.delete('/:id', async (req, res) => {
  await Birthday.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
