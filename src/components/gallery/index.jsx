/* eslint-disable react/display-name */
import Image from "@/components/image";
import styled from "styled-components";
import GalleryArrow from "./arrow";
import { forwardRef, useRef, useState } from "react";
import CloseButton from "@/form/closeButton";

const Gallery = forwardRef((props, ref) => {
  const [imageId, setImageId] = useState(props.imageId ?? 0);
  const [isMount, setIsMount] = useState(true);
  const image = useRef();

  const handlePrevSlide = () => {
    if (props.imageList.length > 1) {
      image.current.style.transform = "translateX(-25%)";
      image.current.style.opacity = "0";
    }
    setImageId((imageId) =>
      imageId === 0 ? props.imageList.length - 1 : --imageId
    );
    setTimeout(() => {
      setIsMount(false);
    }, 50);
    setTimeout(() => {
      setIsMount(true);
      image.current.style.transform = "translateX(0)";
      image.current.style.opacity = "1";
    }, 100);
  };

  const handleNextSlide = () => {
    if (props.imageList.length > 1) {
      image.current.style.transform = "translateX(25%)";
      image.current.style.opacity = "0";
    }
    setImageId((imageId) =>
      imageId === props.imageList.length - 1 ? 0 : ++imageId
    );
    setTimeout(() => {
      setIsMount(false);
    }, 50);
    setTimeout(() => {
      setIsMount(true);
      image.current.style.transform = "translateX(0)";
      image.current.style.opacity = "1";
    }, 100);
  };

  return (
    <>
      <Wrapper ref={ref}>
        <Close onClick={props.popUp} />
        <GalleryWrapper>
          <CloseButton handler={props.popUp} />
          {props.imageList.length > 1 && (
            <GalleryArrow className="rotate-180" onClick={handlePrevSlide} />
          )}
          <ImageWrapper ref={image} className={`image-${imageId}`}>
            {isMount && (
              <Image
                src={`assets/photos/${props.imageList[imageId]}`}
                loading={"eager"}
                priority={true}
                sizes="(max-width: 1920px) 1400px, (max-width: 1440px) 1280px, (max-width: 1366px) 1024px, (max-width: 1200px) 980px, (max-width: 1024px) 720px, (max-width: 768px) 100vw, (max-width: 320px) 1px"
                fill
                alt=""
              />
            )}
          </ImageWrapper>
          {props.imageList.length > 1 && (
            <GalleryArrow onClick={handleNextSlide} />
          )}
        </GalleryWrapper>
      </Wrapper>
    </>
  );
});

export default Gallery;

const Wrapper = styled.div`
  display: flex;
  z-index: 9999;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  & > img {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  align-self: center;
  overflow: hidden;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: ease 500ms;

  img {
    object-fit: cover;
    object-position: center;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    position: fixed;
    img {
      height: 100%;
      object-fit: contain;
    }
  }
`;

const GalleryWrapper = styled.div`
  width: 1400px;
  height: 720px;
  display: flex;
  position: relative;
  align-self: center;
  justify-content: space-between;
  overflow: hidden;
  margin: 0 auto;
  z-index: 2;
  @media screen and (max-width: 1440px) {
    width: 1280px;
  }
  @media screen and (max-width: 1366px) {
    width: 1024px;
    height: 600px;
  }
  @media screen and (max-width: 1200px) {
    width: 980px;
    height: 540px;
  }
  @media screen and (max-width: 1024px) {
    width: 720px;
    height: 400px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: calc((24 / 45) * 100vw);
  }
`;

const Close = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  transition: background-color 0.25s;
  z-index: 1;
  @media screen and (max-width: 768px) {
    background: var(--mainBackground);
  }
`;
