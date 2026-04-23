"use client";

import { styled } from "styled-components";
import Logo from "../logo";
import Container from "@/layouts/container";
import HeaderMenu from "./menu";
import FeedBack from "./feedback";
import Langs from "./langs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Feedback from "../sidebar/feedback";
import { useWindowSize } from "@/hooks/useWindowSize";
import CallBack from "../sidebar/callback";

const Header = () => {
  const [showCallback, setShowCallback] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const { width } = useWindowSize();
  const mobileWidth = 768;

  const t = useTranslations("Feedback");

  const types = ["phone", "email"];

  const popUpCallback = () => {
    setShowCallback(!showCallback);
    setShowFeedback(false);
  };
  const popUpFeedback = () => {
    setShowFeedback(!showFeedback);
    setShowCallback(false);
  };

  return (
    <>
      <Wrapper>
        <Container>
          <Logo />
          <HeaderMenu />
          <FeedBacks>
            {width > mobileWidth &&
              types.map((type) => (
                <FeedBack
                  key={type}
                  props={{
                    type,
                    contact: t(`${type}.contact`),
                    description: t(`${type}.description`),
                    popUp: type === "phone" ? popUpCallback : popUpFeedback,
                  }}
                />
              ))}
            <Langs />
          </FeedBacks>
        </Container>
      </Wrapper>
      <CallBack popUp={popUpCallback} display={showCallback} />
      <Feedback popUp={popUpFeedback} display={showFeedback} />
    </>
  );
};

export default Header;

const Wrapper = styled.div`
  height: 100px;
  display: flex;
  background: var(--mainBackground);
  background-size: 300% 300%;
  animation: gradient 5s ease infinite;
  transform: translate3d(0, 0, 0);
  @media screen and (max-width: 1024px) {
    height: 80px;
  }
  & > div {
    display: flex;
    justify-content: space-between;
  }
`;

const FeedBacks = styled.div`
  width: auto;
  display: flex;
  gap: 24px;
  justify-content: space-between;
  @media screen and (max-width: 1024px) {
    gap: 12px;
  }
`;

const LeftSide = styled.div`
  display: flex;
  gap: 24px;
`;
