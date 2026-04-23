import { ConnectForm } from "@/lib/react-hook-form";
import styled from "styled-components";

const Input = ({ name, ...rest }) => {
  return (
    <ConnectForm>
      {({ register }) => <Wrapper {...register(name)} {...rest} />}
    </ConnectForm>
  );
};

export default Input;

const Wrapper = styled.input`
  display: block;
  padding: 12px;
  font-size: 1em;
  border: none;
  outline: 1px solid var(--thirdColor);
  background-color: inherit;
  border-radius: var(--borderRadius);
  &:hover {
    outline: 1px solid var(--textColor);
  }
  &:focus {
    outline: 2px solid var(--textColor);
  }
`;
