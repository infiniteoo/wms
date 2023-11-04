const itemSplit = (item) => {
  const inputString = item;
  const [itemNumber, itemDescription] = inputString.split(" - ");

  return [itemNumber, itemDescription];
};

module.exports = itemSplit;
