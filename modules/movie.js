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
  Cast:[],
  CastImages: [],
  Crew:[],
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
  Response: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const movieModel = mongoose.model('movies', movieSchema)
module.exports = movieModel;

