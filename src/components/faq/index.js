"use client";

import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Head from "next/head";
import Container from "@/layouts/container";
import { useTranslations } from "next-intl";

export default function Faq({ rawItems, product }) {
  const tFaq = useTranslations("FAQ");
  const title = tFaq(`${product}.header`);

  const items = rawItems.map((_, key) => [
    tFaq.rich(`${product}.questions.${key}.0`),
    tFaq.rich(`${product}.questions.${key}.1`),
  ]);

  const schemaData = useMemo(() => {
    if (!rawItems || !Array.isArray(rawItems) || rawItems.length === 0)
      return null;

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      name: title || "Запитання та відповіді",
      mainEntity: rawItems
        .filter((item) => item && item[0] && item[1])
        .map((item) => ({
          "@type": "Question",
          name: String(item[0])
            .replace(/<[^>]*>?/gm, "")
            .trim(),
          acceptedAnswer: {
            "@type": "Answer",
            text: String(item[1])
              .replace(/<[^>]*>?/gm, "")
              .trim(),
          },
        })),
    };
  }, [title, rawItems]);

  if (!rawItems || !Array.isArray(rawItems)) return null;

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
          key="faq-jsonld"
        />
      </Head>

      <Container>
        <Title>{title}</Title>
        <AccordionWrapper>
          {items.map((item, index) => (
            <FaqItem key={index} question={item[0]} answer={item[1]} />
          ))}
        </AccordionWrapper>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  );
}

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Item $isOpen={isOpen}>
      <Question $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <Icon $isOpen={isOpen} />
      </Question>
      <AnswerWrapper $isOpen={isOpen}>
        <AnswerContent $isOpen={isOpen}>{answer}</AnswerContent>
      </AnswerWrapper>
    </Item>
  );
};

const Title = styled.h2`
  margin: 24px 0;
`;

const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.div`
  background: #ffffff;
  border: 1px solid
    ${(props) => (props.$isOpen ? "var(--thirdColor)" : "#eaeaea")};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: ${(props) => (props.$isOpen ? "var(--boxShadow)" : "none")};

  &:hover {
    border-color: var(--thirdColor);
  }
`;

const Question = styled.button`
  width: 100%;
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  outline: none;

  span {
    font-size: 1.1rem;
    font-weight: 600;
    transition: color 0.3s ease;
  }
`;

const Icon = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(135deg)" : "rotate(0)")};

  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: ${(props) =>
      props.$isOpen ? "var(--secondaryColor)" : "var(--thirdColor)"};
    transition: background-color 0.3s ease;
  }

  &::before {
    top: 9px;
    left: 0;
    width: 100%;
    height: 2px;
  }

  &::after {
    top: 0;
    left: 9px;
    width: 2px;
    height: 100%;
  }
`;

const AnswerWrapper = styled.div`
  max-height: ${(props) => (props.$isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition:
    max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    padding 0.3s ease;
`;

const AnswerContent = styled.div`
  padding: 0 25px 25px 25px;
  color: var(--textColor);
  line-height: 1.6;
  font-size: 1rem;
  border-top: ${(props) => (props.$isOpen ? "1px solid #f0f0f0" : "none")};
  padding-top: ${(props) => (props.$isOpen ? "15px" : "0")};
  ul {
    padding-left: 24px;
  }
`;
