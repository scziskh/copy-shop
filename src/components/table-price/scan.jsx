"use client";

import { getScanPrice } from "@/helpers/calculator/functions";
import { useGetExchangeQuery } from "@/lib/store/api/exchangeApi";
import { useGetPriceQuery } from "@/lib/store/api/priceApi";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import styled from "styled-components";

const TIERS = [
  { label: "1-4", count: 1 },
  { label: "5-9", count: 5 },
  { label: "10-49", count: 10 },
  { label: "50-99", count: 50 },
  { label: "100-199", count: 100 },
  { label: "200-499", count: 200 },
  { label: "500+", count: 500 },
];

const TablePriceScan = () => {
  const { data } = useGetPriceQuery();
  const valute = useGetExchangeQuery("EUR")?.data;
  const t = useTranslations("TablePrice");

  const [prices, setPrices] = useState(null);

  useEffect(() => {
    if (!data || !valute || !valute[0]) return;

    try {
      const rate = valute[0].rate;

      const calc = (tier, size) => {
        const scanData = data.SCAN?.AUTO?.[size];
        if (!scanData) return "0.00";

        const price =
          (getScanPrice(tier.count, 1, scanData) / tier.count) * rate;
        return isNaN(price) ? "0.00" : price.toFixed(2);
      };

      const newPrices = {};
      ["A4", "A3"].forEach((size) => {
        newPrices[size] = TIERS.map((tier) => ({
          label: tier.label,
          val: calc(tier, size),
        }));
      });
      setPrices(newPrices);
    } catch (error) {
      console.error("Scan calculation error:", error);
    }
  }, [data, valute]);

  const formatter = new Intl.NumberFormat("ru", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (!prices || !data || !valute) return null;

  const rate = valute[0].rate;

  return (
    <Container>
      <TableCard>
        <SectionHeader>
          <h2>{t("scan.h2")}</h2>
        </SectionHeader>

        {/* СЕКЦІЯ А4 */}
        <SubTitle>{t("scan.h3_letter")} (A4, А3)</SubTitle>
        <TableWrapper>
          <StyledTable cols={8}>
            <div className="header-cell">Тираж</div>
            {TIERS.map((tier) => (
              <div key={tier.label} className="header-cell">
                {tier.label}
              </div>
            ))}
            <div className="row-title">{t("scan.A4")}</div>
            {prices["A4"].map((p, i) => (
              <div key={i} className="price-cell">
                {formatter.format(p.val)}
              </div>
            ))}
            <div className="row-title">{t("scan.A3")}</div>
            {prices["A3"].map((p, i) => (
              <div key={i} className="price-cell">
                {formatter.format(p.val)}
              </div>
            ))}
          </StyledTable>
        </TableWrapper>
        <Note>{t("scan.span")}</Note>

        <PriceDivider />

        {/* ШИРОКОФОРМАТНЕ СКАНУВАННЯ */}
        <SubTitle>{t("scan.h3_drawings")} (A2 - A0+)</SubTitle>
        <TableWrapper>
          <StyledTable cols={5}>
            <div className="header-cell">Формат</div>
            <div className="header-cell">A2</div>
            <div className="header-cell">A1</div>
            <div className="header-cell">A0</div>
            <div className="header-cell">A0+ (м²)</div>

            <div className="row-title">{t("scan.wide_type_1")}</div>
            <div className="price-cell">
              {formatter.format(data.SCAN.WIDE_TYPE_1.A2 * rate)}
            </div>
            <div className="price-cell">
              {formatter.format(data.SCAN.WIDE_TYPE_1.A1 * rate)}
            </div>
            <div className="price-cell">
              {formatter.format(data.SCAN.WIDE_TYPE_1.A0 * rate)}
            </div>
            <div className="price-cell">
              {formatter.format(data.SCAN.WIDE_TYPE_1.LARGE * rate)}
            </div>

            <div className="row-title">{t("scan.wide_type_2")}</div>
            <div className="price-cell">
              {formatter.format(data.SCAN.WIDE_TYPE_2.A2 * rate)}
            </div>
            <div className="price-cell">
              {formatter.format(data.SCAN.WIDE_TYPE_2.A1 * rate)}
            </div>
            <div className="price-cell">
              {formatter.format(data.SCAN.WIDE_TYPE_2.A0 * rate)}
            </div>
            <div className="price-cell">
              {formatter.format(data.SCAN.WIDE_TYPE_2.LARGE * rate)}
            </div>
          </StyledTable>
        </TableWrapper>
        <Note>{t("scan.span_2")}</Note>
      </TableCard>
    </Container>
  );
};

export default TablePriceScan;

// --- СТИЛІ (БЕЗ ТАБІВ) ---
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
  }
`;

const SubTitle = styled.h3`
  font-size: 1.1rem;
  margin: 15px 0 10px;
  color: var(--thirdColor);
`;

const PriceDivider = styled.div`
  height: 1px;
  background: #eee;
  margin: 30px 0 20px;
`;

const TableWrapper = styled.div`
  border: 1px solid #eee;
  border-radius: var(--borderRadius);
  overflow-x: auto;
`;

const StyledTable = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.cols === 5 ? "250px repeat(4, 1fr)" : "180px repeat(7, 1fr)"};
  min-width: 800px;
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
  margin-top: 10px;
  font-size: 0.85rem;
  font-style: italic;
`;
