export default class CalculatorStandartBCards {
  #format;
  #paper;
  #printing;
  #lamination;
  #trim;
  #roundCorners;

  constructor(data) {
    this.#format = data.FORMAT;
    this.#paper = data.PAPER;
    this.#printing = data.PRINTING;
    this.#lamination = data.LAMINATION;
    this.#trim = data.TRIM;
    this.#roundCorners = data.ROUND_CORNERS;
  }

  /*Paper*/
  getPaperCount(count, currFormat) {
    return Math.ceil(count / this.#format[currFormat]);
  }

  getPaperPrice(count, currPaper) {
    return count * this.#paper[currPaper]?.PRICE;
  }

  /*Printing*/
  getPrintingPrice(count, sides, currPrinting) {
    const obj = this.#printing[currPrinting];
    const tempCost = obj.A * Math.pow(count, -obj.B);
    const cost = Math.max(obj.MIN_PRICE, Math.min(tempCost, obj.PRICE));
    return count * sides * cost;
  }

  /*Trim*/
  getTrimPrice(count) {
    return Math.ceil(count / 100) * this.#trim.BUSINESS_CARDS;
  }

  /*Lamination */
  getLaminationPrice(count, currLamination) {
    const currLaminationPrice =
      (this.#lamination[currLamination]?.PRICE ?? 0) * count;

    return currLaminationPrice
      ? currLaminationPrice + this.#lamination.PREPARATION
      : 0;
  }

  /*Round corners*/
  getCornersPrice(count, currCorners) {
    return currCorners === "ROUND_CORNERS" ? this.#roundCorners * count : 0;
  }

  getPrice(state, valute) {
    const { FORMAT, COUNT, PAPER, SIDES, PRINTING, LAMINATION, CORNERS } =
      state;
    const paperCount = this.getPaperCount(COUNT, FORMAT, PRINTING);

    const paperPrice = this.getPaperPrice(paperCount, PAPER);
    const printingPrice = this.getPrintingPrice(paperCount, SIDES, PRINTING);
    const trimPrice = this.getTrimPrice(COUNT);
    const laminationPrice = this.getLaminationPrice(paperCount, LAMINATION);
    const cornersPrice = this.getCornersPrice(COUNT, CORNERS);

    const result =
      (paperPrice +
        printingPrice +
        trimPrice +
        laminationPrice +
        cornersPrice) *
      +valute?.[0].rate;

    return parseFloat(result).toFixed(2);
  }
}
