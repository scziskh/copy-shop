"use client";

import Image from "@/components/image";
import styled from "styled-components";

const Flyers = (props) => {
  return (
    <>
      <SingleSheetFirstSide $params={props.params}>
        {props.params?.SIDES === "2" && (
          <Logo>
            <Image
              width={500}
              height={250}
              src={"/assets/logo"}
              alt={""}
            ></Image>
          </Logo>
        )}
      </SingleSheetFirstSide>
      <SingleSheetSecondSide $params={props.params}>
        <Logo>
          <Image
            width={500}
            height={250}
            src={"/assets/logo"}
            alt={"Copy Shop"}
          ></Image>
        </Logo>
      </SingleSheetSecondSide>
    </>
  );
};
export default Flyers;

const SingleSheetFirstSide = styled.div`
  width: ${({ $params }) =>
    $params?.FORMAT === "Eurobooklet_2"
      ? "45%"
      : $params?.FORMAT === "Eurobooklet"
      ? "28%"
      : "40%"};
  position: absolute;
  display: flex;
  left: 50%;
  top: 40%;
  transform: translate(-15%, -40%);
  padding: 48px;
  box-shadow: var(--boxShadow);
  justify-content: center;
  & > div {
    align-self: center;
    background: var(--mainBackground);
  }
  background-image: ${({ $params }) =>
    $params?.SIDES === "1"
      ? ""
      : 'url("https://res.cloudinary.com/dllc7tavb/image/upload/v1719331250/assets/sigle-sheet-bg.png") !important'};
  filter: ${({ $params }) =>
    $params?.PRINTING === "GRAYSCALE" ? "grayscale(100%)" : "grayscale(20%)"};
`;

const SingleSheetSecondSide = styled.div`
  filter: ${({ $params }) =>
    $params?.PRINTING === "GRAYSCALE" ? "grayscale(100%)" : "grayscale(0)"};
  width: ${({ $params }) =>
    $params?.FORMAT === "Eurobooklet_2"
      ? "45%"
      : $params?.FORMAT === "Eurobooklet"
      ? "28%"
      : "40%"};
  position: absolute;
  display: flex;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  padding: 48px;
  box-shadow: var(--boxShadow);
  justify-content: center;
  & > div {
    align-self: center;
    background: var(--thirdColor);
  }
  background-image: url("https://res.cloudinary.com/dllc7tavb/image/upload/v1719331250/assets/sigle-sheet-bg.png") !important;
`;

const Logo = styled.div`
  display: flex;
  position: relative;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 120px;
  height: 120px;
  aspect-ratio: 1 !important;
  img {
    width: 70%;
    height: 46%;
  }
`;
