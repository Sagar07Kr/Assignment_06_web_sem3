const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coursemodel',
    required: true
  },

  batchName: {
    type: String,
    required: true
  },

  startDate: {
    type: Date,
    required: true
  },

  timing: {
    type: String,
    required: true
  },

  mode: {
    type: String,
    enum: ['Online', 'Offline'],
    required: true
  },

  totalSeats: {
    type: Number,
    required: true,
    min: 1
  }
});

const batchModel = mongoose.model('batchmodel', batchSchema);

module.exports = batchModel;