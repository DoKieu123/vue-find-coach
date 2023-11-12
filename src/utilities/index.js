export const generateId = (array) => {
  const lastItem = array[array.length - 1];
  const currentId = lastItem.id;

  const startIndex = currentId.search("c") + 1;
  const number = +currentId.slice(startIndex) + 1;

  return `c${number}`;
};
