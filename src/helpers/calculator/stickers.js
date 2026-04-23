import { getHexagonsNumber } from "../math";
import getRectanglesNumber from "../math/rectangles-in-rectangle";

export default class CalculatorStickers {
  #printing;
  #material;
  #cutting;
  #layout;
  #lamination;

  constructor(data) {
    this.#printing = data.PRINTING;
    this.#material = data.PAPER;
    this.#cutting = data.PLOTTER_CUTTING;
    this.#layout = data.LAYOUT.STICKERS;
    this.#lamination = data.LAMINATION;
  }

  getPrintingPrice(count, currPrinting) {
    const obj = this.#printing[currPrinting];
    const tempCost = obj.A * Math.pow(count, -obj.B);
    const cost = Math.max(obj.MIN_PRICE, Math.min(tempCost, obj.PRICE));
    return count * cost;
  }

  getCuttingPrice(form, countOnSheet, sheetsCount, width, height) {
    /*min price for cutting*/
    const defaultPriceObj = this.#cutting.DEFAULT;
    const tempMinPrice = defaultPriceObj.B - defaultPriceObj.A * sheetsCount;
    const minPrice = Math.max(tempMinPrice, defaultPriceObj.MIN_PRICE);

    const currPriceObj = this.#cutting.CUTTING;
    const tempCurrPrice = currPriceObj.B - currPriceObj.A * sheetsCount;
    const currPrice = Math.max(tempCurrPrice, currPriceObj.MIN_PRICE);

    if (form === "ROUND") {
      const totalPrice =
        (currPrice * countOnSheet * sheetsCount * Math.PI * width) / 1000;
      return !!totalPrice ? Math.max(minPrice, totalPrice) : 0;
    }
    const totalPrice =
      (currPrice * countOnSheet * sheetsCount * ((+width + +height) / 2)) /
      1000;
    return !!totalPrice ? Math.max(minPrice, totalPrice) : 0;
  }

    /*Lamination */
    getLaminationPrice(count, currLamination) {
      const currLaminationPrice =
        (this.#lamination[currLamination]?.PRICE ?? 0) * count;
  
      return currLaminationPrice
        ? currLaminationPrice + this.#lamination.PREPARATION
        : 0;
    }

  getPrice(state, valute) {
    /*printingArea*/
    const sheetWidth = 300;
    const sheetHeight = 420;

    /*stickerSize*/
    const width =
      state.WIDTH; /*< 10 ? 10 : state.WIDTH > 300 ? 300 : state.WIDTH;*/
    const height =
      state.HEIGHT; /*< 10 ? (state.HEIGHT > 420 ? 420 : 10) : state.HEIGHT;*/

    /*printingType*/
    const currPrinting = state.MATERIAL === "FILM" ? "COLOR" : state.PRINTING;

    /*count of stickers on 1 sheet*/
    let countOnSheet =
      state.FORM === "ROUND"
        ? getHexagonsNumber(width, sheetWidth, sheetHeight)
        : getRectanglesNumber(width, height, sheetWidth, sheetHeight);
    countOnSheet = countOnSheet < 1 ? 1 : countOnSheet;

    /*sheetsCount*/
    const sheetsCount = Math.ceil(state.COUNT / countOnSheet);

    /*printingPrice*/
    const printingPrice = this.getPrintingPrice(sheetsCount, currPrinting);

    /*materialPrice*/
    const materialPrice = this.#material[state.MATERIAL].PRICE * sheetsCount;

    /*cuttingPrice*/
    const cuttingPrice = this.getCuttingPrice(
      state.FORM,
      countOnSheet,
      sheetsCount,
      width,
      height
    );

    /*laminationPrice*/
    const laminationPrice = this.getLaminationPrice(sheetsCount, state.LAMINATION);

    /*totalPrice*/
    const result =
      (printingPrice + materialPrice + cuttingPrice + this.#layout + laminationPrice) *
      valute?.[0].rate;
    return parseFloat(result).toFixed(2);
  }
}
