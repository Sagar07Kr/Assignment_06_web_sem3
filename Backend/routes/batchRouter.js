const express = require('express');
const router = express.Router();

const {
  createBatch,
  updateBatch,
  deleteBatch
} = require('../controllers/batchController');

const { getBatchEnrollments } = require('../controllers/enrolmentController');

const authHandler = require('../middlewares/authHandler');
const allowRoles = require('../middlewares/allowRoles');

router.post('/', authHandler, allowRoles('admin'), createBatch);

router.put('/:id', authHandler, allowRoles('admin'), updateBatch);

router.delete('/:id', authHandler, allowRoles('admin'), deleteBatch);

router.get(
  '/:id/enrollments',
  authHandler,
  allowRoles('admin'),
  getBatchEnrollments
);

module.exports = router;