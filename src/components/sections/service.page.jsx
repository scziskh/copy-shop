"use client";

import Container from "@/layouts/container";
import TextSection from "./text.section";
import PaymentDeliveryInfo from "../payment-delivery-info";
import FeedbackForm from "../forms/feedback-form";
import styled from "styled-components";
import BreadCrumbs from "../breadcrumbs";
import { useTranslations } from "next-intl";

const SingleServiceSection = ({ service }) => {
  const t = useTranslations("ServicesPage");

  return (
    <>
      <Container>
        <BreadCrumbs
          path={[
            { name: t("header"), link: `/services/` },
            { name: t(`${service}.header`), link: `/services/${service}/` },
          ]}
        />
        <TextSection text={`ServicesPage.${service}`} />
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

export default SingleServiceSection;

const Wrapper = styled.div`
  margin: 48px 0;
`;
