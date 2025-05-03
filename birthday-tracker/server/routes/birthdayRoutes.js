const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// النموذج
const birthdaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  note: { type: String },
  username: { type: String, required: true } // 🔐 صاحب السجل
});

const Birthday = mongoose.model('Birthday', birthdaySchema);

// ✅ جلب أعياد ميلاد المستخدم
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

// ✅ إضافة عيد ميلاد
router.post('/', async (req, res) => {
  const { name, date, note, username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  try {
    const birthday = new Birthday({ name, date, note, username });
    await birthday.save();
    res.status(201).json(birthday);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save birthday' });
  }
});

// ✅ تحديث عيد ميلاد (فقط إن كان صاحبه)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, note, username } = req.body;

  try {
    const birthday = await Birthday.findOne({ _id: id, username });
    if (!birthday) return res.status(404).json({ error: 'Not found or unauthorized' });

    birthday.name = name;
    birthday.date = date;
    birthday.note = note;
    await birthday.save();
    res.json(birthday);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update birthday' });
  }
});

// ✅ حذف عيد ميلاد (فقط إن كان صاحبه)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  try {
    const birthday = await Birthday.findOneAndDelete({ _id: id, username });
    if (!birthday) return res.status(404).json({ error: 'Not found or unauthorized' });

    res.json({ message: 'Birthday deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete birthday' });
  }
});

module.exports = router;
