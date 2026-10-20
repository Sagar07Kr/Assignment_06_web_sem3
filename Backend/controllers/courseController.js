const Course = require('../models/course');
const Batch = require('../models/batch');
const Enrollment = require('../models/entrollment');

const getCourses = async (req, res, next) => {
  try {
    let courses;

    if (req.query.search) {
      courses = await Course.find({
        $or: [
          { title: new RegExp(req.query.search, 'i') },
          { courseCode: new RegExp(req.query.search, 'i') }
        ]
      });
    } else {
      courses = await Course.find();
    }

    res.json(courses);
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

    res.json(course);
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const {
      title,
      courseCode,
      durationWeeks,
      fee,
      description
    } = req.body;

    if (!title || !courseCode || !durationWeeks || !fee || !description) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    const courseExists = await Course.findOne({
      courseCode: courseCode.toUpperCase()
    });

    if (courseExists) {
      return res.status(400).json({
        message: 'Course code already exists'
      });
    }

    const course = await Course.create({
      title,
      courseCode: courseCode.toUpperCase(),
      durationWeeks,
      fee,
      description
    });

    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

    if (req.body.courseCode) {
      const courseExists = await Course.findOne({
        courseCode: req.body.courseCode.toUpperCase()
      });

      if (courseExists && courseExists._id.toString() !== course._id.toString()) {
        return res.status(400).json({
          message: 'Course code already exists'
        });
      }

      course.courseCode = req.body.courseCode.toUpperCase();
    }

    if (req.body.title) {
      course.title = req.body.title;
    }

    if (req.body.durationWeeks) {
      course.durationWeeks = req.body.durationWeeks;
    }

    if (req.body.fee) {
      course.fee = req.body.fee;
    }

    if (req.body.description) {
      course.description = req.body.description;
    }

    await course.save();

    res.json(course);
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

    const batch = await Batch.findOne({
      course: course._id
    });

    const enrollment = await Enrollment.findOne({
      course: course._id
    });

    if (batch || enrollment) {
      return res.status(400).json({
        message: 'Cannot delete course because it has batches or enrollments'
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Course deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};