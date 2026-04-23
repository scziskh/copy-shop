import { styled } from "styled-components";
import { intl } from "@/config/intl.config";
import { usePathname } from "next/navigation";
import MenuLink from "@/components/menu-link";
import Cookies from "js-cookie";

const Langs = () => {
  const pathName = usePathname();
  const temp = pathName.split("/");
  temp.splice(0, 2);
  const href = temp.join("/");
  return (
    <Wrapper>
      {intl.locales.map((locale) => {
        return (
          <MenuLink
            key={locale}
            link={{ name: locale, href: `/${href}`, locale }}
            onClick={() => Cookies.set("NEXT_LOCALE", locale)}
          />
        );
      })}
    </Wrapper>
  );
};

export default Langs;

const Wrapper = styled.ul`
  display: flex;
  height: 60px;
  li {
    position: relative;
    &:nth-child(n)::after {
      position: absolute;
      top: 9px;
      right: -2px;
      content: "|";
      display: inline;
    }
    &:nth-last-child(-n + 1)::after {
      display: none;
    }
    margin: auto;
    a {
      text-transform: uppercase;
    }
  }
`;
