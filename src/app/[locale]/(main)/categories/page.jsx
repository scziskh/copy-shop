"use client";

import AddressSection from "@/components/sections/address.section";
import CategoriesSection from "@/components/sections/categories.section";
import CategorizedProductsSection from "@/components/sections/categorized-products.section";
import FeedbackSection from "@/components/sections/feedback.section";
import Container from "@/layouts/container";
import { styled } from "styled-components";

const Categories = (props) => {
  const { category } = props;
  return (
    <Wrapper>
      <Container>
        <GridContainer>
          <CategoriesSection category={category} />
          <CategorizedProductsSection category={category} />
        </GridContainer>
      </Container>
      <AddressSection />
      <Container>
        <FeedbackSection />
      </Container>
    </Wrapper>
  );
};

export default Categories;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const GridContainer = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: 360px 1fr;
  min-height: calc(100vh - 180px);
  @media screen and (max-width: 1366px) {
    grid-template-columns: 320px 1fr;
  }
  @media screen and (max-width: 1280px) {
    grid-template-columns: 280px 1fr;
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;
