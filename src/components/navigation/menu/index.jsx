import { useTranslations } from "next-intl";
import { styled } from "styled-components";
import MenuLink from "@/components/menu-link";

const NavigationMenu = () => {
  const t = useTranslations("Navigation");
  const list = [
    "stickers-and-labels",
    "business-cards",
    "multipage-printing",
    "silk-screen-printing",
    "large-format",
  ];

  return (
    <Wrapper>
      {list.map((key) => {
        return (
          <MenuLink
            key={key}
            link={{ href: `/categories/${key}`, name: t(key) }}
          />
        );
      })}
    </Wrapper>
  );
};

export default NavigationMenu;

const Wrapper = styled.ul`
  display: flex;
  height: 60px;
  overflow: hidden;
  li {
    margin: auto;
  }
  @media screen and (max-width: 1366px) {
    display: none;
  }
`;
