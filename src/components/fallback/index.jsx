"use client";

import styled from "styled-components";
import Image from "../image";

const Fallback = () => {
  return (
    <Wrapper>
      <Image src="/assets/logo" width={150} height={100} alt="" />
    </Wrapper>
  );
};
export default Fallback;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 80px);
  img {
    animation-duration: 3s;
    animation-name: loading;
    animation-iteration-count: infinite;
  }
`;
