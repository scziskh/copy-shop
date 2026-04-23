import { styled } from "styled-components";

const SingleCloseButton = (props) => {
  return (
    <Wrapper name={props.name} onClick={props.handler} type="button">
      ×
    </Wrapper>
  );
};

export default SingleCloseButton;

const Wrapper = styled.button`
  position: absolute;
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
`;
