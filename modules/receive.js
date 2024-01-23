const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    movie: {
        type: String,
        required: true
    },
    movieid: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    bookImg: {
        type: String,
        default: '',
    },
    userid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    Certificate: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    theater: {
        type: String,
        required: true
    },
    screen: {
        type: String,
        required: true
    },
    paymentAmount: {
        type: Number,
        required: true
    },
    seatRate: {
        type: Number,
        required: true
    },
    convenienceFee: {
        type: Number,
        required: true
    },
    selectedSeats: [],
    transactionId: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    status: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        default: 'booked'
    }
}, {
    timestamps: true
})

const bookModel = mongoose.model('receive', bookingSchema)
module.exports = bookModel;
