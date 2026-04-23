import Calculator from "/";

export default class ThermobinderCalculator extends Calculator {
  getPrice(state, valute) {
    const temp = {};
    //update state
    temp.COVER = { ...this.updateParams(state.COVER) };
    temp.BINDING = "THERMOBINDER";

    const currState = { ...state, ...temp };

    return this.getTotalPrice(currState, valute);
  }
}
