"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Navigation from "@/components/navigation";
import StyledComponentsRegistry from "@/lib/registry";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import Image from "@/components/image";
import styled from "styled-components";
import LocalBusiness from "@/components/json-ld/localbusiness";
import Link from "next/link";

const PageLayout = ({ locale, messages, children }) => {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      defaultTranslationValues={{
        bold: (chunks) => <strong>{chunks}</strong>,
        p: (chunks) => <p>{chunks}</p>,
        h1: (chunks) => <h1>{chunks}</h1>,
        h2: (chunks) => <h2>{chunks}</h2>,
        h3: (chunks) => <h3>{chunks}</h3>,
        ul: (chunks) => <ul>{chunks}</ul>,
        ol: (chunks) => <ol>{chunks}</ol>,
        li: (chunks) => <li>{chunks}</li>,
        images: (chunks) => <Images>{chunks}</Images>,
        image: (chunks) => (
          <ImageWrapper>
            <Image src={`${chunks}`} fill alt="" />
          </ImageWrapper>
        ),
        linkSilkBCards: (chunks) => (
          <Link href={`/${locale}/product/silk-business-cards/`}>{chunks}</Link>
        ),
        linkKashiBCards: (chunks) => (
          <Link href={`/${locale}/product/kashi-business-cards/`}>
            {chunks}
          </Link>
        ),
        linkStampBCards: (chunks) => (
          <Link href={`/${locale}/product/stamping-business-cards/`}>
            {chunks}
          </Link>
        ),
        linkDebossBCards: (chunks) => (
          <Link href={`/${locale}/product/deboss-business-cards/`}>
            {chunks}
          </Link>
        ),
        linkEmbossBCards: (chunks) => (
          <Link href={`/${locale}/product/emboss-business-cards/`}>
            {chunks}
          </Link>
        ),
        linkPlasticBCards: (chunks) => (
          <Link href={`/${locale}/product/plastic-business-cards/`}>
            {chunks}
          </Link>
        ),
        linkSilkPrint: (chunks) => (
          <Link href={`/${locale}/services/silk-screen-printing/`}>
            {chunks}
          </Link>
        ),
        linkDigPrint: (chunks) => (
          <Link href={`/${locale}/services/digital-printing/`}>{chunks}</Link>
        ),
        linkLamination: (chunks) => (
          <Link href={`/${locale}/services/lamination/`}>{chunks}</Link>
        ),
        linkStamp: (chunks) => (
          <Link href={`/${locale}/services/foil-stamping/`}>{chunks}</Link>
        ),
        linkKashi: (chunks) => (
          <Link href={`/${locale}/services/kashi/`}>{chunks}</Link>
        ),
        value: "Not found translation",
      }}
    >
      <StyledComponentsRegistry>
        <LocalBusiness locale={locale} />
        <Header />
        <Navigation />
        {children}
        <Footer />
      </StyledComponentsRegistry>
    </NextIntlClientProvider>
  );
};

export default PageLayout;

const Images = styled.div`
  margin: 24px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  box-sizing: border-box;
  width: 100%;
  gap: 36px;
  @media screen and (max-width: 1366px) {
    gap: 24px;
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;
const ImageWrapper = styled.div`
  aspect-ratio: 1;
  display: block;
  position: relative;
  overflow: hidden;
  border-radius: var(--borderRadius);
  img:hover {
    scale: 1.05;
    transition-duration: var(--transitionDuration);
  }
`;
