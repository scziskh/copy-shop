"use client";

import Container from "@/layouts/container";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import styled from "styled-components";

const SuccessPage = () => {
  const [number, setNumber] = useState();

  useEffect(() => {
    setNumber(Cookies.get("order"));
  }, []);

  if (!number) {
    return (
      <Wrapper>
        <Container></Container>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Container>
        <div>
          <h1>Дякуємо Вам за замовлення!</h1>
          <h2>Номер Вашого замовлення: {number}</h2>
          <h3>{`Для підтвердження замовлення з Вами зв'яжеться наш менеджер`}</h3>
        </div>
      </Container>
    </Wrapper>
  );
};

export default SuccessPage;

const Wrapper = styled.section`
  padding: 24px 0;
  min-height: calc(100vh - 180px);
  display: flex;
  & > div {
    vertical-align: middle;
    text-align: center;
    h1 {
      font-size: 36px;
      margin-bottom: 24px;
    }
    h2 {
      margin-bottom: 24px;
    }
  }
`;
