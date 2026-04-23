"use client";

import { useTranslations } from "next-intl";
import Image from "@/components/image";
import styled from "styled-components";

const Certificates = (props) => {
  const t = useTranslations("Preview");
  const tFeedback = useTranslations("Feedback");
  const tLocations = useTranslations("Locations");
  return (
    <>
      <SingleSheetFirstSide $params={props.params}>
        {props.params?.SIDES === "2" && (
          <Logo>
            <Image
              width={500}
              height={250}
              src={"/assets/logo"}
              alt={"Copy Shop"}
            ></Image>
          </Logo>
        )}
      </SingleSheetFirstSide>
      <SingleSheetSecondSide $params={props.params}>
        <Logo>
          <Image width={500} height={250} src={"/assets/logo"} alt={""}></Image>
        </Logo>
        <Text>
          <article>
            <h2>{t(`certificates.h2`)}</h2>
            <p>{t(`certificates.p1`)}</p>
          </article>
          <div>
            <p>{tFeedback("phone.contact")}</p>
            <p>{tFeedback("email.contact")}</p>
            <p>{tLocations("darnytsia.address")}</p>
          </div>
        </Text>
      </SingleSheetSecondSide>
    </>
  );
};
export default Certificates;

const SingleSheetFirstSide = styled.div`
  width: 40%;
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
    background: var(--thirdColor);
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
  display: flex;
  flex-wrap: wrap;
  width: 40%;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  padding: 24px;
  box-shadow: var(--boxShadow);
  justify-content: center;
  text-align: center;
  background-image: url("https://res.cloudinary.com/dllc7tavb/image/upload/v1719331250/assets/sigle-sheet-bg.png") !important;
  color: white;
  text-shadow: var(--textShadow);
`;

const Logo = styled.div`
  display: flex;
  position: relative;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 140px;
  height: 140px;
  aspect-ratio: 1 !important;
  background: var(--thirdColor);
  img {
    width: 70%;
    height: 46%;
  }
`;

const Text = styled.div`
  width: 100%;
  height: calc(100% - 160px);
  display: grid;
  & > div {
    align-self: end;
  }
  & > article {
    align-self: center;
    text-transform: uppercase;
  }
`;
