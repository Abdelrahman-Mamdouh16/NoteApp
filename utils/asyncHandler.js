export const asyncHandler = (controller) => (req, res, next) => {
  controller(req, res, next).catch((err) => {
    const error = new Error(err.message || "Internal Server Error");
    error.statusCode = 500;
    return next(error);
  });
};
