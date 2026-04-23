"use client";

import ServiceSection from "@/components/sections/service.section";
import TablePriceDigitalPrinting from "@/components/table-price/digital-printing";
import { useTranslations } from "next-intl";
import React from "react";
import styled from "styled-components";

const ServicePage = () => {
  const slug = "cutting";
  const t = useTranslations(`ServicesPage`);
  const tTable = useTranslations(`TablePrice`);
  const countRows = [1, 2, 3, 4, 5, 6, 7];

  return (
    <ServiceSection slug={slug}>
      <Wrapper>
        {t.rich("cutting.section-1")}
        <h2>{tTable(`${slug}.h2`)}</h2>
        <TableWrapper>
          <Table>
            <div>
              <h3>{tTable(`${slug}.row_0.name`)}</h3>
            </div>
            <div>
              <h3>{tTable(`${slug}.row_0.col_1`)}</h3>
            </div>
            <div>
              <h3>{tTable(`${slug}.row_0.col_2`)}</h3>
            </div>
          </Table>
          {countRows.map((index) => (
            <Table key={index}>
              <div>
                <h3>{tTable(`${slug}.row_${index}.name`)}</h3>
              </div>
              <div>
                <p>{tTable(`${slug}.row_${index}.col_1`)}</p>
              </div>
              <div>
                <p>{tTable(`${slug}.row_${index}.col_2`)}</p>
              </div>
            </Table>
          ))}
        </TableWrapper>

        {t.rich("cutting.section-2")}
      </Wrapper>
    </ServiceSection>
  );
};

export default ServicePage;

const Wrapper = styled.section`
  margin: 0 0 48px;
  h1 {
    padding-bottom: 8px;
    font-size: 2em;
    line-height: 42px;
  }
  h2 {
    padding: 12px 0 0px;
  }
  h3 {
    padding: 8px 0 8px;
    font-size: 16px;
  }
  p {
    padding: 8px 0 8px;
  }
  & > ul,
  & > ol {
    margin-left: 24px;
    & > ul,
    & > ol {
      margin-left: 24px;
    }
    li {
      padding: 6px 0;
    }
  }
`;

const TableWrapper = styled.div`
  height: max-content;
  box-shadow: var(--boxShadow);
  border-radius: 5px;
  width: 100%;
  margin-bottom: 6px;
  margin-top: 12px;
  @media screen and (max-width: 768px) {
    overflow-x: scroll;
  }
`;
const Table = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 250px repeat(2, 1fr);
  text-align: center;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  & > div {
    padding: 6px 24px;
    &:nth-child(n) {
      background: var(--mainBackground);
      box-shadow: var(--boxShadow);
      align-content: center;
    }
    &:nth-child(n + 10) {
      background: white;
    }
    margin: 0;
    padding: 6px;
  }
`;
