"use client";

import { useTranslations } from "next-intl";
import styled from "styled-components";

const TextSection = ({ text, userText }) => {
  const t = useTranslations(text);

  return <Wrapper>{t.rich(userText ?? "text")}</Wrapper>;
};

const Wrapper = styled.div`
  margin: 0 0 48px;
  h1 {
    padding-bottom: 18px;
    line-height: 42px;
  }
  h2 {
    padding: 12px 0 4px;
  }
  h3 {
    padding: 16px 0 8px;
  }
  p {
    padding: 8px 0 12px;
  }
  & > ul,
  & > ol {
    padding: 0px 0 12px;
    margin-left: 24px;
    & > ul,
    & > ol {
      margin-left: 24px;
    }
    li {
      padding: 6px 0;
    }
  }
`;
export default TextSection;
