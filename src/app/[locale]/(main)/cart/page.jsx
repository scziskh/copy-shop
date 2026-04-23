"use client";

import BreadCrumbs from "@/components/breadcrumbs";
import Cart from "@/components/cart";
import Container from "@/layouts/container";
import { useTranslations } from "next-intl";
import styled from "styled-components";

const CartPage = () => {
  const t = useTranslations("Navigation");
  return (
    <Wrapper>
      <Container>
        <BreadCrumbs path={[{ name: t("cart"), link: `/cart` }]} />
        <Cart />
      </Container>
    </Wrapper>
  );
};

export default CartPage;

const Wrapper = styled.section`
  width: 100%;
  min-height: calc(100vh - 174px);
  & > div {
    min-height: calc(100vh - 174px);
    padding: 0 0 48px;
    display: flex;
    flex-direction: column;
  }
`;
