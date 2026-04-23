/*Libs*/
import CloseButton from "@/form/closeButton";
import Container from "@/layouts/container";
import React from "react";
import styled from "styled-components";

const Sidebar = (props) => {
  return (
    <Wrapper $display={props.display}>
      <Container>
        {props.children}
        <CloseButton handler={props.popUp} />
      </Container>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.section`
  opacity: ${({ $display }) => ($display ? "1" : "0")};
  transform: ${({ $display }) =>
    $display ? "translateX(0%)" : "translateX(100%)"};
  width: 640px;
  max-width: 100%;
  box-shadow: var(--boxShadow);
  background: var(--mainBackground);
  display: flex;
  z-index: 999;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  align-items: end;
  transition: var(--transitionDuration);
  & section {
    padding: 24px;
  }
`;
