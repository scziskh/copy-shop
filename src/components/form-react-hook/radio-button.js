import { ConnectForm } from "@/lib/react-hook-form";
import styled from "styled-components";

const RadioButton = ({ name, title, value, ...rest }) => {
  return (
    <ConnectForm>
      {({ register }) => (
        <Wrapper>
          <input
            type="radio"
            {...register(name)}
            value={value}
            id={value}
            name={name}
            {...rest}
          />
          <label htmlFor={value}>{title}</label>
        </Wrapper>
      )}
    </ConnectForm>
  );
};

export default RadioButton;

const Wrapper = styled.div`
  input {
    padding: 12px;
    font-size: 1em;
    border: none;
    background-color: inherit;
  }
  label {
    padding-left: 12px;
    cursor: pointer;
  }
`;
