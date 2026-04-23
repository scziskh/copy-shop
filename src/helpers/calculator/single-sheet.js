export default class CalculatorSingleSheet {
  #format;
  #paper;
  #printing;
  #lamination;
  #trim;
  #folding;

  constructor(data) {
    this.#format = data.FORMAT;
    this.#paper = data.PAPER;
    this.#printing = data.PRINTING;
    this.#lamination = data.LAMINATION;
    this.#trim = data.TRIM;
    this.#folding = data.FOLDING;
  }

  /*Paper*/
  getPaperCount(count, currFormat) {
    return Math.ceil(count / this.#format[currFormat]);
  }
  getPaperPrice(count, currPaper) {
    return count * this.#paper[currPaper].PRICE;
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
    return Math.ceil(count / 100) * this.#trim.SINGLE_SHEET;
  }

  /*Lamination */
  getLaminationPrice(count, currLamination) {
    const obj = this.#lamination[currLamination];
    if (obj) {
      const tempCost = obj.A * Math.pow(count, -obj.B);
      const cost = Math.max(obj.MIN_PRICE, Math.min(tempCost, obj.PRICE));

      return cost * count;
    }
    return 0;
  }

  /*Folding */
  getFoldingPrice(count, currFolding) {
    const currFoldingPrice = this.#folding.FOLDING * count * currFolding;

    return !!currFoldingPrice
      ? currFoldingPrice + this.#folding.PREPARATION
      : 0;
  }

  getPrice(state, valute) {
    const { FORMAT, COUNT, PAPER, SIDES, PRINTING, LAMINATION, FOLDING } =
      state;
    const paperCount = this.getPaperCount(COUNT, FORMAT, PRINTING);

    const paperPrice = this.getPaperPrice(paperCount, PAPER);
    const printingPrice = this.getPrintingPrice(paperCount, SIDES, PRINTING);
    const trimPrice = this.getTrimPrice(COUNT);
    const laminationPrice = this.getLaminationPrice(paperCount, LAMINATION);
    const foldingPrice = this.getFoldingPrice(paperCount, FOLDING);

    const result =
      (paperPrice +
        printingPrice +
        trimPrice +
        laminationPrice +
        foldingPrice) *
      +valute?.[0].rate;

    return parseFloat(result).toFixed(2);
  }
}
