const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  length: { type: Number, required: true },
  programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' }
  });

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;  