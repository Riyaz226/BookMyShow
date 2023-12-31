const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, 'A command must have a name'],
    unique: true
  },
  command: {
    type: String,
    required: [true, 'A command must have a name'],
    unique: true
  },
  range: {
    type: Number,
    default: 100
  },
  voting: {
    type: Number,
    required: [true, 'Voting value is required'],
  },
  selectedOption: {
    type: String,
    required: [true, 'Selected option is required'],
  }
});

const Command = mongoose.model('Command', commandSchema);

module.exports = Command;
