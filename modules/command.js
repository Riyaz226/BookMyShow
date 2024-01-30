const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  movie: {
    type: String,
    required: true,
   },
  user: {
    type: String,
    required: [true, 'A command must have a name'],
  },
  command: {
    type: String,
    required: [true, 'A command must have a name'],
  },
  range: {
    type: Number,
    default: 100
  },
  voting: {
    type: Number,
    required: [true, 'Voting value is required'],
  },
  selectedOptions: [String],
  uploadTime: {
    type: Date,
    default: Date.now,
    get: (value) => value && value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
});

const Command = mongoose.model('Command', commandSchema);

module.exports = Command;
