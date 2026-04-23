"use client";

import { useTranslations } from "next-intl";
import Image from "@/components/image";
import styled from "styled-components";

const Locations = () => {
  const locations = useTranslations("Locations");
  const list = ["amosova"];

  return (
    <>
      {list.map((item) => (
        <Location key={item}>
          <ImageWrapper>
            <Image
              src="/icons/location"
              width={16}
              height={23}
              alt="Location Icon"
              quality={100}
            />
          </ImageWrapper>
          <Address>{locations(`${item}.address`)}</Address>
          <Description>{locations(`${item}.description`)}</Description>
        </Location>
      ))}
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
