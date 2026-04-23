"use client";

import Image from "@/components/image";
import styled from "styled-components";
import { createListedArray } from "@/helpers/services";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { getChunkedArray } from "@/helpers/formatters";
import Switch from "../switch";
import Gallery from "../gallery";
import { useWindowSize } from "@/hooks/useWindowSize";
import Container from "@/layouts/container";
import Button from "@/form/button";
import Feedback from "../sidebar/feedback";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProductSection = (props) => {
  /*Props */

  /*States*/
  const [scrollPosition, setScrollPosition] = useState(0);
  const [id, setId] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [imageId, setImageId] = useState(0);
  const { width } = useWindowSize();
  const [isShowFeedback, setIsShowFeedback] = useState(false);

  /*Refs*/
  const container = useRef();
  const gallery = useRef();

  /*Constants*/
  const { product, t, imageList } = props;
  const list = createListedArray(4);
  const imageLists = getChunkedArray(imageList, 3);
  const isMultiplyList = imageLists.length > 1;
  const mobileWidth = 1024;

  /*Handlers*/
  const handleScroll = (e) => {
    e.preventDefault("scroll");
    const position = window.scrollY;
    if (container.current) {
      const max =
        container.current.scrollHeight - container.current.clientHeight - 24;
      if (container.current.scrollTop < max) {
        let scrollY = container.current.scrollTop + 24;
        window.scrollTo({ top: 0, behavior: "instant" });
        if (
          scrollY >
          container.current.scrollHeight - container.current.clientHeight - 24
        ) {
          scrollY =
            container.current.scrollHeight -
            container.current.clientHeight -
            24;
        }
        container.current.scrollTop = scrollY;
      }
    }
    setScrollPosition(position);
  };

  const path = usePathname();

  const handleWheel = (e) => {
    if (container.current) {
      if (
        window.scrollY === 0 &&
        container.current.scrollTop <=
          container.current.scrollHeight - container.current.clientHeight
      ) {
        if (e.deltaY < 0) {
          container.current.scrollTop = container.current.scrollTop - 48;
        }
      }
    }
  };

  const noScroll = () => {
    if (container.current) {
      if (window.scrollY > 0) {
        container.current.style.overflow = "hidden";
      } else {
        container.current.style.overflow = "scroll";
      }
    }
  };

  const popUp = (id) => {
    setImageId(id);
    setShowGallery(!showGallery);
  };

  const goToId = () => {
    if (container.current) {
      container.current.scrollTop =
        container.current.scrollHeight - container.current.clientHeight;
    }
  };

  /*Effects*/
  useEffect(() => {
    if (width > mobileWidth) {
      window.addEventListener("scroll", handleScroll, false);
      window.addEventListener("wheel", handleWheel, false);
    } else {
      window.addEventListener("scroll", noScroll, false);
    }
  }, [width]);

  /*JSX Components*/
  const switcher = imageLists.map((_, index) => {
    const active = index === id;

    return (
      <Switch
        key={`Switch-${index}`}
        onClick={() => setId(index)}
        active={active}
      />
    );
  });

  const mainText = (
    <MainText>
      <h1 itemProp="name">{t(`${product}.name`)}</h1>
      <p itemProp="description">{t.rich(`${product}.text`)}</p>
      <Buttons>
        <Button handler={() => setIsShowFeedback(!isShowFeedback)}>
          {t(`orderNow`)}
        </Button>
        {props.calculator && (
          <CalculatorButton>
            <Image
              itemProp="image"
              src="/icons/or8b8brdpd5pibgqf1ry"
              width={19}
              height={24}
              alt="calculator icon"
            ></Image>
            <Link href={`${path}#calculator`}>Порахувати онлайн</Link>
          </CalculatorButton>
        )}
      </Buttons>
    </MainText>
  );

  return (
    <>
      <Wrapper $top={scrollPosition === 0}>
        <Feedback
          display={isShowFeedback}
          popUp={() => setIsShowFeedback(!isShowFeedback)}
        />
        <Container ref={container}>
          {showGallery && (
            <Gallery
              imageList={imageList}
              imageId={imageId}
              popUp={popUp}
              ref={gallery}
            />
          )}
          {width <= mobileWidth && mainText}
          <Images>
            <ImagesWrapper $isMultiplyList={isMultiplyList}>
              {imageLists && imageLists[id] ? (
                imageLists[id].map((image, index) => {
                  if (width >= mobileWidth) {
                    switch (imageLists[id].length) {
                      case 3:
                        return index === 0 ? (
                          <BigImage
                            key={`ImageDiv-${image}`}
                            onClick={() => popUp(3 * id + index)}
                          >
                            <Image
                              itemProp="image"
                              src={`/assets/photos/${image}`}
                              placeholder="blur"
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88h8AAs0B5QWO2loAAAAASUVORK5CYII="
                              priority
                              alt={t(`${product}.name`)}
                              fill
                              sizes="(max-width: 1920px) 460px, (max-width: 1680px) 410px, (max-width: 1540px) 360px, (max-width: 1280px) 265px, (max-width: 1024px) 350px, (max-width: 768px) 50vw, (max-width: 320px) 1px"
                            />
                          </BigImage>
                        ) : (
                          <SmallImage
                            key={`ImageDiv-${image}`}
                            onClick={() => popUp(3 * id + index)}
                          >
                            <Image
                              itemProp="image"
                              src={`/assets/photos/${image}`}
                              placeholder="blur"
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88h8AAs0B5QWO2loAAAAASUVORK5CYII="
                              alt={t(`${product}.name`)}
                              fill
                              sizes="(max-width: 1920px) 460px, (max-width: 1680px) 410px, (max-width: 1540px) 360px, (max-width: 1280px) 265px, (max-width: 1024px) 350px, (max-width: 768px) 50vw"
                            />
                          </SmallImage>
                        );
                      case 2:
                        return (
                          <MediumImage
                            key={`ImageDiv-${image}`}
                            onClick={() => popUp(3 * id + index)}
                          >
                            <Image
                              itemProp="image"
                              src={`/assets/photos/${image}`}
                              placeholder="blur"
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88h8AAs0B5QWO2loAAAAASUVORK5CYII="
                              fill
                              alt={t(`${product}.name`)}
                              sizes="(max-width: 1920px) 940px, (max-width: 1680px) 850px, (max-width: 1540px) 750px, (max-width: 1280px) 560px, (max-width: 1024px) 720px, (max-width: 768px) 95vw"
                            />
                          </MediumImage>
                        );
                      case 1:
                        return (
                          <LargeImage
                            key={`ImageDiv-${image}`}
                            onClick={() => popUp(3 * id + index)}
                          >
                            <Image
                              itemProp="image"
                              src={`/assets/photos/${image}`}
                              placeholder="blur"
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88h8AAs0B5QWO2loAAAAASUVORK5CYII="
                              priority
                              fill
                              alt={t(`${product}.name`)}
                            />
                          </LargeImage>
                        );
                      default:
                        return;
                    }
                  } else {
                    return (
                      <MobileImage
                        key={`ImageDiv-${image}`}
                        onClick={() => popUp(3 * id + index)}
                      >
                        <Image
                          itemProp="image"
                          src={`/assets/photos/${image}`}
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88h8AAs0B5QWO2loAAAAASUVORK5CYII="
                          priority
                          fill
                          alt={t(`${product}.name`)}
                        />
                      </MobileImage>
                    );
                  }
                })
              ) : (
                <LargeImage>
                  <Image
                    itemProp="image"
                    src={"/assets/no-photo"}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88h8AAs0B5QWO2loAAAAASUVORK5CYII="
                    fill
                    alt={t(`${product}.name`)}
                    sizes="(max-width: 1920px) 940px, (max-width: 1680px) 850px, (max-width: 1540px) 750px, (max-width: 1280px) 560px, (max-width: 1024px) 720px, (max-width: 768px) 95vw"
                  />
                </LargeImage>
              )}
            </ImagesWrapper>
            {isMultiplyList && <SwitcherWrapper>{switcher}</SwitcherWrapper>}
          </Images>
          <Text>
            <MainText className={width <= mobileWidth ? "no-display" : ""}>
              <h1 itemProp="name">{t(`${product}.name`)}</h1>
              <p itemProp="description">{t.rich(`${product}.text`)}</p>
              <Buttons>
                <Button handler={() => setIsShowFeedback(!isShowFeedback)}>
                  {t(`orderNow`)}
                </Button>
                {props.calculator && (
                  <CalculatorButton>
                    <Image
                      itemProp="image"
                      src="/icons/or8b8brdpd5pibgqf1ry"
                      width={19}
                      height={24}
                      alt="calculator icon"
                    ></Image>
                    <Link href={`${path}#calculator`} onClick={goToId}>
                      Порахувати онлайн
                    </Link>
                  </CalculatorButton>
                )}
              </Buttons>
            </MainText>
            {list.map((_, index) => {
              return (
                t(`${product}.header${index}`) && (
                  <span key={`h2${product}${index}`}>
                    <h2>{t(`${product}.header${index}`)}</h2>
                    <p>{t.rich(`${product}.text${index}`)}</p>
                    {t.rich(`${product}.list${index}-0`) && (
                      <ul>
                        {list.map(
                          (_, subIndex) =>
                            t.rich(`${product}.list${index}-${subIndex}`) && (
                              <li key={`${product}.list${index}-${subIndex}`}>
                                {t.rich(`${product}.list${index}-${subIndex}`)}
                              </li>
                            ),
                        )}
                      </ul>
                    )}
                  </span>
                )
              );
            })}
          </Text>
        </Container>
      </Wrapper>
    </>
  );
};

export default ProductSection;

const Wrapper = styled.div`
  & > div {
    height: calc((100vh - 228px));
    overflow: ${({ $top }) => ($top ? "scroll" : "hidden")};
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 32px;
    /*Disable visible of scrollbar*/
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    @media screen and (max-width: 1200px) {
      grid-template-columns: 1.25fr 1fr;
    }
    @media screen and (max-width: 1024px) {
      grid-template-columns: 1fr;
    }

    @media screen and (max-width: 1024px) {
      height: auto;
    }
    h1 {
      margin-bottom: 24px;
    }
    h2 {
      margin: 12px 0 12px;
    }
    p {
      margin: 0 0 12px;
    }
    ul {
      margin-top: 1em;
      margin-left: 2em;
      & > li {
        margin-bottom: 1em;
      }
    }
  }
`;

const MainText = styled.div`
  button {
    width: 200px;
    max-width: 100%;
  }
`;

const Images = styled.div`
  height: calc(100vh - 256px);
  min-height: 480px;
  position: sticky;
  top: 0px;

  @media screen and (max-width: 1024px) {
    position: relative;
    height: auto;
    min-height: auto;
  }
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 32px;
  width: 440px;
`;

const CalculatorButton = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr;
  align-items: center;
  gap: 6px;
`;

const ImagesWrapper = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: row;
  flex-wrap: wrap;
  height: ${({ $isMultiplyList }) =>
    $isMultiplyList ? "calc(100% - 50px)" : "100%"};
  @media screen and (max-width: 1024px) {
    height: auto;
  }
  & > div {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    img {
      min-width: 100%;
      min-height: 100%;
      object-fit: cover;
      object-position: center;
      aspect-ratio: 2;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const BigImage = styled.div`
  width: 100%;
  height: calc(100% / 3 * 2 - 12px);
`;

const MediumImage = styled.div`
  width: 100%;
  height: calc(100% / 2 - 12px);
`;

const SmallImage = styled.div`
  width: calc(50% - 12px);
  height: calc(100% / 3 - 12px);
`;

const LargeImage = styled.div`
  width: 100%;
  height: 100%;
`;
const MobileImage = styled.div`
  width: 100%;
  height: calc(220vw / 3);
`;

const Text = styled.div``;

const SwitcherWrapper = styled.div`
  display: flex;
  padding-top: 24px;
  gap: 10px;
  justify-content: center;
`;
