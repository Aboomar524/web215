const express = require('express');
const router = express.Router();
const Birthday = require('../models/Birthday');

router.get('/', async (req, res) => {
  const birthdays = await Birthday.find().sort({ date: 1 });
  res.json(birthdays);
});

router.post('/', async (req, res) => {
  const newBirthday = new Birthday(req.body);
  const saved = await newBirthday.save();
  res.json(saved);
});

router.put('/:id', async (req, res) => {
  const updated = await Birthday.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Birthday.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;