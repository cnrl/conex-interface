export type SingleField = {
  type: 'float' | 'bool' | 'tuple' | 'callable' | 'function' | 'str' | 'int';
  description: string;
  default: any;
} | null;

// required
// constraints
