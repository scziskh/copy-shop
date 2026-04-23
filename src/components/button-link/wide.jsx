import Link from "next/link";
import { useLocale } from "next-intl";
import styled from "styled-components";

const WideButtonLink = (props) => {
  const { link, active } = props;
  const currentLocale = useLocale();

  return (
    <Wrapper $active={active}>
      <Link href={`/${currentLocale}${link.href}`}>{link.name}</Link>
    </Wrapper>
  );
};

export default WideButtonLink;

const Wrapper = styled.div`
  width: 100%;
  a {
    display: block;
    width: 100%;
    padding: 12px;
    background: ${({ $active }) => ($active ? "var(--thirdColor)" : "")};
    color: ${({ $active }) => ($active ? "white" : "var(--textColor)")};
    border-radius: var(--borderRadius);
    box-shadow: var(--boxShadow);
    transition: background-color var(--transitionDuration);
    cursor: ${({ $active }) => ($active ? "default" : "pointer")};
    &:hover {
      text-decoration: none;
      background: ${({ $active }) => ($active ? "" : "var(--secondaryColor)")};
      color: ${({ $active }) => ($active ? "" : "white")};
    }
  }
`;
