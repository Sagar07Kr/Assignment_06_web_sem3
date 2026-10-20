const Course = require('../models/course');
const Batch = require('../models/batch');
const Enrollment = require('../models/entrollment');

const getDashboardMetrics = async (req, res, next) => {
  try {
    const totalCourses = await Course.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activeBatches = await Batch.countDocuments({
      startDate: { $gte: today }
    });

    const totalEnrollments = await Enrollment.countDocuments();

    const enrollments = await Enrollment.find();

    let mostPopularCourse = null;

    if (enrollments.length > 0) {
      let courseId = enrollments[0].course;
      let maxCount = 0;

      for (const enrollment of enrollments) {
        let count = 0;

        for (const item of enrollments) {
          if (item.course.toString() === enrollment.course.toString()) {
            count++;
          }
        }

        if (count > maxCount) {
          maxCount = count;
          courseId = enrollment.course;
        }
      }

      const course = await Course.findById(courseId);

      if (course) {
        mostPopularCourse = {
          course: course.title,
          count: maxCount
        };
      }
    }

    res.json({
      totalCourses,
      activeBatches,
      totalEnrollments,
      mostPopularCourse
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardMetrics
};