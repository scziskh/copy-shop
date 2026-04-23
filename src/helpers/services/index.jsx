export const createListedArray = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(null);
  }
  return result;
};
