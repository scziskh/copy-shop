import { Calculator } from "@/config/calculator";
import { useGetExchangeQuery } from "@/lib/store/api/exchangeApi";
import { useGetPriceQuery } from "@/lib/store/api/priceApi";
import { useEffect, useState } from "react";

const useCalculator = (product, params) => {
  const [calculator, setCalculator] = useState();
  const { data } = useGetPriceQuery();
  const valute = useGetExchangeQuery("EUR")?.data;
  const [state, setState] = useState("0,00");
  useEffect(() => {
    if (data) {
      setCalculator(Calculator[product](data));
    }
  }, [data, product]);
  useEffect(() => {
    if (valute) {
      setState(calculator?.getPrice(params, valute));
    }
  }, [calculator, params, valute]);

  return state;
};

export default useCalculator;
