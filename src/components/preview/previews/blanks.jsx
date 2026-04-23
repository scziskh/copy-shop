"use client";

import Image from "@/components/image";
import styled from "styled-components";

const Blanks = (props) => {
  return (
    <>
      <SingleSheetSecondSide $params={props.params}>
        <Logo>
          <Image fill={true} src={"/assets/logo"} alt={"Copy Shop"}></Image>
        </Logo>
      </SingleSheetSecondSide>
    </>
  );
};
export default Blanks;

const SingleSheetSecondSide = styled.div`
  filter: ${({ $params }) =>
    $params?.PRINTING === "GRAYSCALE" ? "grayscale(100%)" : "grayscale(0)"};
  display: flex;
  flex-wrap: wrap;
  width: 40%;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  padding: 24px;
  box-shadow: var(--boxShadow);
  color: white;
  text-shadow: var(--textShadow);
`;

const Logo = styled.div`
  display: flex;
  position: absolute;
  right: 24px;
  width: 30%;
  height: 15%;
  img {
    width: 100%;
  }
`;
