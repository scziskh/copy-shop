"use client";

/*Libs*/
import Image from "@/components/image";
import styled from "styled-components";
import { useTranslations } from "next-intl";

/*Helpers*/
import { getFormattedPhone } from "@/helpers/formatters";

/*Components*/
import FeedbackForm from "../forms/feedback-form";

const FeedbackSection = () => {
  /*Translations*/
  const feedback = useTranslations("Feedback");
  const locations = useTranslations("Locations");
  const schedule = useTranslations("Schedule");

  /*Other constants*/
  const locationsList = ["amosova"];

  return (
    <Wrapper id="feedback">
      <FeedbackForm />
      <Contacts>
        <div>
          <h2>{locations("h2")}</h2>
          <div>
            {locationsList.map((item) => (
              <Location key={item}>
                <ImageWrapper>
                  <div>
                    <Image
                      src="/icons/location"
                      width={13}
                      height={17.5}
                      alt="☉"
                    />
                  </div>
                </ImageWrapper>
                <Address>{locations(`${item}.address`)}</Address>
                <Description>{locations(`${item}.description`)}</Description>
              </Location>
            ))}
          </div>
          <div>
            <Contact>
              <ImageWrapper>
                <div>
                  <Image
                    src="/icons/email"
                    width={16}
                    height={11.5}
                    alt="✉"
                  />
                </div>
              </ImageWrapper>
              <div>
                <a href={`mailto:${feedback("email.contact")}`}>
                  {feedback("email.contact")}
                </a>
              </div>
              <Address>{feedback(`managers`)}</Address>
            </Contact>
            <Contact>
              <ImageWrapper>
                <div>
                  <Image
                    src="/icons/phone"
                    width={14}
                    height={14}
                    alt="✆"
                  />
                </div>
              </ImageWrapper>
              <div>
                <a href={`tel:${feedback("phone.contact")}`}>
                  {getFormattedPhone(feedback("phone.contact"))}
                </a>
              </div>
              <Address>{feedback(`managers`)}</Address>
            </Contact>
            <Contact>
              <ImageWrapper>
                <div>
                  <Image
                    src="/icons/phone"
                    width={14}
                    height={14}
                    alt="✆"
                  />
                </div>
              </ImageWrapper>
              <div>
                <a href={`tel:${feedback("phone.secondary")}`}>
                  {getFormattedPhone(feedback("phone.secondary"))}
                </a>
              </div>
              <Address>{feedback(`managers`)}</Address>
            </Contact>
          </div>
        </div>
        <div>
          <h2>{schedule("h2")}</h2>
          <div>
            <Location>
              <ImageWrapper>
                <div>
                  <Image
                    src="/icons/schedule"
                    width={16}
                    height={16}
                    alt="🗓"
                  />
                </div>
              </ImageWrapper>
              <Address>{schedule("days")}</Address>
              <Description>{schedule("hours")}</Description>
            </Location>
          </div>
        </div>
      </Contacts>
    </Wrapper>
  );
};

export default FeedbackSection;

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 32px;
  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr 320px;
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Contacts = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr;
  }
  & > div > div {
    margin: 24px 0;
    & > div {
      height: 48px;
    }
  }
`;

const Location = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr;
  margin: 6px 0;
`;

const ImageWrapper = styled.div`
  align-self: center;
  justify-self: center;
  grid-column-start: 1;
  grid-row-start: 1;
  grid-row-end: 3;
  & > div {
    display: flex;
    width: 28px;
    height: 28px;
    outline: 1px solid var(--thirdColor);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
  }
  img {
    display: block;
  }
`;
const Address = styled.div`
  font-weight: 600;
`;
const Description = styled.div``;

const Contact = styled.div`
  margin: 6px 0;
  height: 48px;
  display: grid;
  grid-template-columns: 48px 1fr;
`;
