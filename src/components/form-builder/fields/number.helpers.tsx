const INT_DIGIT_REGEX = /^\d+$/;
const FLOAT_DIGIT_REGEX = /^\d+\.\d+$/;

export const validators = {
  int: (value: string) => INT_DIGIT_REGEX.test(value),
  float: (value: string) => FLOAT_DIGIT_REGEX.test(value),
};
