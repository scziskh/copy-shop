"use client";

/*Libs*/
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

/*Components*/
import SingleProduct from "@/components/cart/single-product";
import { Input, RadioButton, Select } from "@/components/form-react-hook";
import Button from "@/form/button";
import Container from "@/layouts/container";

/*Configs*/
import { APIConfig } from "@/api/config";
import { Calculator } from "@/config/calculator";

/*userLibs*/
import { useGetExchangeQuery } from "@/lib/store/api/exchangeApi";
import { useGetPriceQuery } from "@/lib/store/api/priceApi";
import { removeAllFromCart, removeFromCart } from "@/lib/store/slice/cartSlice";
import Cookies from "js-cookie";
import CartPage from "../cart/page";
import BreadCrumbs from "@/components/breadcrumbs";

const OrderPage = () => {
  /*States*/
  const [isClient, setIsClient] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const locale = useLocale();
  const router = useRouter();

  /*Redux*/
  const { data } = useGetPriceQuery();
  const valute = useGetExchangeQuery("EUR")?.data;
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  /*Consts*/
  const methods = useForm();
  const locationsList = ["amosova"];
  const formatter = new Intl.NumberFormat("ru");

  /*Translations*/
  const t = useTranslations("Order");

  /*Effects*/
  useEffect(() => setIsClient(() => true), []);

  useEffect(() => {
    if (data && valute && isClient) {
      setTotalPrice(
        cartItems.reduce((accum, item) => {
          const calculator = Calculator[item.name](data);
          return +accum + +calculator.getPrice(item.params, valute);
        }, 0)
      );
    }
  }, [cartItems, data, valute, isClient]);

  /*Handlers*/
  const removeItem = (index) => {
    dispatch(removeFromCart(index));
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${APIConfig.host}:${APIConfig.port}/order`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data, cartItems, totalPrice }),
        }
      );
      const responseData = await response.json();

      if (responseData["message"] === "OK") {
        Cookies.set("order", responseData.number);
        dispatch(removeAllFromCart());
        router.push(`/${locale}/order/success`);
      }
    } catch (err) {}
  };

  if (isClient && !cartItems.length) {
    return <CartPage />;
  }

  return (
    <Wrapper>
      <Container>
        <BreadCrumbs path={[{ name: t("name"), link: `/order` }]} />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <h2>{t("name")}</h2>
            <Contacts>
              <h3>{t("contacts.header")}</h3>
              <Sub>
                <Input className="no-display" type="email" name="email" />
                <Input
                  type="email"
                  name="email2"
                  placeholder={t("contacts.email")}
                  required={true}
                />
                <Input
                  type="text"
                  name="phone"
                  placeholder={t("contacts.phone")}
                  required={true}
                />
                <Input
                  type="text"
                  name="first-name"
                  placeholder={t("contacts.firstName")}
                  required={true}
                />
                <Input
                  type="text"
                  name="last-name"
                  placeholder={t("contacts.lastName")}
                  required={true}
                />
              </Sub>
            </Contacts>
            <Shipping>
              <h3>{t("shipping.header")}</h3>
              <div>
                <RadioButton
                  value="pickup"
                  name="shipping-type"
                  title={t("shipping.pickup")}
                  defaultChecked={true}
                />
                {isClient && methods.watch("shipping-type") === "pickup" && (
                  <Sub style={{ paddingTop: 0 }}>
                    <Select name="shipping" content={locationsList} t={t} />
                  </Sub>
                )}

                <RadioButton
                  value="novapost"
                  name="shipping-type"
                  title={t("shipping.novapost")}
                />

                {isClient && methods.watch("shipping-type") === "novapost" && (
                  <>
                    <Sup>
                      <RadioButton
                        value="department"
                        name="post-type"
                        title={t(`shipping.post.department`)}
                        defaultChecked={true}
                      />
                      <RadioButton
                        value="address"
                        name="post-type"
                        title={t(`shipping.post.address`)}
                      />
                    </Sup>
                    <Sub>
                      <Input
                        type="text"
                        name="shipping-city"
                        placeholder={t("shipping.post.sub.city")}
                      />
                      <Input
                        type="text"
                        name="shipping-address"
                        placeholder={
                          !!methods.watch("post-type")
                            ? t(
                                `shipping.post.sub.${methods.watch(
                                  "post-type"
                                )}`
                              )
                            : t(`shipping.post.sub.department`)
                        }
                      />
                    </Sub>
                  </>
                )}
              </div>
            </Shipping>
            <PaymentMethod>
              <h3>{t("payment.header")}</h3>
              <div>
                <RadioButton
                  name="payment"
                  title={t("payment.individual")}
                  value="individual"
                  defaultChecked="true"
                />
                <RadioButton
                  name="payment"
                  title={t("payment.entity")}
                  value="entity"
                />
                {methods.watch("payment") === "entity" && (
                  <Sub style={{ paddingTop: 0 }}>
                    <Input
                      type="text"
                      name="payment-organization"
                      placeholder={t("payment.sub.organization")}
                    />
                    <Input
                      type="text"
                      name="payment-itn"
                      placeholder={t("payment.sub.itn")}
                    />
                    <Input
                      type="text"
                      name="payment-edrpou"
                      placeholder={t("payment.sub.edrpou")}
                    />
                    <Input
                      type="text"
                      name="payment-director"
                      placeholder={t("payment.sub.director")}
                    />
                    <Input
                      type="text"
                      name="payment-address"
                      placeholder={t("payment.sub.address")}
                    />
                    <Input
                      type="text"
                      name="payment-post-address"
                      placeholder={t("payment.sub.post-address")}
                    />
                    <Input
                      type="text"
                      name="payment-phone"
                      placeholder={t("payment.sub.phone")}
                    />
                    <Input
                      type="email"
                      name="payment-email"
                      placeholder={t("payment.sub.email")}
                    />
                    <Input
                      type="text"
                      name="payment-bank"
                      placeholder={t("payment.sub.bank")}
                    />
                    <Input
                      type="text"
                      name="payment-iban"
                      placeholder={t("payment.sub.iban")}
                    />
                  </Sub>
                )}
              </div>
            </PaymentMethod>
            <Cart>
              <div>
                <h3>{t("order")}</h3>
                <Items>
                  {isClient &&
                    cartItems.map((item, index) => (
                      <SingleProduct
                        product={item}
                        key={`${item}-${index}`}
                        handler={() => removeItem(index)}
                      />
                    ))}
                </Items>
              </div>

              <div>
                <h3>{t("totalPrice")}</h3>
                <span>
                  {formatter.format(parseFloat(totalPrice).toFixed(2))}₴
                </span>
              </div>
            </Cart>
            <div>
              <Button name="sentMessage" type="submit">
                {t("button")}
              </Button>
            </div>
          </form>
        </FormProvider>
      </Container>
    </Wrapper>
  );
};

export default OrderPage;

const Wrapper = styled.section`
  padding: 0 0 24px;
  form {
    width: 100%;
    & > div {
      padding: 24px 0;
      & > div {
        padding: 24px 0;
        width: 100%;
        display: grid;
        gap: 24px;
      }
    }
  }
`;

const Contacts = styled.div``;

const Shipping = styled.div`
  & > div {
    padding: 0 24px;
  }
`;
const PaymentMethod = styled.div``;

const Sub = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sup = styled.div`
  padding-left: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Items = styled.div``;

const Cart = styled.div`
  span {
    font-size: 36px;
    font-weight: 600;
  }
`;
