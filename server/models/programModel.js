const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    exercises: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exercise",
        },
    ],
  });

const Program = mongoose.model("Program", programSchema);

module.exports = Program;