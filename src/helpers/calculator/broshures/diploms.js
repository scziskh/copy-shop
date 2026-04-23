import { summ } from "@/helpers/math/summ";

export default class DiplomsCalculator {
  #printing;
  #papers;
  #format;
  #binding;

  constructor(data) {
    this.#printing = data.PRINTING;
    this.#papers = data.PAPER;
    this.#format = data.FORMAT;
    this.#binding = data.BINDING.CANAL;
  }

  getPaperPrice(paper, count) {
    return (count * this.#papers[paper].PRICE) / 2;
  }

  getPrintingPrice(count, printing) {
    if (printing !== "NO_PRINTING") {
      const obj = this.#printing[printing];
      const tempCost = obj.A * Math.pow(count, -obj.B);
      const cost = Math.max(obj.MIN_PRICE, Math.min(tempCost, obj.PRICE));
      return count * cost;
    }
    return 0;
  }

  getThickness(count, paper) {
    return this.#papers[paper]?.THICK * count;
  }

  getBindingPrice(thickness) {
    const sizes = this.#binding.SIZES;
    let i = 0;
    let size;

    //found the size of booklet (depends from thickness)
    while (sizes[i] && !size) {
      thickness <= sizes[i].THICK ? (size = sizes[i]) : ++i;
    }

    //return binding cost
    if (size) {
      return size.PRICE;
    }
    return false;
  }

  getPrice(state, valute) {
    const colorPages = state.COLOR_PAGES;
    const grayscalePages = state.GRAYSCALE_PAGES;
    const totalPages = summ(colorPages, grayscalePages);

    const paperPrice = this.getPaperPrice(80, totalPages);

    const colorPrintingPrice = this.getPrintingPrice(colorPages, "COLOR");
    const grayscalePrintingPrice = this.getPrintingPrice(
      grayscalePages,
      "GRAYSCALE"
    );
    const totalPrintingPrice = summ(colorPrintingPrice, grayscalePrintingPrice);

    const thickness = this.getThickness(totalPages, 80);

    const bindingPrice = this.getBindingPrice(thickness);

    const temp =
      summ(paperPrice, totalPrintingPrice, bindingPrice) * +valute?.[0].rate;

    const result =
      totalPages < 50
        ? "TOO_THIN_50"
        : bindingPrice
        ? parseFloat(temp).toFixed(2)
        : "TOO_THICK";

    return result;
  }
}
