"use client";

import { styled } from "styled-components";
import Slider from "../slider";
import { useTranslations } from "next-intl";
import config from "@/config";

const SliderSection = () => {
  const t = useTranslations("Specials");
  const { specials } = config;
  const slides = specials.map((element) => {
    return {
      h2: t(`${element}.h2`),
      h3: t(`${element}.h3`),
      button: t(`${element}.button`),
      p: t(`${element}.p`),
      link: t(`${element}.link`),
      image: t(`${element}.image`),
    };
  });

  return (
    <Wrapper>
      <Slider slides={slides} />
    </Wrapper>
  );
};

export default SliderSection;

const Wrapper = styled.section`
  color: white;
  overflow: hidden;
  width: 100%;
  height: calc(100vh - 255px);
  min-height: 480px;
  z-index: -1;
  text-shadow: var(--textShadow);
  a {
    color: white;
  }
  @media screen and (max-width: 1024px) {
    height: calc(100vh - 150px);
  }
`;
