import CloseButton from "@/form/closeButton";
import styled from "styled-components";

const Message = ({ message, close, header }) => {
  return (
    <Wrapper>
      <Close onClick={close} />
      <Form>
        <CloseButton handler={close} />
        <h2>{header}</h2>
        <p>{message}</p>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: background-color 0.25s;
  z-index: 9999;
`;
const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 25px;
  justify-content: center;
  text-align: center;
  position: absolute;
  z-index: 9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  max-width: 95%;
  height: 250px;
  max-height: 80%;
  background: var(--mainBackground);
  border-radius: var(--borderRadius);
  box-shadow: var(--boxShadow);
`;
const Close = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;
export default Message;
