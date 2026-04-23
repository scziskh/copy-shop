"use client";

import config from "@/config";
import Service from "../service";
import styled from "styled-components";

const ServicesSection = () => {
  const { servicesList } = config.products;
  return servicesList?.map((service) => (
    <Wrapper key={service}>
      <Service service={service} />
    </Wrapper>
  ));
};

export default ServicesSection;

const Wrapper = styled.section`
    padding: 48px 0;`;
