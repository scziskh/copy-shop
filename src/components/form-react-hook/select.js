import { ConnectForm } from "@/lib/react-hook-form";
import styled from "styled-components";

const Select = (props) => {
  return (
    <ConnectForm>
      {({ register }) => (
        <Wrapper {...register(props.name)} disabled={props.disabled}>
          {props.content.map((item, index) => (
            <option key={`${props.name}-${index}`} value={item}>
              {props.t(`${props.name}.${item}`)}
            </option>
          ))}
        </Wrapper>
      )}
    </ConnectForm>
  );
};

export default Select;

const Wrapper = styled.select`
  display: block;
  padding: 12px;
  font-size: 1em;
  border: none;
  outline: 1px solid var(--thirdColor);
  border-radius: var(--borderRadius);
  background-color: inherit;
  min-width: 240px;
  &:hover {
    outline: 1px solid var(--textColor);
  }
  &:focus {
    outline: 2px solid var(--textColor);
  }
  &:disabled {
    outline: 1px solid #aaa;
  }
`;
