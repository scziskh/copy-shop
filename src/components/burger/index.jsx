import { styled } from "styled-components";

const Burger = () => {
  return (
    <Wrapper>
      <span />
    </Wrapper>
  );
};

export default Burger;

const Wrapper = styled.div`
  position: relative;
  width: 24px;
  margin-left: -12px;
  span,
  span::before,
  span::after {
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: white;
  }
  span::before {
    left: 0;
    content: "";
    top: -8px;
  }
  span::after {
    left: 0;
    content: "";
    top: 8px;
  }
`;
