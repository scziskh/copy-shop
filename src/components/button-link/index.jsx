import { styled } from "styled-components";
import Link from "next/link";
import { useLocale } from "next-intl";

const ButtonLink = ({ link }) => {
  const currentLocale = useLocale();
  return (
    <Wrapper>
      <Link href={`/${currentLocale}${link.href}`}>{link.name}</Link>
    </Wrapper>
  );
};

export default ButtonLink;

const Wrapper = styled.div`
  a {
    box-sizing: border-box;
    display: inline-flex;
    height: 48px;
    align-items: center;
    justify-content: center;
    width: 220px;
    font-size: 16px;
    border: 2px solid var(--secondaryColor);
    color: var(--textColor);
    padding: 5px;
    cursor: pointer;
    border-radius: var(--borderRadius);
    font-weight: 600;
    text-decoration: none;
    transition:
      background-color var(--transitionDuration),
      color var(--transitionDuration);
    &:hover {
      background-color: var(--secondaryColor);
      color: white;
    }
  }
`;
