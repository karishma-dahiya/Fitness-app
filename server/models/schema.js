const mongoose = require('mongoose');


const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    length: { type: Number, required: true },
});
  
const programSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    exercises: [exerciseSchema]
  });

const Program = mongoose.model("Program", programSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = { Exercise, Program };