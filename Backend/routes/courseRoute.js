const express = require('express');
const router = express.Router();

const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

const { getBatchesByCourse } = require('../controllers/batchController');

const authHandler = require('../middlewares/authHandler');
const allowRoles = require('../middlewares/allowRoles');

router.get('/', getCourses);

router.get('/:id', getCourseById);

router.get('/:courseId/batches', authHandler, getBatchesByCourse);

router.post('/', authHandler, allowRoles('admin'), createCourse);

router.put('/:id', authHandler, allowRoles('admin'), updateCourse);

router.delete('/:id', authHandler, allowRoles('admin'), deleteCourse);

module.exports = router;