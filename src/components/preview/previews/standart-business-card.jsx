"use client";

import { useTranslations } from "next-intl";
import Image from "@/components/image";
import styled from "styled-components";

const StandartBusinessCards = (props) => {
  const tFeedback = useTranslations("Feedback");
  const tLocations = useTranslations("Locations");
  return (
    <>
      <BCardFirstSide $params={props.params}>
        {props.params?.SIDES === "2" && (
          <Logo>
            <Image
              width="178"
              height="119"
              src={"/assets/logo"}
              alt={"Copy Shop"}
            ></Image>
          </Logo>
        )}
      </BCardFirstSide>
      <BCardSecondSide $params={props.params}>
        <Logo>
          <Image fill={true} src={"/assets/logo"} alt={""}></Image>
        </Logo>
        <Text>
          <div>
            <h2>{tFeedback("managers")}</h2>
          </div>
          <div>{tFeedback("phone.contact")}</div>
          <div>{tFeedback("email.contact")}</div>
          <div>{tLocations("amosova.address")}</div>
        </Text>
      </BCardSecondSide>
    </>
  );
};
export default StandartBusinessCards;

const BCardFirstSide = styled.div`
  width: 55%;
  max-height: 80%;
  min-width: 480px;
  position: absolute;
  display: flex;
  left: 50%;
  top: 40%;
  transform: translate(-35%, -35%);
  padding: 48px;
  box-shadow: var(--boxShadow);
  & > div {
    align-self: center;
  }
`;

const BCardSecondSide = styled.div`
  width: 55%;
  max-height: 80%;
  min-width: 480px;
  position: absolute;
  right: 50%;
  bottom: 70%;
  transform: translate(35%, 35%);
  display: grid;
  grid-template-columns: 150px 2fr;
  padding: 24px 36px;
  box-shadow: var(--boxShadow);
`;

const Logo = styled.div`
  position: relative;
  display: flex;
  aspect-ratio: 1.5;
  width: 100%;
  max-height: 80%;
  justify-content: center;
  align-items: center;
  img {
    display: block;
  }
`;

const Text = styled.div`
  flex-wrap: wrap;
  grid-template-columns: 1fr;
  gap: 0;
  right: 0;
  align-self: end;
  justify-self: right;
  text-align: right;
  h2 {
    color: var(--thirdColor);
    margin-bottom: 10px;
  }
`;
