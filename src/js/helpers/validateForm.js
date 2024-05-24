import { REGEX_PATTERNS,  } from "../constants/regexPatterns";
import { LABELS } from "../constants/label";

let formError = {};

const validateEmpty = ({ key, value }) => {
 return formError[key] = value.trim() === "" ? `${LABELS[key]} is required` : "";
};

const validateInteger = ({ key, value }) => {
 return formError[key] = !REGEX_PATTERNS.VALID_INTERGER.test(value)
    ? `${LABELS[key]} must be a interger`
    : "";
};

const validateString = ({ key, value }) => {
 return formError[key] =
    typeof value !== "string" || isNaN(value) === false
      ? `${LABELS[key]} must be a string`
      : "";
};

const validateEmail = ({ key, value }) => {
 return formError[key] = !REGEX_PATTERNS.VALID_EMAIL.test(value)
    ? `${LABELS[key]} format is invalid`
    : "";
};

const validatePhone = ({ key, value }) => {
 return formError[key] = !REGEX_PATTERNS.VALID_NUMBER_PHONE.test(value)
    ? `${LABELS[key]} format is invalid`
    : "";
};

export {
  validateString,
  validateInteger,
  validateEmpty,
  validateEmail,
  validatePhone
};
