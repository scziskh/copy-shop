"use client";

import { styled } from "styled-components";
import MiniProduct from "../product/mini.product";
import { useTranslations } from "next-intl";
import config from "../../config";
import { notFound } from "next/navigation";

const CategorizedProductsSection = (props) => {
  const { category } = props;
  const { categorizedProducts, productsList } = config.products;
  const list = category ? categorizedProducts[category] : productsList;

  const t = useTranslations("Products");

  if (!list) {
    return notFound();
  }

  return (
    <Wrapper>
      <Products>
        {list.map((item) => (
          <MiniProduct
            key={`miniProduct-${item}`}
            img={item}
            button={t("button")}
            name={t(`${item}.name`)}
            description={t(`${item}.description`)}
            href={t(`${item}.link`)}
          />
        ))}
      </Products>
    </Wrapper>
  );
};

export default CategorizedProductsSection;

const Wrapper = styled.section``;

const Products = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 24px;
  & > div {
    width: calc(100% / 3 - 16px);
    @media screen and (max-width: 1280px) {
      width: calc(50% - 12px);
    }
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;
