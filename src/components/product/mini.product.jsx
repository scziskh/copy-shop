import Image from "@/components/image";
import { styled } from "styled-components";
import MiniButtonLink from "../button-link/mini";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const MiniProduct = (props) => {
  const router = useRouter();
  const locale = useLocale();
  return (
    <Wrapper>
      <ImageContainer onClick={() => router.push(`/${locale}${props.href}`)}>
        <Image
          quality={70}
          src={`/assets/products/${props.img}`}
          fill
          alt={props.name}
          sizes="(max-width: 1920px) 382px,(max-width: 1540px) 302px, (max-width: 1366px) 282px, (max-width: 1280px) 460px, (max-width: 1024px) 340px,(max-width: 768px) 95vw"
        />
      </ImageContainer>
      <Text onClick={() => router.push(`/${locale}${props.href}`)}>
        <Name>
          <h3>{props.name}</h3>
        </Name>
        <Description>
          <p>{props.description}</p>
        </Description>
      </Text>
      <MiniButtonLink link={{ href: props.href, name: props.button }} />
    </Wrapper>
  );
};

export default MiniProduct;

const Wrapper = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Text = styled.div`
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Name = styled.div`
  margin-bottom: 8px;
  height: 1.2em;

  h3 {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.2em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4em;
  height: 2.8em;
  margin-bottom: 15px;
  overflow: hidden;

  p {
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ImageContainer = styled.div`
  background-color: #efe3e8;
  position: relative;
  cursor: pointer;

  /* 1. Гарантуємо, що це завжди буде квадрат */
  width: 100%;
  aspect-ratio: 1 / 1;

  /* 2. Забороняємо картинці рости або стискатися, навіть якщо тексту мало/багато */
  flex-shrink: 0;
  flex-grow: 0;

  overflow: hidden;
  border-radius: 15px;
  filter: grayscale(0.2);

  /* 3. Важливо для компонента Image з fill */
  display: block;

  img {
    /* Тут все правильно, але додай width/height 100% для страховки */
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
    object-position: center;
    transition: all var(--transitionDuration);

    &:hover {
      transform: scale(1.02); /* scale краще писати через transform */
    }
  }
`;
