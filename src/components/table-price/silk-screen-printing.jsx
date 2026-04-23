"use client";

import { useGetPriceQuery } from "@/lib/store/api/priceApi";
import { useTranslations } from "next-intl";
import styled from "styled-components";

const COLORS_COUNT = [1, 2, 3, 4, 5, 6];

const TablePriceSilkScreenPrinting = () => {
  const { data } = useGetPriceQuery();
  const t = useTranslations("TablePrice");

  const formatter = new Intl.NumberFormat("ru", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (!data || !data.SILK_SCREEN_PRINTING) return null;

  const silkData = data.SILK_SCREEN_PRINTING;

  // Допоміжна функція для розрахунку вартості за кількістю кольорів
  const calcPrice = (item, count) => {
    if (!item) return 0;
    return item.first + item.second * (count - 1);
  };

  const getMinPrice = () => {
    // Мінімальна ціна - це зазвичай 1 колір на візитках
    return calcPrice(silkData.BUSINESS_CARDS, 1).toString();
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("silk-screen-printing.h2"),
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
    },
  };

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <TableCard>
        <SectionHeader>
          <h2>{t("silk-screen-printing.h2")}</h2>
        </SectionHeader>

        <TableWrapper>
          <StyledTable cols={7}>
            <div className="header-cell">
              {t("silk-screen-printing.colors")}
            </div>
            {COLORS_COUNT.map((n) => (
              <div key={n} className="header-cell">
                {n}
              </div>
            ))}

            <div className="row-title">90 × 50</div>
            {COLORS_COUNT.map((n) => (
              <div key={n} className="price-cell">
                {formatter.format(calcPrice(silkData.BUSINESS_CARDS, n))}
              </div>
            ))}
            <div className="row-title">75 × 150</div>
            {COLORS_COUNT.map((n) => (
              <div key={n} className="price-cell">
                {formatter.format(calcPrice(silkData["75_150"], n))}
              </div>
            ))}

            <div className="row-title">100 × 210</div>
            {COLORS_COUNT.map((n) => (
              <div key={n} className="price-cell">
                {formatter.format(calcPrice(silkData["100_210"], n))}
              </div>
            ))}

            <div className="row-title">150 × 250</div>
            {COLORS_COUNT.map((n) => (
              <div key={n} className="price-cell">
                {formatter.format(calcPrice(silkData["150_250"], n))}
              </div>
            ))}

            <div className="row-title">210 × 300</div>
            {COLORS_COUNT.map((n) => (
              <div key={n} className="price-cell">
                {formatter.format(calcPrice(silkData["210_300"], n))}
              </div>
            ))}
          </StyledTable>
        </TableWrapper>

        {/* СЕКЦІЯ ФОРМАТНОГО ДРУКУ (БЛАНКИ / КОНВЕРТИ) */}
        <TableWrapper>
          <StyledTable cols={7}></StyledTable>
        </TableWrapper>
        <Note>{t("silk-screen-printing.span")}</Note>
      </TableCard>
    </Container>
  );
};

export default TablePriceSilkScreenPrinting;

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
  grid-template-columns: 200px repeat(6, 1fr);
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
