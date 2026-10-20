const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usermodel',
    required: true
  },

  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'batchmodel',
    required: true
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coursemodel',
    required: true
  },

  status: {
    type: String,
    enum: ['Active', 'Completed', 'Dropped'],
    default: 'Active'
  },

  enrolledAt: {
    type: Date,
    default: Date.now
  }
});

const enrollmentModel = mongoose.model('enrollmentmodel', enrollmentSchema);

module.exports = enrollmentModel;