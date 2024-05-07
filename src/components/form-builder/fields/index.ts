import { Number } from './number';
import * as numbers from './number.helpers';
import { String } from './string';

export const number = {
  render: Number,
  validation: numbers.validators,
};

export const string = {
  render: String,
};
