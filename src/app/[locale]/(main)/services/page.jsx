"use client";

import BreadCrumbs from "@/components/breadcrumbs";
import ServicesSection from "@/components/sections/services.section";
import Container from "@/layouts/container";
import { useTranslations } from "next-intl";
import styled from "styled-components";

const ServicesPage = () => {
  const t = useTranslations("ServicesPage");
  return (<>
    <Container>
      <BreadCrumbs 
        path={
          [
            {name: t("header"), link: `services`},
          ]
        }
      />
    </Container>
    <Wrapper>
      <ServicesSection />
    </Wrapper></>
  );
};

export default ServicesPage;

const Wrapper = styled.div`
  margin-top: -48px;
  & > section {
    &:nth-child(2n) {
      background: var(--mainBackground);
      box-shadow: var(--boxShadow);
      & > article > div {
        flex-direction: row-reverse;
      }
    }
  }
`;
