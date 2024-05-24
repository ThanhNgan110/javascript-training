import { REGEX_PATTERNS } from "../constants/regexPatterns";

let formError = {};

const validateEmpty = ({ key, value }) => {
 return formError[key] = value.trim() === "" ? `${key} is required` : "";
};

const validateInteger = ({ key, value }) => {
 return formError[key] = !REGEX_PATTERNS.VALID_INTERGER.test(value)
    ? `${key} must be a interger`
    : "";
};

const validateString = ({ key, value }) => {
 return formError[key] =
    typeof value !== "string" || isNaN(value) === false
      ? `${key} must be a string`
      : "";
};

const validateEmail = ({ key, value }) => {
 return formError[key] = !REGEX_PATTERNS.VALID_EMAIL.test(value)
    ? `${key} format is invalid`
    : "";
};

const validatePhone = ({ key, value }) => {
 return formError[key] = !REGEX_PATTERNS.VALID_NUMBER_PHONE.test(value)
    ? `${key} format is invalid`
    : "";
};

export {
  validateString,
  validateInteger,
  validateEmpty,
  validateEmail,
  validatePhone
};
