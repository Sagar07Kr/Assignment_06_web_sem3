const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ID format: ${err.value}`;
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = 'Course code must be unique';
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;

    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(', ');
  }

  res.status(statusCode).json({
    message
  });
};

module.exports = errorHandler;