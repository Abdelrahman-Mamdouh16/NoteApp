//schema ={...req.body,...req.headers,...req.params,...req.query}
export const isValidate = (Schema) => {
  return async (req, res, next) => {
    // if(req.body) schema.body.validate(req.body)
    const validationResult = Schema.validate(req.body, { abortEarly: false });
    if (validationResult.error) {
      const errorMessages = validationResult.error.details.map(
        (detail) => detail.message,
      );
      return next(new Error(errorMessages.join(", "), { cause: 400 }));
    }

    return next();
  };
};
