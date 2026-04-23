"use client";

import Container from "@/layouts/container";
import { styled } from "styled-components";
import Locations from "./locations";
import Schedule from "./schedule";
import Contacts from "./contacts";

const AddressSection = () => {
  return (
    <Wrapper>
      <Container>
        <Locations />
        <Contacts />
      </Container>
    </Wrapper>
  );
};

export default AddressSection;

const Wrapper = styled.section`
  display: flex;
  width: 100%;
  padding: 12px 0;
  z-index: 10;
  background: var(--mainBackground);
  box-shadow: var(--boxShadow);
  height: auto;
  & > div {
    display: grid;
    grid-template-columns: 1.25fr repeat(3, 1fr);
    gap: 24px;
    flex-wrap: wrap;
    @media screen and (max-width: 1366px) {
      grid-template-columns: 1.25fr 1fr;
      justify-items: start;
    }
    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
      justify-items: center;
    }
  }
`;
