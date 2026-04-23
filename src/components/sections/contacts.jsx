"use client";

import { useTranslations } from "next-intl";
import Image from "@/components/image";
import styled from "styled-components";
import { getFormattedPhone } from "@/helpers/formatters";

const Locations = () => {
  const feedback = useTranslations("Feedback");
  const t = useTranslations("Schedule");

  return (
    <>
      <Location>
        <ImageWrapper>
          <Image
            src="icons/email"
            width={20}
            height={15}
            alt="Location Icon"
            quality={100}
          />
        </ImageWrapper>
        <Address>{feedback(`email.desc`)}</Address>
        <Description>{feedback(`email.contact`)}</Description>
      </Location>
      <Location>
        <ImageWrapper>
          <Image
            src="icons/phone"
            width={15}
            height={15}
            alt="Location Icon"
            quality={100}
          />
        </ImageWrapper>
        <Address>{getFormattedPhone(feedback(`phone.contact`))}</Address>
        <Description>
          {getFormattedPhone(feedback(`phone.secondary`))}
        </Description>
      </Location>
      <Location>
        <ImageWrapper>
          <Image
            src="icons/schedule"
            width={18}
            height={18}
            alt="Location Icon"
            quality={100}
          />
        </ImageWrapper>
        <Address>{t(`days`)}</Address>
        <Description>{t(`hours`)}</Description>
      </Location>
    </>
  );
};

const Location = styled.div`
  display: grid;
  grid-template-columns: 42px 1fr;
  line-height: 25px;
`;

const ImageWrapper = styled.div`
  align-content: center;
  grid-column-start: 1;
  grid-row-start: 1;
  grid-row-end: 3;
  img {
    display: block;
  }
`;
const Address = styled.div`
  font-weight: 600;
`;

const Description = styled.div`
  font-weight: 500;
`;

export default Locations;
