"use client";

import BreadCrumbs from "@/components/breadcrumbs";
import TextSection from "@/components/sections/text.section";
import Container from "@/layouts/container";
import { useTranslations } from "next-intl";

const PaymentDeliveryPage = () => {
  const text = "PaymentDelivery";
  const t = useTranslations(text);
  return (
    <Container>
      <BreadCrumbs path={[{ name: t("name"), link: `/payment-delivery` }]} />
      <TextSection text={text} />
    </Container>
  );
};

export default PaymentDeliveryPage;
