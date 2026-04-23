import { styled } from "styled-components";
import Link from "next/link";
import { useLocale } from "next-intl";

const MiniButtonLink = ({ link }) => {
  const currentLocale = useLocale();

  return (
    <Wrapper>
      <Link href={`/${currentLocale}${link.href}`}>{link.name}</Link>
    </Wrapper>
  );
};

export default MiniButtonLink;

const Wrapper = styled.div`
  a {
    box-sizing: border-box;
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
    width: 128px;
    font-size: 16px;
    border: 2px solid var(--secondaryColor);
    color: white;
    background-color: var(--secondaryColor);
    padding: 5px;
    cursor: pointer;
    border-radius: var(--borderRadius);
    font-weight: 500;
    &:hover {
      text-decoration: none;
      transition: filter var(--transitionDuration);
      filter: var(--hoverBrightness);
    }
  }
`;
