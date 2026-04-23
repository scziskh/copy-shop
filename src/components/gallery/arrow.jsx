import Image from "@/components/image";
import styled from "styled-components";

const GalleryArrow = (props) => {
  return (
    <Wrapper {...props}>
      <Image src="/icons/arrow" height={30} width={20} alt="Arrow" />
    </Wrapper>
  );
};

export default GalleryArrow;

const Wrapper = styled.button`
  cursor: pointer;
  display: flex;
  width: 64px;
  height: 100%;
  align-self: center;
  align-items: center;
  justify-content: center;
  background: none;
  transition: var(--transitionDuration);

  border: none;
  &:hover {
    opacity: 0.75;
  }

  @media screen and (max-width: 640px) {
    width: 36px;
    img {
      width: 14px;
      height: 21px;
    }
  }
`;
