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
    .required(),
  confirmPassword: joi.valid(joi.ref("password")).required()
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
  const errorObject = error.details.reduce((acc, curr) => {
    acc[curr.path[0]] = curr.message;
    return acc;
  }, {});
  return res.status(400).send(errorObject);
};

module.exports = {
  schemas,
  check
};
