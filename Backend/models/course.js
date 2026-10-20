const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true
    },
    courseCode: {
      type: String,
      required: [true, 'Course code is required'],
      unique: true,
      trim: true,
      uppercase: true
    },
    durationWeeks: {
      type: Number,
      required: [true, 'Duration in weeks is required'],
      min: [1, 'Duration must be at least 1 week']
    },
    fee: {
      type: Number,
      required: [true, 'Course fee is required'],
      min: [0, 'Fee cannot be negative']
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
      trim: true
    }
  }
);

const courseModel = mongoose.model('coursemodel', courseSchema);

module.exports = courseModel;
