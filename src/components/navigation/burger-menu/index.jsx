import MenuLink from "@/components/menu-link";
import Container from "@/layouts/container";
import { useLocale, useTranslations } from "next-intl";
import styled from "styled-components";
import config from "../../../config";
import Link from "next/link";
import CloseButton from "@/form/closeButton";

const BurgerMenu = (props) => {
  const { categoriesList, categorizedProducts } = config.products;
  const currentLocale = useLocale();

  const t = useTranslations("Navigation");
  const tProducts = useTranslations("Products");
  return (
    <Wrapper>
      <Container>
        {categoriesList.map((category) => (
          <ul key={`burger-menu-cat-${category}`}>
            <MenuLink
              link={{ name: t(category), href: `/categories/${category}` }}
              strong
            />
            <li>
              <ul>
                {categorizedProducts[category].map((el) => {
                  const itemLink = `${el}.link`
                  return <li key={`burger-menu-single-${el}`}>
                    <Link href={`/${currentLocale}${tProducts(itemLink)}`}>
                      {tProducts(`${el}.name`)}
                    </Link>
                  </li>}
                )}
              </ul>
            </li>
          </ul>
        ))}
      </Container>
      <CloseButton handler={props.handler} />
    </Wrapper>
  );
};

export default BurgerMenu;

const Wrapper = styled.nav`
  width: 100%;
  position: absolute;
  top: 80px;
  background: var(--mainBackground);
  padding: 24px;
  button {
    display: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 1024px) {
    position: fixed;
    top: 0;
    height: 100%;
    overflow: scroll;
    z-index: 9999;
    button {
      display: block;
    }
  }
  & > div {
    columns: 4;
    column-width: unset;
    @media screen and (max-width: 1280px) {
      columns: 3;
    }
    @media screen and (max-width: 1024px) {
      columns: 2;
    }
    @media screen and (max-width: 768px) {
      columns: 1;
    }
    & > ul {
      padding: 12px 0;
      break-inside: avoid-column;
    }
  }
  a {
    strong {
      text-transform: uppercase;
      font-weight: 600;
    }
  }
  li {
    list-style-type: none;
  }
  li > ul {
    margin-left: 10px;
    a {
      line-height: 1.5em;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
