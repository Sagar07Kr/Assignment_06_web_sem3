const express = require('express');
const router = express.Router();

const {
  createEnrollment,
  getMyEnrollments,
  updateEnrollmentStatus
} = require('../controllers/enrolmentController');

const authHandler = require('../middlewares/authHandler');
const allowRoles = require('../middlewares/allowRoles');

router.post('/', authHandler, allowRoles('student'), createEnrollment);
router.get('/my', authHandler, allowRoles('student'), getMyEnrollments);
router.patch('/:id/status', authHandler, allowRoles('admin'), updateEnrollmentStatus);

module.exports = router;