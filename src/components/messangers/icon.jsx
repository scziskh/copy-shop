import styled from "styled-components";
import Image from "../image";

const Icon = (props) => {
  return (
    <Wrapper href={props.href} aria-label={props.label}>
      <Image src={props.img} width={48} height={48} alt="" />
    </Wrapper>
  );
};

export default Icon;

const Wrapper = styled.a``;
