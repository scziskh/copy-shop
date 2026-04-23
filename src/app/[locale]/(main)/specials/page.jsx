"use client";

import config from "@/config";
import Container from "@/layouts/container";
import { useLocale, useTranslations } from "next-intl";
import Image from "@/components/image";
import Link from "next/link";
import styled from "styled-components";
import BreadCrumbs from "@/components/breadcrumbs";

const SpecialsPage = () => {
  const currentLocale = useLocale();
  const { specials } = config;
  const t = useTranslations("Specials");
  return (
    <Container>
    <BreadCrumbs 
      path={
        [
          {name: t("name"), link: `/specials/`},
        ]
      }
    />
      <Wrapper>
        {specials.map((item) => {
          const path = "/" + currentLocale + t(`${item}.link`);
          return (
            <ImageWrapper key={item}>
              <Link href={path}>
                <Image fill alt={t(`${item}.h2`)} src={t(`${item}.image`)} />
                <Description>
                  <h2>{t(`${item}.h2`)}</h2>
                  <h3>{t(`${item}.h3`)}</h3>
                </Description>
              </Link>
            </ImageWrapper>
          );
        })}
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin: 0 0 48px;
  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`;
const ImageWrapper = styled.div`
  position: relative;
  grid-gap: 24px;
  aspect-ratio: calc(16 / 9);
  object-fit: contain;
  border-radius: var(--borderRadius);
  overflow: hidden;
`;

const Description = styled.div`
  position: absolute;
  top: 50%;
  left: 24px;
  transform: translateY(-50%);
  z-index: 9;
  color: white;
  max-width: calc(50% - 48px);
  padding: 0;
  h2 {
    font-size: 32px;
    line-height: 36px;
  }
  h3 {
    margin-top: 10px;
    line-height: 18px;
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    h2 {
      font-size: 24px;
      line-height: 28px;
    }
    h3 {
      margin-top: 10px;
      line-height: 16px;
      font-size: 14px;
    }
  }
`;

export default SpecialsPage;
