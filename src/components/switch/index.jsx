import { styled } from "styled-components";

const Switch = (props) => {
  return (
    <Button
      type="button"
      onClick={props.onClick}
      $active={props.active}
      title="switch"
    />
  );
};

export default Switch;

const Button = styled("button")`
  display: block;
  width: 18px;
  height: 18px;
  background-color: ${(props) =>
    props.$active ? "var(--secondaryColor)" : "var(--thirdColor)"};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color var(--transitionDuration);
  &:hover {
    filter: var(--hoverBrightness);
  }
`;
