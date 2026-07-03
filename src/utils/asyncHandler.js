export const asyncHandler = (controller) => (req, res, next) => {
  Promise.resolve(controller(req, res, next)).catch((err) => {
    err.statusCode = err.statusCode || 500;
    next(err);
  });
};

