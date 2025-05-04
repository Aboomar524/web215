const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ Register route (بدون تشفير يدوي)
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existing = await User.findOne({ username });
        if (existing) return res.status(400).json({ message: 'Username already taken' });

        const newUser = new User({ username, password }); // ❗ لا تشفّر هنا
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Login route (استخدم دالة comparePassword من الموديل)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const match = await user.comparePassword(password); // ✅ استخدم الدالة من الـ schema
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });

        res.json({ username });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
