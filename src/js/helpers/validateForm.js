import { REGEX_PATTERNS } from "../constants/regexPatterns";

let formError = {};

const validateEmpty = ({ key, value }) => {
  formError[key] = value.trim() === "" ? `${key} is required` : "";
};

const validateInterger = ({ key, value }) => {
  formError[key] = !REGEX_PATTERNS.VALID_INTERGER.test(value)
    ? `${key} must be a interger`
    : "";
};

const validateString = ({ key, value }) => {
  formError[key] =
    typeof value !== "string" || isNaN(value) === false
      ? `${key} must be a string`
      : "";
};

const validateEmail = ({ key, value }) => {
  formError[key] = !REGEX_PATTERNS.VALID_EMAIL.test(value)
    ? `${key} format is invalid`
    : "";
};

const validatePhone = ({ key, value }) => {
  formError[key] = !REGEX_PATTERNS.VALID_NUMBER_PHONE.test(value)
    ? `${key} format is invalid`
    : "";
};

const validateForm = (validationSchema) => {
  formError = {};

  Object.entries(validationSchema).map(([key, value]) => {
    if (key !== "Note") {
      validateEmpty({ key: key, value: value });     
    }

    if (!formError[key]) {
      if (
        key === "First Name" ||
        key === "Last Name" ||
        key === "Company Name"
      ) {
        validateString({ key, value });
      }

      if (key === "Zip Code") {
        validateInterger({ key, value });
      }

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
  validateInterger,
  validateEmpty,
  validateEmail,
  validateForm,
  validatePhone,
};
