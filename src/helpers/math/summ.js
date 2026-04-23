export const summ = (...values) =>
  values.reduce((accum, value) => accum + Number(value), 0);
