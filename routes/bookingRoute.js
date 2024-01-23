require('dotenv').config();
const router = require('express').Router();
const os = require('os');
const moment = require('moment');
const nodemailer = require('nodemailer');
const Movie = require('../modules/movie')
const Booking = require('../modules/receive');

router.post('/getallbookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/getbookingsbyuserid", async (req, res) => {
  const { userid } = req.body;
try {
    const bookings = await Booking.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});


router.post("/bookTickets", async (req, res) => {
  const { user, movie, date, time, theater, language, screen, paymentAmount, seatRate, convenienceFee, selectedSeats } = req.body;

  try {
    const newBooking = new Booking({
      userid: user._id,
      username: user.name,
      movie: movie.name,
      movieid: movie._id,
      bookImg: movie.MovieIcon[0] || movie.MovieIcon[1],
      Certificate: movie.Certificate,
      date: moment(date).format('DD-MM-YYYY'),
      time,
      theater,
      screen,
      language,
      paymentAmount,
      seatRate,
      convenienceFee,
      selectedSeats,
      transactionId: '1234',
      status: 'booked'
    });

    const booking = await newBooking.save();
    const movietemp = await Movie.findOne({ _id: movie._id });
    movietemp.currentbookings.push({
      userid: user._id,
      bookingid: booking._id,
      date: moment(date).format('DD-MM-YYYY'),
      name: movie.name,
      status: booking.status
    });

    await movietemp.save();
    await sendConfirmationEmail(user.email, user, booking, res);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function sendConfirmationEmail(userEmail, user, booking, res) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  try {
    function getLocalIP() {
      const interfaces = os.networkInterfaces();
      for (const interfaceName in interfaces) {
        const iface = interfaces[interfaceName];
        for (let i = 0; i < iface.length; i++) {
          const { address, family, internal } = iface[i];
          if (family === 'IPv4' && !internal) {
            return address;
          }
        }
      }
      return null;
    }

    const localIP = getLocalIP();
    if (localIP) {
      const mailOptions = {
        from: process.env.USER,
        to: userEmail,
        subject: 'Ticket Booking Confirmation',
        // text: `𝕿𝖍𝖆𝖓𝖐 𝖞𝖔𝖚, ${booking.username}, 𝖋𝖔𝖗 𝖇𝖔𝖔𝖐𝖎𝖓𝖌 𝖙𝖎𝖈𝖐𝖊𝖙𝖘!\𝖓\𝖓𝕭𝖔𝖔𝖐𝖎𝖓𝖌 𝕯𝖊𝖙𝖆𝖎𝖑𝖘:\n` +
        //   `𝔅𝔬𝔬𝔨𝔦𝔫𝔤ℑ𝔡: ${booking._id}\n` +
        //   `𝔇𝔞𝔱𝔢: ${booking.date}\n` +
        //   `𝔗𝔦𝔪𝔢: ${booking.time}\n` +
        //   `𝔐𝔬𝔳𝔦𝔢: ${booking.movie}\n` +
        //   `𝔓𝔞𝔶𝔪𝔢𝔫𝔱: ${booking.paymentAmount}\n` +
        //   `𝔗𝔥𝔢𝔞𝔱𝔢𝔯: ${booking.theater}\n` +
        //   `𝔖𝔱𝔞𝔱𝔲𝔰: ${booking.status}\n`,
        html: `
          <p>Thank you, ${booking.username}, for booking tickets!</p>
          <p>Your payment in ${booking.paymentAmount},transaction Sucessfully</p>
          <p><a href="http://${localIP}:3000/Profile">Visit Your Tickets</a></p>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).json({ error: 'Error sending confirmation email' });
        } else {
          console.log('Email sent: ' + info.response);
          res.send('Ticket Booked Successfully. Confirmation email sent.');
        }
      });
    } else {
      console.log('Unable to retrieve the local IP address.');
      res.status(500).json({ error: 'Unable to retrieve the local IP address' });
    }
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    res.status(500).json({ error: 'Error sending confirmation email' });
  }
}

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, movieid } = req.body;

  try {
    const bookingItem = await Booking.findOne({ _id: bookingid });

    if (!bookingItem) {
      return res.status(404).json({ error: "Booking not found" });
    }

    bookingItem.status = 'cancelled';
    await bookingItem.save();

    const movie = await Movie.findOne({ _id: movieid });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    movie.currentbookings.pull({ _id: bookingid });
    await movie.save();

    const originalPaymentAmount = bookingItem.paymentAmount;
    const refundAmount = 0.2 * originalPaymentAmount;
    const finalPaymentAmount = originalPaymentAmount - refundAmount;

    const userEmail = bookingItem.userEmail;

    // Check if userEmail is defined and not an empty string
    if (!userEmail || userEmail.trim() === '') {
      return res.status(400).json({ error: "User email is missing or invalid" });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: userEmail,
      subject: 'Booking Cancellation Confirmation',
      html: `<p>Your booking for movie ${movie.name} has been canceled.</p>
             <p>We have processed a refund of ${refundAmount} and your final payment amount is ${finalPaymentAmount}.</p>
             <p>We hope to see you again soon!</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Your booking is cancelled' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
