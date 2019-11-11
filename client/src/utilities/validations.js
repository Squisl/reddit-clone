import validator from "validator";

const validateString = string => {
  return typeof string === "string" && string.trim().length > 0;
};

export const validateName = name => {
  const error = {};
  if (!validateString(name)) {
    error.name = "Name must be string";
  }
  if (!validator.isLength(name, {min: 2, max: 20})) {
    error.name = "Name must be between 2 and 20 characters";
  }
  if (validator.isEmpty(name)) {
    error.name = "Name is required";
  }
  return {valid: Object.keys(error).length === 0, error};
};

export const validateEmail = email => {
  const error = {};
  if (!validateString(email)) {
    error.email = "E-mail must be string";
  }
  if (!validator.isEmail(email)) {
    error.email = "Invalid E-mail";
  }
  if (validator.isEmpty(email)) {
    error.email = "E-mail is required";
  }
  return {valid: Object.keys(error).length === 0, error};
};

export const validatePassword = password => {
  const error = {};
  if (!validateString(password)) {
    error.password = "Password must be string";
  }
  if (!validator.isLength(password, {min: 6, max: 32})) {
    error.password = "Password must be between 6 and 32 characters";
  }
  if (validator.isEmpty(password)) {
    error.password = "Password is required";
  }
  return {valid: Object.keys(error).length === 0, error};
};

export const validateConfirmPassword = (password, confirmPassword) => {
  const error = {};
  if (!validateString(confirmPassword)) {
    error.confirmPassword = "Confirm Password must be string";
  }
  if (!validator.equals(password, confirmPassword)) {
    error.confirmPassword = "Password and Confirm Password must match";
  }
  if (!validator.isLength(confirmPassword, {min: 6, max: 32})) {
    error.confirmPassword = "Confirm Password must be between 6 and 32 characters";
  }
  if (validator.isEmpty(confirmPassword)) {
    error.confirmPassword = "Confirm Password is required";
  }
  return {valid: Object.keys(error).length === 0, error};
};
