import { REGEX_PATTERNS } from "../constants/regexPatterns";

let formError = {};
const validateEmpty = ({ key, value }) => {
  formError[key] = value.trim() === "" ? `${key} is required` : "";
};

const validateString = ({ key, value }) => {
  formError[key] = typeof value !== "string" ? `${key} must be a string` : "";
};

const validateInterger = ({ key, value }) => {
  formError[key] = !REGEX_PATTERNS.isInterger.test(value)
    ? `${key} must be a string`
    : "";
};

const validateEmail = ({ key, value }) => {
  formError[key] = !REGEX_PATTERNS.isEmail.test(value)
    ? `${key} not match format`
    : "";
};

function validateForm(validationSchema) {
  Object.entries(validationSchema).map(([key, value]) => {
    validateEmpty({ key: key, value: value });
    if (key === "email") {
      validateEmail({ key, value });
    }
  });
  return formError;
}

export {
  validateString,
  validateEmpty,
  validateEmail,
  validateForm,
  validateInterger,
};
