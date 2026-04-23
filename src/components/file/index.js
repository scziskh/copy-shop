import styled from "styled-components";
import Image from "../image";

const FileComponent = (props) => {
  return (
    <Wrapper href={props.href} target="_blank">
      {props.name}
      <Image src="icons/wxxfrwfgt5fhhjqfrgrm" width={24} height={24} alt="" />
    </Wrapper>
  );
};

const Wrapper = styled.a`
  display: inline-block;
  line-height: 32px;
  margin: 12px 0;
  padding: 12px 24px;
  outline: 1px solid var(--thirdColor);
  border-radius: var(--borderRadius);
  align-content: middle;
  img {
    margin: 0 0 0 12px;
    padding: 0;
    transform: translateY(8px);
  }
  &:hover {
    box-shadow: var(--boxShadow);
  }
`;

export default FileComponent;
