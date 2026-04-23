import { useTranslations } from "next-intl";
import { styled } from "styled-components";
import MenuLink from "@/components/menu-link";

const HeaderMenu = () => {
  const t = useTranslations("MenuHeader");
  const list = ["services", "specials", "contacts"];

  return (
    <Wrapper>
      {list.map((key) => {
        return <MenuLink key={key} link={{ href: `/${key}`, name: t(key) }} />;
      })}
    </Wrapper>
  );
};

export default HeaderMenu;

const Wrapper = styled.ul`
  display: flex;
  height: 60px;
  li {
    margin: auto;
    a {
      text-transform: uppercase;
    }
  }
  @media screen and (max-width: 1280px) {
    display: none;
  }
`;
