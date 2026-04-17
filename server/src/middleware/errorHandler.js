export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
};

export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const payload = {
    success: false,
    message: error.message || 'Something went wrong'
  };

  if (error.details) {
    payload.details = error.details;
  }

  if (req.app.get('env') === 'development' && error.stack) {
    payload.stack = error.stack;
  }

  res.status(statusCode).json(payload);
};

