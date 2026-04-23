"use client";

import {
  getPaperPrice,
  getPrintingPrice,
} from "@/helpers/calculator/functions";
import { useGetExchangeQuery } from "@/lib/store/api/exchangeApi";
import { useGetPriceQuery } from "@/lib/store/api/priceApi";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import styled from "styled-components";

const TIERS = [
  { label: "1-4", count: 1, printMult: 0.5 },
  { label: "5-9", count: 5, printMult: 2.5 },
  { label: "10-49", count: 10, printMult: 5 },
  { label: "50-99", count: 50, printMult: 25 },
  { label: "100-199", count: 100, printMult: 50 },
  { label: "200-499", count: 200, printMult: 100 },
  { label: "500-999", count: 500, printMult: 250 },
  { label: "1000+", count: 1000, printMult: 500 },
];

const TablePriceDigitalPrinting = () => {
  const { data } = useGetPriceQuery();
  const valute = useGetExchangeQuery("EUR")?.data;
  const t = useTranslations("TablePrice");

  const [activeSize, setActiveSize] = useState("A4");
  const [prices, setPrices] = useState(null);

  // Основний розрахунок цін
  useEffect(() => {
    if (!data || !valute || !valute[0]) return;

    try {
      const rate = valute[0].rate;
      const paperPrice = getPaperPrice(0.5, data.PAPER?.["80"] || 0);

      const calc = (tier, sides, type, size) => {
        const baseMult = size === "A3" ? tier.printMult * 2 : tier.printMult;
        const printingData = data.PRINTING?.[type];
        if (!printingData) return "0.00";

        const price =
          (getPrintingPrice(baseMult, sides, printingData) / tier.count +
            paperPrice) *
          rate;
        return isNaN(price) ? "0.00" : price.toFixed(2);
      };

      const newPrices = {};
      ["A4", "A3"].forEach((size) => {
        newPrices[size] = TIERS.map((tier) => ({
          label: tier.label,
          c1: calc(tier, 1, "COLOR", size),
          c2: calc(tier, 2, "COLOR", size),
          g1: calc(tier, 1, "GRAYSCALE", size),
          g2: calc(tier, 2, "GRAYSCALE", size),
        }));
      });
      setPrices(newPrices);
    } catch (error) {
      console.error("Calculation error:", error);
    }
  }, [data, valute]);

  const getMinPrice = () => {
    if (!prices) return "0";
    const allPrices = prices["A4"].map((p) => parseFloat(p.g1));
    return Math.min(...allPrices).toString();
  };

  const formatter = new Intl.NumberFormat("ru", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (!prices) return null;

  // Динамічний об'єкт Schema.org
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PrintingService",
    name: t(`digital-printing.h2_${activeSize}`),
    description: t(`digital-printing.description`),
    provider: {
      "@type": "LocalBusiness",
      name: "Copy Shop",
      address: {
        "@type": "PostalAddress",
        streetAddress: t("adress"),
        addressLocality: "Kyiv",
        addressCountry: "UA",
      },
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: getMinPrice(),
      priceCurrency: "UAH",
      offerCount: TIERS.length * 4,
    },
  };

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Tabs>
        <Tab active={activeSize === "A4"} onClick={() => setActiveSize("A4")}>
          Формат A4
        </Tab>
        <Tab active={activeSize === "A3"} onClick={() => setActiveSize("A3")}>
          Формат A3
        </Tab>
      </Tabs>

      <TableCard>
        <SectionHeader>
          <h2>{t(`digital-printing.h2_${activeSize}`)}</h2>
        </SectionHeader>

        <TableWrapper>
          <StyledTable>
            <div className="header-cell">Тираж</div>
            {TIERS.map((t) => (
              <div key={t.label} className="header-cell">
                {t.label}
              </div>
            ))}

            <div className="group-label" colSpan={9}>
              {t("digital-printing.color")}
            </div>
            <div className="row-title">{t("digital-printing.h3_1sided")}</div>
            {prices[activeSize].map((p, i) => (
              <div key={i} className="price-cell">
                {formatter.format(p.c1)}
              </div>
            ))}
            <div className="row-title">{t("digital-printing.h3_2sided")}</div>
            {prices[activeSize].map((p, i) => (
              <div key={i} className="price-cell">
                {formatter.format(p.c2)}
              </div>
            ))}

            <div className="group-label" colSpan={9}>
              {t("digital-printing.grayscale")}
            </div>
            <div className="row-title">{t("digital-printing.h3_1sided")}</div>
            {prices[activeSize].map((p, i) => (
              <div key={i} className="price-cell">
                {formatter.format(p.g1)}
              </div>
            ))}
            <div className="row-title">{t("digital-printing.h3_2sided")}</div>
            {prices[activeSize].map((p, i) => (
              <div key={i} className="price-cell">
                {formatter.format(p.g2)}
              </div>
            ))}
          </StyledTable>
        </TableWrapper>

        <Note>{t("digital-printing.span")}</Note>
      </TableCard>
    </Container>
  );
};

export default TablePriceDigitalPrinting;

const Container = styled.div`
  margin: 40px 0;
  width: 100%;
`;
const Tabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: -1px;
`;
const Tab = styled.button`
  padding: 12px 25px;
  border: 1px solid transparent;
  border-radius: var(--borderRadius) var(--borderRadius) 0 0;
  cursor: pointer;
  background: ${(props) => (props.active ? "white" : "rgba(0,0,0,0.03)")};
  color: ${(props) =>
    props.active ? "var(--secondaryColor)" : "var(--thirdColor)"};
  box-shadow: ${(props) =>
    props.active ? "0px -2px 5px rgba(0,0,0,0.05)" : "none"};
  font-weight: bold;
  transition: all var(--transitionDuration);
  ${(props) =>
    props.active && `border: 1px solid #eee; border-bottom-color: white;`}
  &:hover {
    color: var(--secondaryColor);
    background: white;
  }
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
const TableWrapper = styled.div`
  border: 1px solid #eee;
  border-radius: var(--borderRadius);
  overflow-x: auto;
`;
const StyledTable = styled.div`
  display: grid;
  grid-template-columns: 180px repeat(8, 1fr);
  min-width: 900px;
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
`;
