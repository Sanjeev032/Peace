const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false, // Return all errors, not just the first one
      stripUnknown: true, // Remove fields not defined in the schema
    });

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ');
      
      res.status(400);
      return next(new Error(errorMessage));
    }

    next();
  };
};

module.exports = validate;
