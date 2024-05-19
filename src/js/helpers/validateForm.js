import { REGEX_PATTERNS } from "../constants/regexPatterns";

let formError = {};

const validateEmpty = ({ key, value }) => {
  formError[key] = value.trim() === "" ? `${key} is required` : "";
};

const validateString = ({ key, value }) => {
  console.log(value);
  console.log(typeof value);
  formError[key] =
    typeof value !== "string" || isNaN(value) === false
      ? `${key} must be a string`
      : "";
};

const validateEmail = ({ key, value }) => {
  formError[key] = !(REGEX_PATTERNS.isValidEmail.test(value))
    ? `${key} not match format`
    : "";
};

const validatePhone = ({ key, value }) => {
  formError[key] = !(REGEX_PATTERNS.isValidPhone.test(value))
    ? `${key} must be a valid phone number`
    : "";
};

function validateForm(validationSchema) {
  formError = {};

  Object.entries(validationSchema).map(([key, value]) => {
    validateEmpty({ key: key, value: value });

    if (!formError[key]) {
      if (key === "First Name" || key === "Last Name" || key === "Company Name")
        validateString({ key, value });

      if (key === "Email") {
        validateEmail({ key, value });
      }

      if (key === "Phone Number") {
        validatePhone({ key, value });
      }
    }
  });

  return formError;
}

export {
  validateString,
  validateEmpty,
  validateEmail,
  validateForm,
  validatePhone,
};
