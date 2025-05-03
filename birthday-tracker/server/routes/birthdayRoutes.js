const express = require('express');
const router = express.Router();
const Birthday = require('../models/birthday');

// 🔍 Get all birthdays for a specific user
router.get('/', async (req, res) => {
  const { user } = req.query;
  if (!user) return res.status(400).json({ error: 'Username is required' });

  try {
    const birthdays = await Birthday.find({ username: user });
    res.json(birthdays);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ➕ Add new birthday
router.post('/', async (req, res) => {
  const { name, date, note, username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  try {
    const newBirthday = new Birthday({ name, date, note, username });
    await newBirthday.save();
    res.status(201).json(newBirthday);
  } catch (err) {
    res.status(500).json({ error: 'Error saving birthday' });
  }
});

// 📝 Update birthday (only if it belongs to the user)
router.put('/:id', async (req, res) => {
  const { name, date, note, username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  try {
    const birthday = await Birthday.findOneAndUpdate(
      { _id: req.params.id, username }, // ✅ تأكد أن التعديل فقط للمستخدم الصحيح
      { name, date, note },
      { new: true }
    );

    if (!birthday) return res.status(404).json({ error: 'Not found or not allowed' });
    res.json(birthday);
  } catch (err) {
    res.status(500).json({ error: 'Error updating birthday' });
  }
});

// ❌ Delete birthday (only if it belongs to the user)
router.delete('/:id', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  try {
    const deleted = await Birthday.findOneAndDelete({ _id: req.params.id, username });

    if (!deleted) return res.status(404).json({ error: 'Not found or not allowed' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting birthday' });
  }
});

module.exports = router;
