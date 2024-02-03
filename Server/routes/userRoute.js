const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const os = require('os');
require('dotenv').config();

const User = require("../modules/user");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/register', async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  if (!email.toLowerCase().endsWith('@gmail.com')) {
    return res.status(400).json({ error: 'Email must end with @gmail.com' });
}
  const newUser = new User({
    name,
    email,
    password,
    cpassword,
  });

  try {
    const user = await newUser.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    
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
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Registration Confirmation',
        html: `
          <h3>Hello ${name},</h3>
          <p>Thank you for registering with My BookMyShow! Click the link below to visit our homepage:</p>
          <p><a href="http://${localIP}:3000">Visit My BookMyShow</a></p>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).json({ error: 'Error sending confirmation email' });
        } else {
          console.log('Email sent: ' + info.response);
          res.send('User Registered Successfully. Confirmation email sent.');
        }
      });
    } else {
      console.log('Unable to retrieve the local IP address.');
      res.status(500).json({ error: 'Unable to retrieve the local IP address' });
    }
  } catch (error) {
    console.error('Error registering user:', error);

    if (error.errors && error.errors.email) {
        return res.status(400).json({ error: error.errors.email.message });
    }

    res.status(500).json({ error: 'Internal Server Error' });
}
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user;

    if (typeof password === 'number' || typeof password === 'string') {
      user = await User.findOneAndUpdate(
        { email, password },
        { $inc: { visitCount: 1 } },
        { new: true }
      );
    } else {
      return res.status(400).json({ message: "Invalid password format" });
    }

    if (user) {
      const userData = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
        visitCount: user.visitCount
      };
      res.json(userData);
    } else {
      return res.status(400).json({ message: "Login Failed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/getallUsers', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
