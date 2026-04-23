"use client";

import Image from "@/components/image";
import styled from "styled-components";

const Stickers = (props) => {
  return (
    <>
      <Wrapper $params={props.params}>
        <Logo>
          <Image fill={true} src={"/assets/logo"} alt={"Copy Shop"}></Image>
        </Logo>
      </Wrapper>
    </>
  );
};
export default Stickers;

const Wrapper = styled.div`
  filter: ${({ $params }) =>
    $params?.PRINTING === "GRAYSCALE" ? "grayscale(100%)" : "grayscale(0)"};
  border-radius: ${({ $params }) => ($params?.FORM === "ROUND" ? "100%" : "0")};
  display: block;
  flex-wrap: wrap;
  width: 50%;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  padding: 24px;
  box-shadow: var(--boxShadow);
  color: white;
  text-shadow: var(--textShadow);
  align-content: center;
`;

const Logo = styled.div`
  margin: auto;
  display: block;
  height: 100%;
  max-height: 119px;
  aspect-ratio: calc(178 / 119);
  img {
    width: 100%;
  }
`;
