"use client";

import BreadCrumbs from "@/components/breadcrumbs";
import Container from "@/layouts/container";
import { useTranslations } from "next-intl";

const { default: TextSection } = require("@/components/sections/text.section");

const AboutUs = () => {
  const text = "AboutUs";
  const t = useTranslations(text);
  return (
    <Container>
      <BreadCrumbs path={[{ name: t("name"), link: `/about-us` }]} />
      <TextSection text={text} />
    </Container>
  );
};

export default AboutUs;
