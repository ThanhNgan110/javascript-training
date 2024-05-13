import { REGEX_PATTERNS } from "../constants/regexPatterns";

let formError = {};
const validateEmpty = ({key, value}) => {
    formError[key] = value.trim() === '' ? `${key} is required` : '';
};

const validateString = ({key, value}) => {
    formError[key] = typeof value !== 'string' ?  `${key} must be a string`: '';
};

const validateInterger = ({key, value}) => {
  formError[key] = !REGEX_PATTERNS.isInterger.test(value) ? `${key} must be a string` : '';
};

const validateEmail = ({key, value}) => {
  formError[key] = !REGEX_PATTERNS.isEmail.test(value) ? `${key} not match format` : '';
}

/**
 * Validates the form data
 * @param {Object} data - The form data
 * @returns {Object} An object containing validation results
 */
function validateForm(validationSchema) {
  formError = {};
  for (const key in validationSchema) {
    // const { field, value, validators } = validationSchema[key];
    const {key, value} = validationSchema[key];
    // validateEmpty({ key: field, value });
    validateEmpty({key: key, value});
    for (const validator of validators) {
      if (formError[field] !== '') {
        break;
      }
      validator({ key: field, value });
    }
  }
  return { formError }
}

export {
  validateString,
  validateEmpty,
  validateEmail,
  validateForm,
  validateInterger
};




