"use client";

import styled from "styled-components";

const { useTranslations } = require("next-intl");

const Schedule = () => {
  const t = useTranslations("Schedule");
  return (
    <Wrapper>
      <Days>{t(`days`)}</Days>
      <Hours>{t(`hours`)}</Hours>
    </Wrapper>
  );
};

const Days = styled.div`
  font-weight: 600;
`;

const Wrapper = styled.div`
  line-height: 25px;
  @media screen and (max-width: 1280px) {
    display: none;
  }
`;
const Hours = styled.div`
  font-weight: 500;
`;

export default Schedule;
