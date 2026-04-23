import { styled } from "styled-components";

const Button = (props) => {
  return (
    <Wrapper
      name={props.name}
      onClick={props.handler}
      $bgColor={props.bgColor}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
      {props.title}
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.button`
  display: flex;
  height: 48px;
  align-items: center;
  justify-content: center;
  padding: 5px 16px;
  font-size: 16px;
  border: none;
  background: ${({ $bgColor }) => $bgColor ?? "var(--secondaryColor)"};
  color: white;
  cursor: pointer;
  border-radius: var(--borderRadius);
  font-weight: 600;
  transition: filter var(--transitionDuration);
  &:disabled {
    background: #eee;
    color: var(--thirdColor);
    cursor: default;
    &:hover {
      filter: none;
    }
  }
  &:hover {
    filter: var(--hoverBrightness);
  }
  & > div {
    margin-right: 24px;
  }
`;
