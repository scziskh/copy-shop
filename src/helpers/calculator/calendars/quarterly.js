import { makeDivisible } from "@/helpers/math/make-divisible";
import { summ } from "@/helpers/math/summ";

export default class Calculator {
  #papers;
  #printing;
  #laminations;
  #format;
  #binding;

  constructor(data) {
    this.#printing = data.PRINTING;
    this.#papers = data.PAPER;
    this.#laminations = data.LAMINATION;
    this.#format = data.FORMAT;
    this.#binding = data.BINDING;
  }

  //If no paper redefine (print, lamin, pages) = 'false', else add pages count
  updateParams(state) {
    if (!state || state.PAPER === "NO_PAPER") {
      return {
        PAPER: "NO_PAPER",
        PRINTING: "NO_PRINTING",
        LAMINATION: "NO_LAMINATION",
        PAGES: 0,
        SIDES: 1,
      };
    }
    return {
      ...state,
      PAGES: state.SIDES * 2,
    };
  }

  //count of printed pages
  getPrintedPagesCount(pages, sides, format, count, paper) {
    const temp =
      paper !== "80"
        ? Math.ceil((pages * count) / this.#format[format])
        : Math.ceil((pages * count * 2) / this.#format[format]) / 2;
    const result = sides
      ? paper !== "80"
        ? makeDivisible(temp, sides)
        : makeDivisible(temp, sides / 2)
      : temp;

    return result;
  }

  ////PRICE
  //paper price
  getPaperPrice(paper, count, sides) {
    if (paper === "NO_PAPER") {
      return 0;
    }
    return (this.#papers[paper].PRICE * count) / sides;
  }

  //printing price
  getPrintingPrice(pages, count, printing) {
    if (printing !== "NO_PRINTING") {
      const obj = this.#printing[printing];
      const tempCost = obj.A * Math.pow(count * pages, -obj.B);
      const cost = Math.max(obj.MIN_PRICE, Math.min(tempCost, obj.PRICE));
      return pages * cost;
    }
    return 0;
  }

  //lamination price
  getLaminationPrice(count, lamination) {
    const laminationPrice = !!this.#laminations[lamination]
      ? this.#laminations[lamination].PRICE * count
      : 0;
    return !!laminationPrice
      ? this.#laminations.PREPARATION + laminationPrice
      : 0;
  }

  ////THICK
  getThickness(count, paper, lamination, sides) {
    const printingThickness = this.#papers[paper]?.THICK ?? 0;
    const laminationThickness = this.#laminations[lamination]?.THICK ?? 0;

    const result =
      summ(summ(printingThickness, laminationThickness) * count) / sides;

    return Number(result) ?? 0;
  }

  getBindingPrice(thickness, count, currBinding) {
    const sizes = this.#binding[currBinding].SIZES;
    let i = 0;
    let size;

    //found the size of booklet (depends from thickness)
    while (sizes[i] && !size) {
      thickness <= sizes[i].THICK ? (size = sizes[i]) : ++i;
    }

    //return binding cost
    if (size) {
      return size.PRICE * count;
    }
    return false;
  }

  getTotalPrice(state, valute) {
    const { FORMAT, COVER, INER, COUNT, BINDING } = state;

    //printedPages
    const coverPrintedPages = this.getPrintedPagesCount(
      COVER.PAGES,
      COVER.SIDES,
      FORMAT,
      COUNT,
      COVER.PAPER,
    );
    const inerPrintedPages = this.getPrintedPagesCount(
      INER.PAGES,
      INER.SIDES,
      FORMAT,
      COUNT,
      INER.PAPER,
    );
    const totalPrintedPages = summ(inerPrintedPages, coverPrintedPages);

    //paperPrice
    const coverPaperPrice = this.getPaperPrice(
      COVER.PAPER,
      coverPrintedPages,
      COVER.SIDES,
    );
    const inerPaperPrice = this.getPaperPrice(
      INER.PAPER,
      inerPrintedPages,
      INER.SIDES,
    );
    const totalPaperPrice = summ(coverPaperPrice, inerPaperPrice);

    //printingPrice
    let totalPrintingPrice = 0;
    ////  diff printing////
    if (COVER.PRINTING !== INER.PRINTING) {
      const coverPrintingPrice = !!coverPrintedPages
        ? this.getPrintingPrice(coverPrintedPages, COVER.PRINTING)
        : 0;
      const inerPrintingPrice = this.getPrintingPrice(
        inerPrintedPages,
        COUNT,
        INER.PRINTING,
      );
      totalPrintingPrice = summ(coverPrintingPrice, inerPrintingPrice);
    }
    //// same printing ////
    else {
      totalPrintingPrice = this.getPrintingPrice(
        totalPrintedPages,
        COUNT,
        COVER.PRINTING,
      );
    }

    //laminationPrice
    let totalLaminationPrice = 0;
    //// diff printing ////
    if (COVER.LAMINATION !== INER.LAMINATION) {
      const coverLaminationPrice = !!coverPrintedPages
        ? this.getLaminationPrice(coverPrintedPages, COVER.LAMINATION)
        : 0;
      const inerLaminationPrice = this.getLaminationPrice(
        inerPrintedPages,
        INER.LAMINATION,
      );
      totalLaminationPrice = summ(coverLaminationPrice, inerLaminationPrice);
    }
    //// same printing ////
    else {
      totalLaminationPrice = this.getLaminationPrice(
        totalPrintedPages,
        INER.LAMINATION,
      );
    }

    // thickness
    const coverThickness = this.getThickness(
      COVER?.PAGES,
      COVER?.PAPER,
      COVER?.LAMINATION,
      COVER?.SIDES,
    );
    const inerThickness = this.getThickness(
      INER.PAGES,
      INER.PAPER,
      INER.LAMINATION,
      INER.SIDES,
    );
    const totalThickness = coverThickness + inerThickness;

    // binding price
    const bindingPrice = this.getBindingPrice(totalThickness, COUNT, BINDING);

    // result
    const temp =
      summ(
        totalPaperPrice,
        totalPrintingPrice,
        totalLaminationPrice,
        bindingPrice,
        this.#binding[BINDING].PREPARATION,
      ) * +valute?.[0].rate;

    const result =
      BINDING === "THERMOBINDER" && INER.PAGES < 20 * INER.SIDES
        ? "TOO_THIN_20"
        : bindingPrice
        ? parseFloat(temp).toFixed(2)
        : "TOO_THICK";
    return result;
  }
}
