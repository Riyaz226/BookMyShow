const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Command = require('../modules/command');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/addCommand', async (req, res) => {
  const newCommand = new Command({
    user: req.body.user,
    command: req.body.command,
    range: req.body.range,
    voting: req.body.voting,
    selectedOption: req.body.selectedOption
  });

  try {
    const com = await newCommand.save();
    res.status(201).send('User Review Registered');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getAllCommands', async (req, res) => {
  try {
    const commands = await Command.find();
    res.json(commands);
  } catch (error) {
    console.error('Error fetching commands:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
