"use client";

import WidePrintingCalculator from "@/helpers/calculator/wide-printing";
import { useGetExchangeQuery } from "@/lib/store/api/exchangeApi";
import { useGetPriceQuery } from "@/lib/store/api/priceApi";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import styled from "styled-components";

const TablePriceWidePrinting = () => {
  const { data } = useGetPriceQuery();
  const valute = useGetExchangeQuery("EUR")?.data;
  const t = useTranslations("TablePrice");
  const tMaterial = useTranslations("Calculator.WIDE_PAPER");

  const [totalPrice, setTotalPrice] = useState(null);
  const [calculator, setCalculator] = useState(null);

  useEffect(() => {
    if (data) {
      setCalculator(new WidePrintingCalculator(data));
    }
  }, [data]);

  useEffect(() => {
    if (valute && calculator) {
      setTotalPrice({
        // Постери
        A2_140: calculator.getPrice(
          { COUNT: 1, WIDTH: 594, HEIGHT: 420, WIDE_PAPER: 140 },
          valute,
        ),
        A1_140: calculator.getPrice(
          { COUNT: 1, WIDTH: 594, HEIGHT: 841, WIDE_PAPER: 140 },
          valute,
        ),
        A0_140: calculator.getPrice(
          { COUNT: 1, WIDTH: 1189, HEIGHT: 841, WIDE_PAPER: 140 },
          valute,
        ),
        A2_150: calculator.getPrice(
          { COUNT: 1, WIDTH: 594, HEIGHT: 420, WIDE_PAPER: 150 },
          valute,
        ),
        A1_150: calculator.getPrice(
          { COUNT: 1, WIDTH: 594, HEIGHT: 841, WIDE_PAPER: 150 },
          valute,
        ),
        A0_150: calculator.getPrice(
          { COUNT: 1, WIDTH: 1189, HEIGHT: 841, WIDE_PAPER: 150 },
          valute,
        ),
        A2_180: calculator.getPrice(
          { COUNT: 1, WIDTH: 594, HEIGHT: 420, WIDE_PAPER: 180 },
          valute,
        ),
        A1_180: calculator.getPrice(
          { COUNT: 1, WIDTH: 594, HEIGHT: 841, WIDE_PAPER: 180 },
          valute,
        ),
        A0_180: calculator.getPrice(
          { COUNT: 1, WIDTH: 1189, HEIGHT: 841, WIDE_PAPER: 180 },
          valute,
        ),
        // Банери
        "1_440": calculator.getPrice(
          { COUNT: 1, WIDTH: 800, HEIGHT: 1800, WIDE_PAPER: "BANNER_440" },
          valute,
        ),
        "2_440": calculator.getPrice(
          { COUNT: 1, WIDTH: 800, HEIGHT: 2000, WIDE_PAPER: "BANNER_440" },
          valute,
        ),
        "3_440": calculator.getPrice(
          { COUNT: 1, WIDTH: 1000, HEIGHT: 2000, WIDE_PAPER: "BANNER_440" },
          valute,
        ),
        "4_440": calculator.getPrice(
          { COUNT: 1, WIDTH: 1500, HEIGHT: 3000, WIDE_PAPER: "BANNER_440" },
          valute,
        ),
        "1_510": calculator.getPrice(
          { COUNT: 1, WIDTH: 800, HEIGHT: 1800, WIDE_PAPER: "BANNER_510" },
          valute,
        ),
        "2_510": calculator.getPrice(
          { COUNT: 1, WIDTH: 800, HEIGHT: 2000, WIDE_PAPER: "BANNER_510" },
          valute,
        ),
        "3_510": calculator.getPrice(
          { COUNT: 1, WIDTH: 1000, HEIGHT: 2000, WIDE_PAPER: "BANNER_510" },
          valute,
        ),
        "4_510": calculator.getPrice(
          { COUNT: 1, WIDTH: 1500, HEIGHT: 3000, WIDE_PAPER: "BANNER_510" },
          valute,
        ),
      });
    }
  }, [calculator, valute]);

  const formatter = new Intl.NumberFormat("ru", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (!totalPrice) return null;

  return (
    <Container>
      <TableCard>
        <SectionHeader>
          <h2>{t("wide-printing.h2")}</h2>
        </SectionHeader>

        {/* Секція Постерів */}
        <SubTitle>{t("wide-printing.h3_posters")}</SubTitle>
        <TableWrapper>
          <StyledTable cols={4}>
            <div className="header-cell">Матеріал / Формат</div>
            <div className="header-cell">A2</div>
            <div className="header-cell">A1</div>
            <div className="header-cell">A0</div>

            <div className="row-title">CityLight (150г)</div>
            <div className="price-cell">
              {formatter.format(totalPrice.A2_150)}
            </div>
            <div className="price-cell">
              {formatter.format(totalPrice.A1_150)}
            </div>
            <div className="price-cell">
              {formatter.format(totalPrice.A0_150)}
            </div>

            <div className="row-title">Photo Paper (140г)</div>
            <div className="price-cell">
              {formatter.format(totalPrice.A2_140)}
            </div>
            <div className="price-cell">
              {formatter.format(totalPrice.A1_140)}
            </div>
            <div className="price-cell">
              {formatter.format(totalPrice.A0_140)}
            </div>

            <div className="row-title">Photo Paper (180г)</div>
            <div className="price-cell">
              {formatter.format(totalPrice.A2_180)}
            </div>
            <div className="price-cell">
              {formatter.format(totalPrice.A1_180)}
            </div>
            <div className="price-cell">
              {formatter.format(totalPrice.A0_180)}
            </div>
          </StyledTable>
        </TableWrapper>

        <PriceDivider />

        {/* Секція Банерів */}
        <SubTitle>{t("wide-printing.h3_banners")}</SubTitle>
        <TableWrapper>
          <StyledTable cols={5}>
            <div className="header-cell">Матеріал / Розмір</div>
            <div className="header-cell">0,8×1,8 м</div>
            <div className="header-cell">0,8×2 м</div>
            <div className="header-cell">1×2 м</div>
            <div className="header-cell">1,5×3 м</div>

            <div className="row-title">{tMaterial("BANNER_440")}</div>
            <div className="price-cell">
              {formatter.format(totalPrice["1_440"])}
            </div>
            <div className="price-cell">
              {formatter.format(totalPrice["2_440"])}
            </div>
            <div className="price-cell">
              {formatter.format(totalPrice["3_440"])}
            </div>
            <div className="price-cell">
              {formatter.format(totalPrice["4_440"])}
            </div>

            <div className="row-title">{tMaterial("BANNER_510")}</div>
            <div className="price-cell">
              {formatter.format(totalPrice["1_510"])}
            </div>
            <div className="price-cell">
              {formatter.format(totalPrice["2_510"])}
            </div>
            <div className="price-cell">
              {formatter.format(totalPrice["3_510"])}
            </div>
            <div className="price-cell">
              {formatter.format(totalPrice["4_510"])}
            </div>
          </StyledTable>
        </TableWrapper>
        <Note>{t("wide-printing.span")}</Note>
      </TableCard>
    </Container>
  );
};

export default TablePriceWidePrinting;

// --- ІДЕНТИЧНІ СТИЛІ ---

const Container = styled.div`
  margin: 40px 0;
  width: 100%;
`;

const TableCard = styled.div`
  background: white;
  border-radius: var(--borderRadius);
  box-shadow: var(--boxShadow);
  padding: 20px;
  border: 1px solid #eee;
`;

const SectionHeader = styled.div`
  margin-bottom: 20px;
  h2 {
    color: var(--textColor);
    margin: 0;
  }
`;

const SubTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--thirdColor);
  margin: 20px 0 10px;
`;

const PriceDivider = styled.div`
  height: 1px;
  background: #f5f5f5;
  margin: 30px 0 20px;
`;

const TableWrapper = styled.div`
  border: 1px solid #eee;
  border-radius: var(--borderRadius);
  overflow-x: auto;
`;

const StyledTable = styled.div`
  display: grid;
  /* Адаптивна сітка під кількість колонок */
  grid-template-columns: ${(props) =>
    props.cols === 4 ? "250px repeat(3, 1fr)" : "250px repeat(4, 1fr)"};
  min-width: 850px;

  & > div {
    padding: 10px;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-cell {
    background: var(--mainBackground);
    font-weight: bold;
    color: var(--thirdColor);
    border-bottom: 2px solid #eee;
  }

  .group-label {
    grid-column: 1 / -1;
    background: #fdfdfd;
    font-weight: bold;
    justify-content: flex-start;
    padding-left: 15px;
    color: var(--secondaryColor);
    letter-spacing: 1px;
    border-top: 1px solid #eee;
  }

  .row-title {
    justify-content: flex-start;
    padding-left: 20px;
    font-weight: 500;
    color: var(--thirdColor);
  }

  .price-cell {
    font-weight: 500;
    justify-content: center;
  }

  .row-title:hover ~ .price-cell,
  .price-cell:hover {
    background-color: #fff9f9;
  }
`;

const Note = styled.span`
  display: block;
  color: var(--textColor);
  margin-top: 15px;
  font-style: italic;
  font-size: 0.9rem;
`;
