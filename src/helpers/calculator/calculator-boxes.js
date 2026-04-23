export default class CalculatorBoxes {
  #box;

  constructor(data) {
    this.#box = data.BOX;
  }

  /*Printing*/
  getPrintingPrice(count, currBox) {
    const obj = this.#box[currBox];
    const tempCost = obj.B - obj.A * count;
    const cost = Math.max(obj.MIN_PRICE, Math.min(tempCost, obj.PRICE));
    return count * cost;
  }

  getPrice(state, valute) {
    const { BOX, COUNT } = state;
    const totalPrice = this.getPrintingPrice(COUNT, BOX) * +valute?.[0].rate;

    return parseFloat(totalPrice).toFixed(2);
  }
}
