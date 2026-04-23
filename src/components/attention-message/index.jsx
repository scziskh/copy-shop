"use client";

import styled from "styled-components";

const AttentionMessage = () => {
  const text =
    "ㅤШановні клієнти! Зверніть увагу, у нас змінився номер телефону на +38 093 150 7510! Прохання для клієнтів, чиї замовлення або прорахунки в роботі звернутися повторно за новим номером!";
  return (
    <Wrapper>
      <div>
        <p className="p1">{text}</p>
        <p className="p2">{text}</p>
      </div>
    </Wrapper>
  );
};

export default AttentionMessage;

const Wrapper = styled.div`
  height: 75px;
  display: flex;
  background-color: var(--secondaryColor);
  box-shadow: var(--boxShadow);
  overflow-x: hidden;
  width: 100%;
  & > div {
    display: flex;
    margin: auto;
  }
  p {
    font-size: 18px;
    white-space: nowrap;
    width: 200%;
    color: white;
    font-weight: bold;
  }
  .p1 {
    animation: marquee1 30s infinite linear;
    animation-delay: -30s;
  }
  .p2 {
    animation: marquee2 30s infinite linear;
    animation-delay: -15s;
  }
  @keyframes marquee1 {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  @keyframes marquee2 {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-200%);
    }
  }
`;
