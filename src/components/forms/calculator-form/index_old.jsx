"use client";
/*Libs*/
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

/*Layouts */
import Container from "@/layouts/container";

/*Components */
import Button from "@/form/button";
import { Input, Select, NumberInput } from "@/components/form-react-hook";
import Preview from "../../preview";

/*Hooks */
import useCalculator from "@/hooks/useCalculator";
import { useWindowSize } from "@/hooks/useWindowSize";
import { addToCart } from "@/lib/store/slice/cartSlice";
import { useGetPriceQuery } from "@/lib/store/api/priceApi";
import { FormProvider, useForm } from "react-hook-form";

/*Configs*/
import { APIConfig } from "@/api/config";

/*Translations*/
import Message from "@/components/message";

/*Helpers */
import { getHexagonsNumber, getRectanglesNumber } from "@/helpers/math";

const CalculatorForm = (props) => {
  /*Consts*/
  const { config, product } = props;
  const router = useRouter();
  const methods = useForm();
  const locale = useLocale();
  const getDefaultPages = (product) => {
    switch (product) {
      case "staple-broshures":
        return 24;
      case "spring-broshures":
        return 50;
      case "books":
        return 50;
      default:
        return 24;
    }
  };

  const getDefaultPrice = (product) => {
    switch (product) {
      case "standart-business-cards":
        return 230;
      default:
        return 0;
    }
  };
  const formatter = new Intl.NumberFormat("ru");

  /*Redux*/
  const dispatch = useDispatch();

  /*States*/
  const [defaultCount, setDefaultCount] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isResponsing, setIsResponsing] = useState(false);
  const [filePath, setFilePath] = useState(null);

  /*Hooks*/
  const { width } = useWindowSize();
  const price = useCalculator(product, methods.watch());
  const { data } = useGetPriceQuery();

  /*Translations*/
  const tCalculator = useTranslations("Calculator");

  useEffect(
    () => methods.setValue("COUNT", defaultCount),
    [defaultCount, methods],
  );

  /*Effects*/
  useEffect(
    () => {
      if (data) {
        if (product === "stickers") {
          setDefaultCount(() => {
            if (methods.watch("FORM") === "ROUND") {
              return getHexagonsNumber(methods.watch("WIDTH"), 300, 410);
            }
            return getRectanglesNumber(
              methods.watch("WIDTH"),
              methods.watch("HEIGHT"),
              300,
              410,
            );
          });
        } else {
          setDefaultCount(data.SET[methods.getValues("FORMAT")] ?? 1);
        }
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // eslint-disable-next-line react-hooks/exhaustive-deps
      methods.watch(),
      product,
      data,
    ],
  );

  useEffect(() => {
    if (methods.watch("file").length) {
      uploadFile(methods.watch("file"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.watch("file")]);

  useEffect(() => {
    if (product === "posters" || product === "banners") {
      switch (methods.watch("FORMAT")) {
        case "A0":
          return (
            methods.setValue("WIDTH", 841), methods.setValue("HEIGHT", 1189)
          );
        case "A1":
          return (
            methods.setValue("WIDTH", 594), methods.setValue("HEIGHT", 841)
          );
        case "A2":
          return (
            methods.setValue("WIDTH", 420), methods.setValue("HEIGHT", 594)
          );
        case "800_1800":
          return (
            methods.setValue("WIDTH", 800), methods.setValue("HEIGHT", 1800)
          );
        case "800_2000":
          return (
            methods.setValue("WIDTH", 800), methods.setValue("HEIGHT", 2000)
          );
        case "1000_2000":
          return (
            methods.setValue("WIDTH", 1000), methods.setValue("HEIGHT", 2000)
          );
        default:
          return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.watch("FORMAT")]);

  useEffect(
    () => {
      if ((product === "posters" || product === "banners") && data) {
        if (
          methods.watch("WIDTH") >
          Math.max(...data?.WIDE_PAPER?.[methods.watch("WIDE_PAPER")]?.SIZES) -
            20
        ) {
          methods.setValue(
            "WIDTH",
            Math.max(...data.WIDE_PAPER[methods.watch("WIDE_PAPER")].SIZES) -
              20,
          );
          methods.setValue("FORMAT", "CUSTOM");
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, methods.watch("WIDTH"), methods.watch("WIDE_PAPER"), product],
    data,
  );

  /*Handlers*/
  const saveToLocalStorage = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        params: methods.getValues(),
        name: product,
        price,
        filePath,
      }),
    );
  };

  const uploadFile = async () => {
    setIsResponsing(true);
    const formData = new FormData();
    const file = methods.getValues("file")[0];
    formData.append("file", file);
    try {
      const response = await fetch(
        `${APIConfig.host}:${APIConfig.port}/upload`,
        {
          method: "post",
          body: formData,
        },
      );
      const responseData = await response.json();

      if (responseData["message"] === "OK") {
        setIsResponsing(false);
        setFilePath(
          `${APIConfig.host}:${APIConfig.port}/uploads/${responseData["filename"]}`,
        );
      }
    } catch (e) {}
  };

  return (
    <>
      <Wrapper id="calculator">
        <Container>
          <h2>{tCalculator("header")}</h2>
          <div>
            <FormProvider {...methods}>
              <form>
                {config.map((item) => {
                  switch (item.input) {
                    case "SELECTION":
                      return (
                        <div key={item.name}>
                          <h3>{tCalculator(`${item.name}.header`)}</h3>
                          <Select {...item} t={tCalculator} />
                        </div>
                      );
                    case "NUMBER":
                      return (
                        <div key={item.name} className="count is-pop-over">
                          <h3>
                            {tCalculator(`${item.name}.header`)}
                            {product !== "staple-brochures" &&
                              product !== "spring-brochures" &&
                              product !== "books" &&
                              product !== "posters" &&
                              product !== "banners" &&
                              product !== "books" &&
                              !!defaultCount && (
                                <>
                                  <span>i</span>
                                  <PopOver className="popover">
                                    {tCalculator.rich(`${item.name}.info`, {
                                      number:
                                        data?.FORMAT[
                                          methods.getValues("FORMAT")
                                        ] ?? defaultCount,
                                    })}
                                  </PopOver>
                                </>
                              )}
                          </h3>
                          <NumberInput
                            setValue={methods.setValue}
                            getValues={methods.getValues}
                            min={
                              item.name === "COLOR_PAGES" ||
                              item.name === "GRAYSCALE_PAGES"
                                ? 0
                                : 1
                            }
                            allwaysMore={product === "stickers"}
                            step={
                              product === "staple-brochures" ||
                              product === "spring-brochures" ||
                              product === "books"
                                ? 1
                                : data?.FORMAT[methods.getValues("FORMAT")] ??
                                  (Number.isNaN(defaultCount) || !defaultCount
                                    ? 1
                                    : defaultCount)
                            }
                            defaultValue={
                              item.name === "GRAYSCALE_PAGES"
                                ? 50
                                : item.name === "COLOR_PAGES"
                                ? 0
                                : defaultCount
                            }
                            {...item}
                          />
                        </div>
                      );
                    case "WIDE_PRINTING_SIZE":
                      return (
                        <SubGrid
                          key={item.name}
                          className={
                            methods.getValues("FORMAT") !== "CUSTOM"
                              ? "no-display"
                              : ""
                          }
                        >
                          <div>
                            <h4>{tCalculator(`WIDTH.header`)}</h4>
                            <NumberInput
                              setValue={methods.setValue}
                              getValues={methods.getValues}
                              step={1}
                              name="WIDTH"
                              min={297}
                              max={
                                data
                                  ? Math.max(
                                      data?.WIDE_PAPER?.[
                                        methods.watch("WIDE_PAPER")
                                      ]?.SIZES,
                                    ) - 20
                                  : 1000
                              }
                              defaultValue={841}
                            />
                          </div>
                          <div>
                            <h4>{tCalculator(`HEIGHT.header`)}</h4>
                            <NumberInput
                              setValue={methods.setValue}
                              getValues={methods.getValues}
                              step={1}
                              name="HEIGHT"
                              min={420}
                              max={6000}
                              defaultValue={1189}
                            />
                          </div>
                        </SubGrid>
                      );
                    case "STICKER_SIZE":
                      if (methods.watch("FORM") === "ROUND") {
                        return (
                          <Grid key={item.name}>
                            <div>
                              <h3>{tCalculator(`DIAMETER.header`)}</h3>
                              <NumberInput
                                setValue={methods.setValue}
                                getValues={methods.getValues}
                                step={1}
                                name="WIDTH"
                                defaultValue={50}
                                min={10}
                                max={300}
                              />
                            </div>

                            <div className="no-display">
                              <h3>{tCalculator(`HEIGHT.header`)}</h3>
                              <NumberInput
                                setValue={methods.setValue}
                                getValues={methods.getValues}
                                step={1}
                                name="HEIGHT"
                                defaultValue={methods.watch("WIDTH")}
                                min={10}
                                max={420}
                                disabled={true}
                              />
                            </div>
                          </Grid>
                        );
                      }
                      return (
                        <Grid key={item.name}>
                          <div>
                            <h3>{tCalculator(`WIDTH.header`)}</h3>
                            <NumberInput
                              setValue={methods.setValue}
                              getValues={methods.getValues}
                              step={1}
                              name="WIDTH"
                              defaultValue={50}
                              min={10}
                              max={300}
                            />
                          </div>
                          <div>
                            <h3>{tCalculator(`HEIGHT.header`)}</h3>
                            <NumberInput
                              setValue={methods.setValue}
                              getValues={methods.getValues}
                              step={1}
                              name="HEIGHT"
                              defaultValue={50}
                              min={10}
                              max={420}
                            />
                          </div>
                        </Grid>
                      );
                    case "MULTIPLY":
                      return (
                        <MultiplyDiv key={item.name}>
                          <h3>{tCalculator(`${item.name}.header`)}</h3>
                          <div>
                            {item.content.map((subItem) => {
                              switch (subItem.input) {
                                case "SELECTION":
                                  return (
                                    <div key={subItem.name}>
                                      <h4
                                        className={
                                          (methods.getValues("COVER.PAPER") ===
                                            "NO_PAPER" &&
                                            item.name === "COVER" &&
                                            subItem.name !== "PAPER") ||
                                          (methods.getValues(
                                            "INER.PRINTING",
                                          ) === "NO_PRINTING" &&
                                            item.name === "INER" &&
                                            subItem.name === "SIDES")
                                            ? "disabled"
                                            : ""
                                        }
                                      >
                                        {tCalculator(`${subItem.name}.header`)}
                                      </h4>
                                      <Select
                                        name={`${item.name}.${subItem.name}`}
                                        content={subItem.content}
                                        t={tCalculator}
                                        disabled={
                                          (methods.getValues("COVER.PAPER") ===
                                            "NO_PAPER" &&
                                            item.name === "COVER" &&
                                            subItem.name !== "PAPER") ||
                                          (methods.getValues(
                                            "INER.PRINTING",
                                          ) === "NO_PRINTING" &&
                                            item.name === "INER" &&
                                            subItem.name === "SIDES")
                                        }
                                      />
                                    </div>
                                  );
                                case "NUMBER":
                                  return (
                                    <div
                                      key={item.name}
                                      className="pages-count"
                                    >
                                      <h4>
                                        {tCalculator(
                                          `${item.name}.${subItem.name}.header`,
                                        )}
                                      </h4>
                                      <NumberInput
                                        setValue={methods.setValue}
                                        getValues={methods.getValues}
                                        min={1}
                                        allwaysMore={product === "stickers"}
                                        step={
                                          product === "staple-brochures"
                                            ? 4
                                            : methods.getValues("INER.SIDES") ??
                                              1
                                        }
                                        defaultValue={getDefaultPages(product)}
                                        name={`${item.name}.${subItem.name}`}
                                      />
                                    </div>
                                  );
                              }
                            })}
                          </div>
                        </MultiplyDiv>
                      );

                    default:
                      return;
                  }
                })}
                {!isNaN(price) ? (
                  <div>
                    <h3>
                      {tCalculator("price")}
                      <>
                        <span>i</span>
                        <PopOver className="popover">
                          {product !== "stickers"
                            ? tCalculator.rich(`price_info`)
                            : tCalculator.rich(`price_info_stickers`)}
                        </PopOver>
                      </>
                    </h3>
                    <span
                      itemProp="offers"
                      itemScope
                      itemType="https://schema.org/Offer"
                    >
                      <strong itemProp="price" content={price}>
                        {formatter.format(price) ?? getDefaultPrice(product)}
                      </strong>
                      <strong itemProp="priceCurrency" content="UAH">
                        ₴
                      </strong>
                      <link
                        itemProp="availability"
                        href="https://schema.org/PreOrder"
                      />
                    </span>
                  </div>
                ) : (
                  <>
                    {price && <Error>{tCalculator(`ERRORS.${price}`)}</Error>}
                  </>
                )}
                <Purchage>
                  <Input type="file" name="file" />
                  <Button
                    title={tCalculator("addToCart")}
                    bgColor={"var(--thirdColor)"}
                    name="addToCart"
                    type="button"
                    handler={(e) => {
                      setShowPopUp(true);
                      saveToLocalStorage(e);
                    }}
                    disabled={isResponsing || isNaN(price)}
                  />
                  <Button
                    title={tCalculator("purchage")}
                    name="purchage"
                    type="button"
                    handler={(e) => {
                      saveToLocalStorage(e);
                      router.replace(`/${locale}/order`);
                    }}
                    disabled={isResponsing || isNaN(price)}
                  />
                </Purchage>
              </form>
            </FormProvider>
            {width > 1280 && (
              <Preview params={methods.watch()} product={props.product} />
            )}
          </div>
        </Container>
      </Wrapper>
      {showPopUp && (
        <Message
          header={"Повідомлення"}
          message={"Замовлення успішно додано до кошика"}
          close={() => setShowPopUp(false)}
        />
      )}
    </>
  );
};

export default CalculatorForm;

const Wrapper = styled.div`
  margin-top: 24px;
  background: var(--mainBackground);
  box-shadow: var(--boxShadow);
  & > div {
    padding: 24px 0;
    & > div {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      @media screen and (max-width: 1280px) {
        grid-template-columns: 1fr;
      }
      @media screen and (max-width: 1024px) {
        display: block;
      }

      gap: 36px;
      form {
        @media screen and (max-width: 1280px) {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 24px;
        }
        @media screen and (max-width: 1024px) {
          display: block;
        }
      }
    }
    select {
      width: 100%;
    }
    input[type="file"] {
      height: 48px;
    }
    & > div {
      margin: 8px 0;
      h3 {
        padding: 8px 0;
        color: var(--thirdColor);
        & > span {
          font-size: 10px !important;
          margin-left: 6px;
          background-color: var(--thirdColor);
          color: white;
          display: inline-block;
          width: 18px;
          height: 18px;
          font-size: 14px;
          text-align: center;
          font-weight: bold;
          border-radius: 50%;
          padding: 3px;
          transform: translateY(-2px);
        }
      }
      span {
        font-size: 36px;
      }
    }
    button {
      margin: 24px 0 0;
    }
  }
`;

const Purchage = styled.div`
  align-items: end;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 0 24px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 100% !important;
  gap: 24px;
`;

const MultiplyDiv = styled.div`
  padding: 24px 0 0;
  & > div {
    h4 {
      padding: 8px 0;
      color: var(--thirdColor);
    }
    padding-left: 12px;
  }
`;

const Error = styled.div`
  padding: 12px;
  border: 1px solid var(--thirdColor);
  border-radius: var(--borderRadius);
`;

const SubGrid = styled(Grid)`
  padding: 12px 0 24px;
  & > div {
    h4 {
      padding: 8px 0;
      color: var(--thirdColor);
    }
    padding-left: 12px;
  }
`;

const PopOver = styled.div`
  background: var(--mainBackground);
  z-index: 99;
  padding: 12px;
  font-size: 1rem;
  position: absolute;
  margin-top: 6px;
  margin-left: -2px;
  max-width: 450px;
  text-align: center;
  outline: 1px solid var(--thirdColor);
  border-radius: var(--borderRadius);
  opacity: 0;
  visibility: hidden;
  box-shadow: var(--boxShadow);
`;
