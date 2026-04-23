import { useEffect, useRef } from "react";
import styled from "styled-components";

const NumberInput = (props) => {
  const ref = useRef();

  useEffect(() => {
    if (ref) {
      ref.current.value = +ref.current.value
        ? Number.isInteger(+ref.current.value / 100)
          ? Math.floor(+ref.current.value / +props.step) * +props.step
          : Math.ceil(+ref.current.value / +props.step) * +props.step
        : props.defaultValue;
    }
  }, [props.defaultValue, props.product, props.step, ref]);

  useEffect(() => {
    if (ref) {
      setTimeout(() => {
        ref.current.value = +ref.current.value
          ? Number.isInteger(+ref.current.value / 100)
            ? Math.floor(+ref.current.value / +props.step) * +props.step
            : Math.ceil(+ref.current.value / +props.step) * +props.step
          : props.defaultValue;
      }, 1200);
    }
  }, [props.defaultValue, props.product, props.step, ref?.current?.value]);

  useEffect(() => {
    setTimeout(() => {
      if (ref) {
        ref.current.value =
          ref?.current?.value < props.min ? props.min : ref?.current?.value;
      }
    }, 1200);
  }, [props.defaultValue, props.min, ref?.current?.value]);

  useEffect(() => {
    setTimeout(() => {
      if (ref) {
        ref.current.value =
          ref?.current?.value > props.max ? props.max : ref?.current?.value;
      }
    }, 0);
  }, [props.defaultValue, props.max, ref?.current?.value]);

  useEffect(() => {
    ref.current.style.appearance = "";
  }, [ref]);

  return (
    <Wrapper>
      <Input
        ref={ref}
        step={props.step}
        min={props.min ?? props.step}
        name={props.name}
        type={"number"}
      />
    </Wrapper>
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
