import ApiError from '../utils/apiError.js';

export const validateRequest = schema => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params
  });

  if (!result.success) {
    return next(
      new ApiError(
        400,
        'Validation failed',
        result.error.issues.map(issue => ({
          path: issue.path.join('.'),
          message: issue.message
        }))
      )
    );
  }

  req.validated = result.data;
  next();
};

