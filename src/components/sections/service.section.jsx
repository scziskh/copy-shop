"use client";

import Container from "@/layouts/container";
import PaymentDeliveryInfo from "../payment-delivery-info";
import FeedbackForm from "../forms/feedback-form";
import styled from "styled-components";
import BreadCrumbs from "../breadcrumbs";
import { useTranslations } from "next-intl";

const ServiceSection = (props) => {
  const {slug, children} = props;
  const t = useTranslations("ServicesPage")

  return (
    <>
      <Container>
        <BreadCrumbs 
          path={
            [
              {name: t("header"), link: `/services/`},
              {name: t(`${slug}.header`), link: `/services/${slug}/`}
            ]
          }
        />
        {children}
      </Container>
      <PaymentDeliveryInfo />
      <Container>
        <Wrapper>
          <FeedbackForm />
        </Wrapper>
      </Container>
    </>
  );
};

export default ServiceSection;

const Wrapper = styled.div`
  margin: 48px 0;
`;
