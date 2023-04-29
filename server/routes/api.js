const express = require('express');
const Program = require('../models/programModel');
const Exercise = require('../models/exerciseModel');
const router = express.Router();

router.post('/programs', async (req, res) => {
  try {
   const program = new Program(req.body);
  await program.save();
  

    res.status(201).json(program);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Program name must be unique' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

router.get('/programs', async (req, res) => {
  try {
  const programs = await Program.find();
  res.json(programs);
  } catch (error) {
    console.error('Error finding fitness programs', error);
    res.status(500).json({ message: 'Error finding fitness programs' });
  }
});


router.put('/programs/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const program = await Program.findByIdAndUpdate(id, { name }, { new: true }).exec();
    if (!program) {
      res.status(404).send('Program not found');
    } else {
      res.json(program);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});


router.delete('/programs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const program = await Program.findByIdAndDelete(id);
    if (!program) {
      res.status(404).send('Program not found');
    } else {
      res.send('Program deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
})


router.get('/programs/:programId/exercises', async (req, res) => {
  try {
  const program = await Program.findById(req.params.programId).populate('exercises');
  if (!program) {
    return res.status(404).json({ message: 'Program not found' });
  }
  return res.json(program.exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post('/programs/:programId/exercises', async (req, res) => {
  try {
    const program = await Program.findById(req.params.programId);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    const exercise = new Exercise({
      name: req.body.name,
      length: req.body.length,
      programId: program._id // set programId to the program's id
    });

    await exercise.save();

    program.exercises.push(exercise);
    await program.save();

    return res.status(201).json(exercise);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding exercise to program');
  }
});

router.delete('/exercises/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const exercise = await Exercise.findByIdAndDelete(id);
    if (!exercise) {
      res.status(404).send('Exercise not found');
    } else {
      res.send('Exercise deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
})


module.exports = router;