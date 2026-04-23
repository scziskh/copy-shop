import { summ } from "@/helpers/math/summ";

export default class WidePrintingCalculator {
  #printing;
  #papers;
  #luversPrice;

  constructor(data) {
    this.#printing = data.WIDE_PRINTING;
    this.#papers = data.WIDE_PAPER;
    this.#luversPrice = data.LUVERS;
  }

  getPrintingArea(count, width, height) {
    return (count * width * height) / 1000000;
  }

  getPrintingPrice(area) {
    const obj = this.#printing;
    return area * obj.PRICE;
  }

  getPaperPrice(width, height, count, paper) {
    const areas = this.#papers[paper].SIZES.map((value) => {
      const wCount = Math.floor(value / (+width + 20));
      const hCount = Math.floor(value / (+height + 20));

      const cwCount = Math.ceil(count / wCount);
      const chCount = Math.ceil(count / hCount);

      const wArea = (cwCount * value * height + 50) / 1000000;
      const hArea = (chCount * value * width + 50) / 1000000;

      const result = Math.min(wArea, hArea);

      return result;
    });

    const area = Math.min(...areas);

    return area * this.#papers[paper].PRICE;
  }

  getLuversPrice(width, height, luvers) {
    let count = 0;
    if (luvers === "CORNER") {
      count = 4;
    } else if (luvers === "LINEAR") {
      count = (Math.ceil(width / 330) + Math.ceil(height / 330)) * 2;
    }
    return count * this.#luversPrice;
  }

  getPrice(state, valute) {
    const { COUNT, WIDTH, HEIGHT, WIDE_PAPER: PAPER } = state;
    const printingArea = this.getPrintingArea(COUNT, WIDTH, HEIGHT);
    const printingPrice = this.getPrintingPrice(printingArea);
    const luversPrice = this.getLuversPrice(WIDTH, HEIGHT, state.LUVERS);

    const paperPrice = this.getPaperPrice(WIDTH, HEIGHT, COUNT, PAPER);

    const totalPrice =
      summ(printingPrice, paperPrice, luversPrice) * +valute?.[0].rate;
    return parseFloat(totalPrice).toFixed(2);
  }
}
