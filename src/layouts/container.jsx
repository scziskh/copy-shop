/* eslint-disable react/display-name */
"use client";

import React from "react";
import { styled } from "styled-components";

const Container = React.forwardRef((props, ref) => {
  return (
    <Wrapper onScroll={props.onscroll} ref={ref}>
      {props.children}
    </Wrapper>
  );
});

export default Container;

const Wrapper = styled.div`
  width: 1600px;
  margin: auto;
  position: relative;
  @media screen and (max-width: 1680px) {
    width: 1440px;
  }
  @media screen and (max-width: 1536px) {
    width: 1280px;
  }
  @media screen and (max-width: 1366px) {
    width: 1200px;
  }
  @media screen and (max-width: 1280px) {
    width: 960px;
  }
  @media screen and (max-width: 1024px) {
    width: 720px;
  }
  @media screen and (max-width: 768px) {
    width: 95%;
  }
`;
