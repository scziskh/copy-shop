import Calculator from "/";

export default class StaplesCalculator extends Calculator {
  getPrice(state, valute) {
    const temp = {};
    //update state
    temp.COVER = { ...this.updateParams(state.COVER) };
    temp.INER = { SIDES: 2, ...state.INER };
    temp.BINDING = "STAPLES";

    const currState = { ...state, ...temp };

    return this.getTotalPrice(currState, valute);
  }
}
