const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  MovieIcon: [],
  name: {
    type: String,
    required: true
  },
  Released: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  Runtime: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  Genre: [],
  Screen: [],
  Certificate: {
    type: String,
    required: true
  },
  Cast: [],
  CastImages: [],
  Crew: [],
  CrewImages: [],
  Description: {
    type: String,
    required: true
  },
  Language: [],
  Video: {
    type: String,
    required: true
  },
  theater: [],
  payment: {
    type: Number,
    required: true
  },
  convenience: {
    type: Number,
    required: true
  },
  time: [],
  currentbookings: [],
  reviews:[],
  Response: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const movieModel = mongoose.model('movies', movieSchema)
module.exports = movieModel;

