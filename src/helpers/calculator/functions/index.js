export const getPaperPrice = (count, price) => {
  if (price) {
    return count * price.PRICE;
  }
  return 0;
  
}

export const getPrintingPrice = (count, sides, price) => {
  if (price) {
    const obj = price;
    const tempCost = obj.A * Math.pow(count, -obj.B);
    const cost = Math.max(obj.MIN_PRICE, Math.min(tempCost, obj.PRICE));
    return count * sides * cost;
}
return 0;
}

export const getScanPrice = (count, sides, price) => {
  if (price) {
    const obj = price;
    const tempCost = obj.A * Math.pow(count, -obj.B);
    const cost = Math.max(obj.MIN_PRICE, Math.min(tempCost, obj.PRICE));
    return count * sides * cost;
}
return 0;
}