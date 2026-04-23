"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";

const theme = {
  mainBackground:
    "linear-gradient(270deg, #fffaf9 0%, #fff9f9 16.67%, #fffff9 33.33%, #f9fff9 50%, #f9ffff 66.67%, #f9f9ff 83.33%, #fff9ff 100%)",
  textColor: "black",
  secondaryColor: "#e61a20",
  thirdColor: "#444",
  transitionDuration: "0.25s",
  boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.25)",
  innerShadow: "inset 0px 0px 5px 1px rgba(0, 0, 0, 0.25)",
  borderRadius: "5px",
  hoverBrightness: "brightness(1.08)",
};

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${theme.mainBackground};
  color: ${theme.textColor};
  font-family: sans-serif;
  padding: 20px;
`;

const ContentCard = styled.div`
  text-align: center;
  max-width: 500px;
  width: 100%;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(8px);
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  animation: fadeIn 0.6s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ErrorCode = styled.h1`
  font-size: clamp(5rem, 15vw, 8rem);
  font-weight: 900;
  margin: 0;
  color: ${theme.secondaryColor};
  line-height: 1;
  letter-spacing: -2px;
`;

const Divider = styled.div`
  height: 4px;
  width: 50px;
  background: ${theme.thirdColor};
  margin: 1.5rem auto;
  border-radius: ${theme.borderRadius};
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${theme.thirdColor};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.8;
`;

const StyledButton = styled(Link)`
  display: inline-block;
  background-color: ${theme.secondaryColor};
  color: white;
  padding: 12px 28px;
  text-decoration: none;
  font-weight: 600;
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  transition: all ${theme.transitionDuration} ease-in-out;

  &:hover {
    filter: ${theme.hoverBrightness};
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }

  &:active {
    filter: brightness(0.95);
    box-shadow: ${theme.innerShadow};
    transform: translateY(0);
  }
`;

export default function NotFound() {
  return (
    <html>
      <body>
        <PageWrapper>
          <ContentCard>
            <ErrorCode>404</ErrorCode>
            <Divider />
            <Title>Сторінку не знайдено</Title>
            <Description>
              На жаль, ми не змогли знайти те, що ви шукаєте. Можливо, адреса
              застаріла або була введена з помилкою.
            </Description>
            <StyledButton href="/">На головну</StyledButton>
          </ContentCard>
        </PageWrapper>
      </body>
    </html>
  );
}
