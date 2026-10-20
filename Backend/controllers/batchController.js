const Batch = require('../models/batch');
const Course = require('../models/course');
const Enrollment = require('../models/entrollment');

const getBatchesByCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

    const batches = await Batch.find({
      course: req.params.courseId
    });

    const result = [];

    for (const batch of batches) {
      const seats = await Enrollment.countDocuments({
        batch: batch._id,
        status: { $in: ['Active', 'Completed'] }
      });

      const batchData = batch.toObject();

      batchData.occupiedSeats = seats;
      batchData.seatsLeft = batch.totalSeats - seats;

      result.push(batchData);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const createBatch = async (req, res) => {
  try {
    const course = await Course.findById(req.body.course);

    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

    const batch = await Batch.create(req.body);

    res.status(201).json(batch);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateBatch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);

    if (!batch) {
      return res.status(404).json({
        message: 'Batch not found'
      });
    }

    if (req.body.course) {
      const course = await Course.findById(req.body.course);

      if (!course) {
        return res.status(404).json({
          message: 'Course not found'
        });
      }
    }

    Object.assign(batch, req.body);

    await batch.save();

    res.json(batch);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteBatch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);

    if (!batch) {
      return res.status(404).json({
        message: 'Batch not found'
      });
    }

    const enrollment = await Enrollment.findOne({
      batch: req.params.id
    });

    if (enrollment) {
      return res.status(400).json({
        message: 'Cannot delete batch because students are enrolled'
      });
    }

    await Batch.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Batch deleted'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getBatchesByCourse,
  createBatch,
  updateBatch,
  deleteBatch
};