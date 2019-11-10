const joi = require("@hapi/joi");

const register = joi.object({
  name: joi
    .string()
    .alphanum()
    .min(2)
    .max(20)
    .required(),
  email: joi
    .string()
    .email()
    .required(),
  password: joi
    .string()
    .min(6)
    .max(32)
    .required()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/),
  confirmPassword: joi
    .any()
    .valid(joi.ref("password"))
    .required()
});

const login = joi.object({
  name: joi
    .string()
    .alphanum()
    .min(2)
    .max(20)
    .required(),
  password: joi
    .string()
    .min(6)
    .max(32)
    .required()
});

const schemas = {
  register,
  login
};

const check = (schema, property) => (req, res, next) => {
  const { error } = schema.validate(req[property], { abortEarly: false });
  // Input is valid
  if (!error) {
    return next();
  }
  // Input is invalid
  return res.status(400).send(error);
};

module.exports = {
  schemas,
  check
};
