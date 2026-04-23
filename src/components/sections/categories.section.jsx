"use client";

import styled from "styled-components";
import config from "../../config";
import WideButtonLink from "../button-link/wide";
import { useTranslations } from "next-intl";

const CategoriesSection = (props) => {
  const { category } = props;
  const { categoriesList } = config.products;
  const tCategories = useTranslations("Navigation");

  return (
    <Wrapper>
      {/* <WideButtonLink
        link={{ href: "/categories", name: tCategories("all") }}
        active={!category}
      /> */}
      {categoriesList.map((el) => (
        <WideButtonLink
          key={`list-category-${el}`}
          link={{ href: `/categories/${el}`, name: tCategories(el) }}
          active={category === el}
        />
      ))}
    </Wrapper>
  );
};

export default CategoriesSection;

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-content: flex-start;
`;
