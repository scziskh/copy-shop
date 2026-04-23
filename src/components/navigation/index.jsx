"use client";

import Button from "@/form/button";
import Container from "@/layouts/container";
import { useTranslations } from "next-intl";
import { styled } from "styled-components";
import NavigationMenu from "./menu";
import ButtonLink from "../button-link";
import Burger from "../burger";
import { useEffect, useState } from "react";
import BurgerMenu from "./burger-menu";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const { cartItems } = useSelector((state) => state.cart);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const handlerShowMenu = () => {
    setShowMenu((state) => !state);
  };

  useEffect(() => {
    return setShowMenu(false);
  }, [pathname]);

  return (
    <Wrapper>
      {showMenu ? <BurgerMenu handler={handlerShowMenu} /> : ""}
      <Container>
        <Button
          name={"nav-toggle"}
          title={t("catalog")}
          handler={handlerShowMenu}
        >
          <Burger />
        </Button>
        <NavigationMenu />
        <ButtonLink
          link={{
            href: "/cart",
            name: `${t("cart")} ${
              isClient && cartItems.length ? `(${cartItems.length})` : ""
            }`,
          }}
        />
      </Container>
    </Wrapper>
  );
};

export default Navigation;

const Wrapper = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  height: 80px;
  box-shadow: var(--boxShadow);
  z-index: 99;
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 1024px) {
      & > button {
        height: 42px;
      }
      & a {
        width: 120px;
        height: 42px;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    height: 70px;
  }
`;
