export function isObject(obj) {
  return typeof obj == "object";
}
export function isString(string) {
  return typeof string == "string";
}
export function isNumber(number) {
  return typeof number == "number";
}
export function isBoolean(bool) {
  return typeof bool == "boolean";
}
export function isFunction(func) {
  return typeof func == "function";
}
export function isNotAnEmptyString(string) {
  return typeof string == "string" && string.length > 0;
}
export function isValidPhoneNumber(input) {
  var phoneReg = /^\(?([0-9]{3})\)?([0-9]{3})([0-9]{4})$/;
  var zerosReg = /[1-9]/g;
  var phoneMatch = input.match(phoneReg);
  if (!phoneMatch || !zerosReg.test(phoneMatch)) {
    return "Please enter a valid Phone Number";
  } else {
    return null;
  }
}

export function isValidEmail(input) {
  if (
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      input
    )
  ) {
    return null;
  }
  if (input.trim() === "") {
    return "Email is required";
  }
  return "Please enter a valid email";
}

export const isStrongPassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long!";
  } else {
    return null;
  }
};

export const nameValidation = (fieldName, fieldValue) => {
  if (fieldValue.trim() === "") {
    return `${fieldName} is required`;
  }
  if (/[^a-zA-Z -]/.test(fieldValue)) {
    return "Invalid characters";
  }
  if (fieldValue.trim().length < 3) {
    return `${fieldName} needs to be at least three characters`;
  }
  return null;
};
