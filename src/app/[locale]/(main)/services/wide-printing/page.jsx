"use client";

import ServiceSection from "@/components/sections/service.section";
import TablePriceWidePrinting from "@/components/table-price/wide-printing";
import { useTranslations } from "next-intl";
import styled from "styled-components";


const WidePrintingPage = () =>{ 
    const slug="wide-printing";
    const t = useTranslations(`ServicesPage`);

    return (
        <ServiceSection slug={slug}>
            <Wrapper>
            {t.rich('wide-printing.section-1')}
                <TablePriceWidePrinting />
                {t.rich('wide-printing.section-2')}
            </Wrapper>
        </ServiceSection>
    );
}

export default WidePrintingPage;

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
}`
