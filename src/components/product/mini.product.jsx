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
          <h3>
            {props.name}
          </h3>
        </Name>
        <Description>
          <p>
            {props.description}
          </p>
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
`;

const Name = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  h3 {
    overflow: hidden;
    white-space: nowrap;
    font-size: 24px;
    font-weight: 600;
    word-spacing: 2px;
    text-overflow: ellipsis;
  }
`;
const Description = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  height: 2.5em;
  overflow: hidden;
  p {
    display: -moz-box;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -moz-line-clamp: 2;
    -webkit-box-orient: vertical;
    -moz-line-clamp: 2;
    overflow: hidden;
  }
`;

const Text = styled.div`
  padding: 12px 0;
`;

const ImageContainer = styled.div`
  background-color: #efe3e8;
  position: relative;
  cursor: pointer;
  min-width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 15px;
  filter: grayscale(0.2);
  img {
    &:hover {
      scale: 1.02;
    }
    transition: all var(--transitionDuration);
    object-fit: cover;
    object-position: center;
  }
`;
