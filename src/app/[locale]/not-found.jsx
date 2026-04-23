"use client";

import { useTranslations } from "next-intl";
import { styled } from "styled-components";

const NotFoundPage = () => {
  const t = useTranslations("NotFoundPage");

  return (
    <Wrapper>
      <div>
        <H1>404</H1>
        <Description>
          <H2>{t("title")}</H2>
        </Description>
      </div>
    </Wrapper>
  );
};

export default NotFoundPage;

const Wrapper = styled.div`
  line-height: 64px;
  background-color: #fff;
  top: 0;
  position: fixed;
  width: 100%;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const H1 = styled.h1`
  display: inline-block;
  margin: 0px 20px 0px 0px;
  padding-right: 23px;
  font-size: 24px;
  font-weight: 500;
  vertical-align: top;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
`;

const H2 = styled.h2`
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
`;

const Description = styled.div`
  display: inline-block;
`;
