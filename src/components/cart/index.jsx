import { useLocale, useTranslations } from "next-intl";
import Image from "@/components/image";
import styled from "styled-components";
import SingleProduct from "./single-product";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/lib/store/slice/cartSlice";
import { Calculator } from "@/config/calculator";
import { useGetPriceQuery } from "@/lib/store/api/priceApi";
import { useGetExchangeQuery } from "@/lib/store/api/exchangeApi";
import Button from "@/form/button";
import { useRouter } from "next/navigation";
import { summ } from "@/helpers/math/summ";

const Cart = () => {
  const t = useTranslations("Cart");
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  const removeItem = (index) => {
    dispatch(removeFromCart(index));
  };
  const { cartItems } = useSelector((state) => state.cart);
  const { data } = useGetPriceQuery();
  const valute = useGetExchangeQuery("EUR")?.data;
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const currentLocale = useLocale();
  const router = useRouter();
  var formatter = new Intl.NumberFormat("ru");

  useEffect(() => {
    if (data && valute && isClient) {
      setTotalPrice(
        cartItems.reduce((accum, item) => {
          const calculator = Calculator[item.name](data);
          return summ(accum, calculator.getPrice(item.params, valute));
        }, 0)
      );
    }
  }, [cartItems, data, valute, isClient]);

  return isClient ? (
    <Wrapper $isProducts={cartItems.length}>
      {cartItems.length ? (
        cartItems.map((item, index) => (
          <SingleProduct
            product={item}
            key={`${item}-${index}`}
            handler={() => removeItem(index)}
          />
        ))
      ) : (
        <>
          <Image width={320} height={320} src="/assets/cart" alt="" />
          <h2>{t("empty")}.</h2>
          <p>{t("emptyDescription")}</p>
        </>
      )}
      {cartItems.length ? (
        <Order>
          <TotalPrice>
            {t("totalPrice")}{" "}
            <span>{formatter.format(parseFloat(totalPrice).toFixed(2))}₴</span>
          </TotalPrice>

          <div>
            <Button
              title={t("button")}
              handler={() => router.push(`/${currentLocale}/order`)}
            />
          </div>
        </Order>
      ) : (
        ""
      )}
    </Wrapper>
  ) : (
    ""
  );
};

export default Cart;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  text-align: ${(props) => {
    return props.$isProducts ? "left" : "center";
  }};
  gap: 24px;
  align-content: ${(props) => {
    return props.$isProducts ? "start" : "center";
  }};
  justify-items: ${(props) => {
    return props.$isProducts ? "start" : "center";
  }};
  img {
    padding: 24px;
  }
  span {
    font-size: 36px;
    font-weight: 600;
  }
`;
const TotalPrice = styled.div`
  font-weight: 600;
`;

const Order = styled.div`
  padding: 24px;
  display: grid;
  justify-items: right;
  gap: 24px;
  width: 100%;
`;
