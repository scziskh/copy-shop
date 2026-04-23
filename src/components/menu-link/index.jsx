import { styled } from "styled-components";
import Link from "next/link";
import { useLocale } from "next-intl";

const MenuLink = ({ link, strong }) => {
  const currentLocale = useLocale();
  const locale = link.locale || currentLocale;
  return (
    <Wrapper>
      <Link href={`/${locale}${link.href}`}>
        {strong ? <strong>{link.name}</strong> : link.name}
      </Link>
    </Wrapper>
  );
};

export default MenuLink;

const Wrapper = styled.li`
  list-style-type: none;
  white-space: nowrap;
  a {
    display: inline-block;
    padding: 10px;
    &::after {
      content: "";
      display: flex;
      height: 2px;
      background: var(--secondaryColor);
      transform: translateY(12px);
      opacity: 0;
      transition: transform var(--transitionDuration);
    }
    &:hover {
      transition-duration: var(--transitionDuration);
      text-decoration: none;
      &:after {
        transform: translateY(6px);
        opacity: 1;
      }
    }
  }
`;
