const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  MovieIcon: [],
  name: {
    type: String,
    required: true
  },
  Released: {
    type: String,
    required: true
  },
  Runtime: {
    type: String,
    required: true
  },
  Genre: [],
  Screen: [],
  Certificate: {
    type: String,
    required: true
  },
  Cast: {
    type: String,
    required: true
  },
  Images: [],
  Crew: {
    type: String,
    required: true
  },
  Images2: [],
  Description: {
    type: String,
    required: true
  },
  Language: [],
  Video: {
    type: String,
    required: true
  },
  Rating: {
    type: Number,
    required: true
  },
  Votes: {
    type: String,
    required: true
  },
  Response: {
    type: String,
    required: true
  },
  currentbookings: []
}, {
  timestamps: true
})

const movieModel = mongoose.model('movies', movieSchema)
module.exports = movieModel;

