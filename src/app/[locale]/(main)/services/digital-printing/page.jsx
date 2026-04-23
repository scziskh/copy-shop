"use client";

import Faq from "@/components/faq";
import ServiceSection from "@/components/sections/service.section";
import TablePriceDigitalPrinting from "@/components/table-price/digital-printing";
import { useTranslations } from "next-intl";
import styled from "styled-components";

const DigitalPrintingPage = () => {
  const slug = "digital-printing";
  const t = useTranslations(`ServicesPage`);
  const tFaq = useTranslations(`FAQ`);
  const rawItems = tFaq.raw(`${slug}.questions`);
  const faq = tFaq(`${slug}.header`) !== `FAQ.${slug}.header` && (
    <Faq title={tFaq(`${slug}.header`)} rawItems={rawItems} product={slug} />
  );

  return (
    <ServiceSection slug={slug}>
      <Wrapper>
        {t.rich("digital-printing.section-1")}
        <TablePriceDigitalPrinting />
        {t.rich("digital-printing.section-2")}
        {faq}
      </Wrapper>
    </ServiceSection>
  );
};

export default DigitalPrintingPage;

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
