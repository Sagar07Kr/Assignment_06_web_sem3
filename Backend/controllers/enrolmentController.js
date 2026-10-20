const Enrollment = require('../models/entrollment');
const Batch = require('../models/batch');

const createEnrollment = async (req, res, next) => {
  try {
    const batchId = req.body.batch || req.body.batchId;

    if (!batchId) {
      return res.status(400).json({
        message: 'Batch ID is required'
      });
    }

    const batch = await Batch.findById(batchId);

    if (!batch) {
      return res.status(404).json({
        message: 'Batch not found'
      });
    }

    const oldEnrollment = await Enrollment.findOne({
      student: req.user._id,
      course: batch.course
    });

    if (oldEnrollment) {
      return res.status(409).json({
        message: 'Already enrolled in this course'
      });
    }

    const seats = await Enrollment.countDocuments({
      batch: batch._id,
      status: {
        $in: ['Active', 'Completed']
      }
    });

    if (seats >= batch.totalSeats) {
      return res.status(409).json({
        message: 'Batch is full'
      });
    }

    const enrollment = await Enrollment.create({
      student: req.user._id,
      batch: batch._id,
      course: batch.course,
      status: 'Active',
      enrolledAt: new Date()
    });

    const result = await Enrollment.findById(enrollment._id)
      .populate('course', 'title courseCode durationWeeks fee description')
      .populate('batch', 'batchName startDate timing mode totalSeats');

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getMyEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user._id
    })
      .populate('course', 'title courseCode durationWeeks fee description')
      .populate('batch', 'batchName startDate timing mode totalSeats')
      .sort({ enrolledAt: -1 });

    res.json(enrollments);
  } catch (error) {
    next(error);
  }
};

const getBatchEnrollments = async (req, res, next) => {
  try {
    const batch = await Batch.findById(req.params.id);

    if (!batch) {
      return res.status(404).json({
        message: 'Batch not found'
      });
    }

    const enrollments = await Enrollment.find({
      batch: req.params.id
    })
      .populate('student', 'name email phone')
      .populate('course', 'title courseCode')
      .sort({ enrolledAt: -1 });

    res.json(enrollments);
  } catch (error) {
    next(error);
  }
};

const updateEnrollmentStatus = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        message: 'Enrollment not found'
      });
    }

    const status = req.body.status;

    if (
      status !== 'Active' &&
      status !== 'Completed' &&
      status !== 'Dropped'
    ) {
      return res.status(400).json({
        message: 'Invalid status'
      });
    }

    enrollment.status = status;

    await enrollment.save();

    const result = await Enrollment.findById(enrollment._id)
      .populate('student', 'name email')
      .populate('batch', 'batchName totalSeats')
      .populate('course', 'title courseCode');

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnrollment,
  getMyEnrollments,
  getBatchEnrollments,
  updateEnrollmentStatus
};