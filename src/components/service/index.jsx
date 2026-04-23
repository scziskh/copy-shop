import Container from "@/layouts/container";
import { useTranslations } from "next-intl";
import Image from "@/components/image";
import styled from "styled-components";
import ButtonLink from "../button-link";

const Service = (props) => {
  const { service } = props;
  const t = useTranslations(`ServicesPage.${service}`);
  const tButton = useTranslations("Buttons");
  return (
    <Wrapper>
      <Container>
        <ImageWrapper>
          <Image src={`/assets/services/${service}`} fill alt="" />
        </ImageWrapper>
        <Description>
          <h2>{t("header")}</h2>
          <Text>{t.rich("short-text")}</Text>
          <ButtonLink
            link={{ href: `/services/${service}`, name: tButton("more") }}
          />
        </Description>
      </Container>
    </Wrapper>
  );
};

export default Service;

const Wrapper = styled.article`
  & > div {
    display: grid;
    gap: 48px;
    grid-template-columns: 350px 1fr;
    @media screen and (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 1;
  background: var(--mainBackground);
`;

const Text = styled.div`
  padding: 24px 0;
  p {
    padding: 12px 0;
  }
`;

const Description = styled.div`
  position: relative;
`;
