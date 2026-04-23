import Container from "@/layouts/container";
import Image from "@/components/image";
import { styled } from "styled-components";
import ButtonLink from "../button-link";
import Switch from "../switch";
import { useEffect, useState } from "react";

const Slider = ({ slides }) => {
  const [id, setId] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  const useInterval = () => {
    doInterval();
  };

  const doInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const newIntervalId = setInterval(() => {
      setId((id) => (id + 1 >= slides.length ? 0 : id + 1));
    }, 10000);
    setIntervalId(newIntervalId);
  };

  // onMount
  useEffect(() => {
    return useInterval;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switcher = slides.map((_, index) => {
    const active = index === id;

    return (
      <Switch
        key={`Switch-${index}`}
        onClick={() => {
          doInterval();
          setId(index);
        }}
        active={active}
      />
    );
  });

  return (
    <Wrapper onMouseOver={useInterval}>
      <ImageWrapper>
        <Image
          src={slides[id].image}
          fill
          sizes={"100vw"}
          alt={slides[id].h2}
          quality={100}
          priority={false}
          loading="lazy"
        />
      </ImageWrapper>
      <Container className="height-100">
        <Description>
          <h2>{slides[id].h2}</h2>
          <h3>{slides[id].h3}</h3>
          <ButtonLink
            link={{ href: slides[id].link, name: slides[id].button }}
            style={`color: white`}
          />
          <p>{slides[id].p}</p>
        </Description>
      </Container>
      <Switcher className="switcher">{switcher}</Switcher>
    </Wrapper>
  );
};

export default Slider;

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 480px;
  background-color: var(--mainBackground);
  & > div {
    z-index: 9;
    &:not(.switcher) {
      height: 100%;
    }
  }
`;
const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  img {
    object-fit: cover;
  }
`;
const Description = styled.div`
  justify-content: center;
  max-width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 9;
  h2 {
    font-size: 64px;
  }
  h3 {
    font-size: 28px;
    line-height: 64px;
  }
  p {
    position: absolute;
    line-height: 48px;
    bottom: 0;
    right: 0;
  }
  @media screen and (max-width: 768px) {
    max-width: 100%;
    h2 {
      font-size: 52px;
    }
    h3 {
      font-size: 24px;
      line-height: 36px;
    }
    p {
      left: 0;
    }
  }
  & > div {
    margin-top: 24px;
  }
`;

const Switcher = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 99;
  display: grid;
  grid-template-rows: 1fr;
  gap: 8px;
  button {
    outline: 1px solid #777;
    box-shadow: var(--boxShadow);
  }
`;
