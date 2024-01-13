const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Command = require('../modules/command');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/addCommand', async (req, res) => {
  const { user, command, range, voting, selectedOptions } = req.body;

  try {
    let existingCommand = await Command.findOne({ user });

    if (existingCommand) {
      existingCommand.command = command;
      existingCommand.range = range;
      existingCommand.voting = voting;
      existingCommand.selectedOptions = selectedOptions;

      await existingCommand.save();
      res.status(200).send('User Review Updated');
    } else {
      const newCommand = new Command({
        user,
        command,
        range,
        voting,
        selectedOption,
      });

      await newCommand.save();
      res.status(201).send('User Review Registered');
    }
  } catch (error) {
    console.error('Error registering/updating user review:', error);
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
