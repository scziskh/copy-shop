"use client";

import Container from "@/layouts/container";
import Image from "@/components/image";
import TextSection from "./text.section";
import Button from "@/form/button";
import Feedback from "../sidebar/feedback";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import FileComponent from "../file";
import BreadCrumbs from "../breadcrumbs";

const SpecialSection = ({ params }) => {
  const router = useRouter();
  const { slug } = params;
  const t = useTranslations("Specials");
  const locale = useLocale();

  const [isShowFeedback, setIsShowFeedback] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return <></>;
  }

  return (
    <>
      <Wrapper>
        <Container>
          <BreadCrumbs
            path={
              [
                {name: t("name"), link: `/specials`},
                {name: t(`${slug}.h2`), link: `/specials/${slug}`},
              ]
            }
          />
          <h1>{t(`${slug}.h2`)}</h1>
          <ImageContainer>
            <Image
              src={`${t(`${slug}.image`)}`}
              width={1920}
              height={978}
              alt=""
            />
          </ImageContainer>
          <TextSection text={`Specials.${slug}`} />
          {t(`${slug}.fileLink`) ? (
            <FileComponent
              name={t(`${slug}.fileName`)}
              href={t(`${slug}.fileLink`)}
            />
          ) : (
            ""
          )}
          <Button
            handler={() => {
              switch (slug) {
                case "diploms":
                  return router.push(`/${locale}/product/diploms`);
                default:
                  return setIsShowFeedback(!isShowFeedback);
              }
            }}
          >
            {t(`${slug}.insideButton`)}
          </Button>
        </Container>
      </Wrapper>
      <Feedback
        popUp={() => setIsShowFeedback(!isShowFeedback)}
        display={isShowFeedback}
      />
    </>
  );
};

export default SpecialSection;

const ImageContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 300px;
  img {
    width: 100%;
    height: auto;
    align-self: center;
  }
`;

const Wrapper = styled.div`
  margin: 0 auto 24px;
  h1 {
    display: block;
    margin-bottom: 24px;
  }
  & > div > div {
    margin: 0;
  }
  button {
    margin: 24px 0 48px;
  }
`;
