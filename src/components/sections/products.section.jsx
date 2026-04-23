"use client";

import { styled } from "styled-components";
import MiniProduct from "../product/mini.product";
import Container from "@/layouts/container";
import { useTranslations } from "next-intl";
import { getChunkedArray } from "@/helpers/formatters";
import Switch from "../switch";
import { useState } from "react";
import config from "../../config";

const ProductsSection = () => {
  const [id, setId] = useState(0);

  const t = useTranslations("Products");
  const { productsList } = config.products;

  const lists = getChunkedArray(productsList, 8);

  const switcher = lists.map((_, index) => {
    const active = index === id;

    return (
      <Switch
        key={`Switch-${index}`}
        onClick={() => setId(index)}
        active={active}
      />
    );
  });

  return (
    <Wrapper>
      <Container>
        <h2>{t("h2")}</h2>
        <Products>
          {lists[id].map((item) => (
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
        <SwitcherWrapper>{switcher}</SwitcherWrapper>
      </Container>
    </Wrapper>
  );
};

export default ProductsSection;

const Wrapper = styled.section`
  padding: 32px 0;
  h2 {
    text-align: center;
    font-size: 32px;
    line-height: 48px;
  }
`;

const Products = styled.div`
  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: 24px;
  margin: 32px 0;
  align-items: stretch;

  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }
`;

const SwitcherWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
