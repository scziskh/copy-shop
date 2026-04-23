"use client";

import Container from "@/layouts/container";
import CalculatorForm from "../forms/calculator-form";
import ProductSection from "./product.section";
import FeedbackSection from "./feedback.section";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import config from "@/config";
import { useEffect } from "react";
import Faq from "../faq";

const SimpleProductSection = ({ params, images }) => {
  useEffect(() => window.scroll(0, 0));

  const product = params.slug;
  const t = useTranslations("ProductPage");
  const tFaq = useTranslations("FAQ");
  const calculatorConfig = config.calculator[product];
  const rawItems = tFaq.raw(`${product}.questions`);

  const faq = tFaq(`${product}.header`) !== `FAQ.${product}.header` && (
    <Faq
      title={tFaq(`${product}.header`)}
      rawItems={rawItems}
      product={product}
    />
  );

  return (
    <Wrapper>
      <ProductSection
        product={product}
        t={t}
        imageList={images[product]}
        calculator={!!calculatorConfig}
      />
      {!!calculatorConfig && (
        <CalculatorForm config={calculatorConfig} product={product} />
      )}
      {faq}
      <Container>
        <div className="padding-24">
          <FeedbackSection />
        </div>
      </Container>
    </Wrapper>
  );
};

export default SimpleProductSection;

const Wrapper = styled.div`
  white-space: pre-wrap;
`;
