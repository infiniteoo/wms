function parseData(data) {
  const itemsData = data.split("\t").filter((item) => item.trim() !== "");

  const items = [];
  let currentItem = {};

  for (let i = 0; i < itemsData.length; i++) {
    const index = i % 8;
    const field = itemsData[i].trim();

    switch (index) {
      case 0:
        currentItem.itemNumber = field;
        break;
      case 1:
        currentItem.itemDescription = field;
        break;
      case 2:
        currentItem.supplierBatchNumber = field;
        break;
      case 3:
        currentItem.productionDate = field;
        break;
      case 4:
        currentItem.expirationDate = field;
        break;
      case 5:
        currentItem.quantity = field;
        break;
      case 6:
        currentItem.unitOfMeasure = field;
        break;
      case 7:
        currentItem.numberOfPallets = field;
        items.push(currentItem);
        currentItem = {};
        break;
      default:
        console.warn(`Unexpected index value: ${index}`);
        break;
    }
  }

  return items;
}

export default parseData;
