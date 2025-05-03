const mongoose = require('mongoose');

const birthdaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  note: { type: String }
});

module.exports = mongoose.model('Birthday', birthdaySchema);