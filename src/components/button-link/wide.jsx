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
    box-sizing: border-box;
    padding: 12px;

    /* Основні стилі */
    background: ${({ $active }) =>
      $active ? "var(--thirdColor)" : "transparent"};
    color: ${({ $active }) => ($active ? "white" : "var(--textColor)")};
    border-radius: var(--borderRadius);
    box-shadow: var(--boxShadow);

    /* Анімація та поведінка */
    transition: all var(--transitionDuration) ease;
    cursor: ${({ $active }) => ($active ? "default" : "pointer")};
    pointer-events: ${({ $active }) =>
      $active
        ? "none"
        : "auto"}; /* Повністю відключає клік по активній кнопці */

    &:hover {
      text-decoration: none;
      /* Якщо активна - залишаємо її колір, якщо ні - застосовуємо secondaryColor */
      background: ${({ $active }) =>
        $active ? "var(--thirdColor)" : "var(--secondaryColor)"};
      color: ${({ $active }) => ($active ? "white" : "white")};
    }
  }
`;
