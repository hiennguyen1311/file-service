import { RawValues } from './raw-values';

export type BaseObject = {
  [key in string]: RawValues;
};
