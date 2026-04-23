import Calculator from "/";

export default class SpringCalculator extends Calculator {
  constructor(data) {
    const binding = data.BINDING.STAPLES;
    super(data, binding);
  }

  getPrice(state, valute) {
    const temp = {};
    const { COVER, INER } = state;

    //update state
    temp.COVER = { ...this.updateParams(COVER) };
    if (state?.INER?.PRINTING === "NO_PRINTING") {
      temp.INER = {
        SIDES: 2,
        PAPER: INER.PAPER,
        PRINTING: "NO_PRINTING",
        LAMINATION: INER.LAMINATION,
        PAGES: INER.PAGES,
      };
    }

    const currState = { ...state, ...temp };

    return this.getTotalPrice(currState, valute);
  }
}
