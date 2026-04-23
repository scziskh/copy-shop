import { ConnectForm } from "@/lib/react-hook-form";
import styled from "styled-components";

const Textarea = ({ name, ...rest }) => {
  return (
    <ConnectForm>
      {({ register }) => <Wrapper {...register(name)} {...rest} />}
    </ConnectForm>
  );
};

export default Textarea;

const Wrapper = styled.textarea`
  padding: 12px;
  font-size: 1em;
  border: none;
  outline: 1px solid var(--thirdColor);
  border-radius: var(--borderRadius);
  resize: none;
  background-color: inherit;
  &:hover {
    outline: 1px solid var(--textColor);
  }
  &:focus {
    outline: 2px solid var(--textColor);
  }
`;
