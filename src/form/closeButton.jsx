import { styled } from "styled-components";

const CloseButton = (props) => {
  return (
    <Wrapper name={props.name} onClick={props.handler}>
      ×
    </Wrapper>
  );
};

export default CloseButton;

const Wrapper = styled.button`
  position: fixed;
  top: 0;
  right: 12px;
  font-size: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: var(--thirdColor);
  background: none;
  cursor: pointer;
  font-weight: 600;
  transition: filter var(--transitionDuration);
  z-index: 100000;
  &:hover {
    color: var(--secondaryColor);
  }
  @media screen and (max-width: 768px) {
    position: fixed;
  }
`;
