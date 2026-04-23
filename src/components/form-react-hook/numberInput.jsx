import styled from "styled-components";
import { ConnectForm } from "@/lib/react-hook-form";
import { useEffect, useState } from "react";

const NumberInput = (props) => {
  const [value, setValue] = useState(props.defaultValue);
  const [prevValue, setPrevValue] = useState(0);
  const [timeoutID, setTimeoutID] = useState(0);

  useEffect(() => {
    setValue(props.defaultValue);
  }, [props.defaultValue]);

  useEffect(() => {
    if (prevValue !== value) {
      clearTimeout(timeoutID);
      setTimeoutID(
        setTimeout(() => {
          if (!Number.isInteger(value / props.step)) {
            setPrevValue(value);
            setValue((state) =>
              Number.isInteger(state / 100) && !props.allwaysMore
                ? Math.floor(state / props.step) * props.step
                : Math.ceil(state / props.step) * props.step
            );
          }
          if (value < props.min) {
            setValue(props.min);
          }
        }, 2000)
      );
      if (value > props.max) setValue(props.max);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.step, value]);

  useEffect(() => {
    props.setValue(props.name, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <ConnectForm>
      {({ register }) => (
        <Wrapper>
          <Input
            type={"number"}
            step={props.step}
            min={props.step}
            max={props.max}
            defaultValue={props.defaultValue}
            disabled={props.disabled}
            onInput={(e) => {
              setValue(e.target.value);
            }}
            {...register(props.name)}
          />
        </Wrapper>
      )}
    </ConnectForm>
  );
};

export default NumberInput;

const Wrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  display: block;
  padding: 12px;
  font-size: 1em;
  border: none;
  outline: 1px solid var(--thirdColor);
  background-color: inherit;
  border-radius: var(--borderRadius);
  width: 100%;
  text-align: center;
  &:hover {
    outline: 1px solid var(--textColor);
  }
  &:focus {
    outline: 2px solid var(--textColor);
  }
`;
