"use client";

import Container from "@/layouts/container";
import styled from "styled-components";
import { useLocale, useTranslations } from "next-intl";
import { getFormattedPhone } from "@/helpers/formatters";
import MenuLink from "../menu-link";
import Link from "next/link";
import config from "../../config";
import Image from "@/components/image";

const Footer = () => {
  const currentLocale = useLocale();

  const tFeedback = useTranslations("Feedback");
  const tLocations = useTranslations("Locations");
  const tSchedule = useTranslations("Schedule");
  const tNavigation = useTranslations("Navigation");
  const tAbout = useTranslations("MenuHeader");
  const tServices = useTranslations("ServicesPage");

  const locationsList = ["amosova"];
  const { categoriesList } = config.products;
  const aboutList = [
    "specials",
    "payment-delivery",
    "layout-requirements",
    "terms",
    "privacy-policy",
    "service-rules",
    "contacts",
    "fs",
  ];

  return (
    <>
      <Wrapper>
        <Container>
          <div>
            <ul>
              <MenuLink
                link={{ href: "/services", name: tNavigation("services") }}
                strong
              />
              <li>
                <ul>
                  {config.products.servicesList.map((key) => {
                    return (
                      <FooterLink key={key}>
                        <Link href={`/${currentLocale}/services/${key}`}>
                          {tServices(`${key}.header`)}
                        </Link>
                      </FooterLink>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <MenuLink
                link={{ href: "/categories", name: tNavigation("catalog") }}
                strong
              />
              <li>
                <ul>
                  {categoriesList.map((key) => {
                    return (
                      <FooterLink key={key}>
                        <Link href={`/${currentLocale}/categories/${key}`}>
                          {tNavigation(key)}
                        </Link>
                      </FooterLink>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <MenuLink
                link={{ href: "/about-us", name: tNavigation("about-us") }}
                strong
              />
              <li>
                <ul>
                  {aboutList.map((key) => {
                    return (
                      <FooterLink key={key}>
                        <Link href={`/${currentLocale}/${key}`}>
                          {tAbout(key)}
                        </Link>
                      </FooterLink>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <MenuLink
                link={{ href: "/contacts", name: tAbout("contacts") }}
                strong
              />
              <li>
                <Elem>{tSchedule("days")}</Elem>
                <Elem>{tSchedule("hours")}</Elem>
              </li>
            </ul>
            <div>
              {locationsList.map((item) => (
                <Elem key={item}>{tLocations(`${item}.address`)}</Elem>
              ))}
            </div>
            <div>
              <Elem>
                <a href={`mailto:${tFeedback("email.contact")}`}>
                  {tFeedback("email.contact")}
                </a>
              </Elem>
              <Elem>
                <a href={`tel:${tFeedback("phone.contact")}`}>
                  {getFormattedPhone(tFeedback("phone.contact"))}
                </a>
              </Elem>
              <Elem>
                <a href={`tel:${tFeedback("phone.secondary")}`}>
                  {getFormattedPhone(tFeedback("phone.secondary"))}
                </a>
              </Elem>
            </div>
          </div>
        </Container>
      </Wrapper>
      <Container>
        <Social>
          <div>
            <strong>Copy Shop</strong> © 2016-{new Date().getFullYear()} All
            Rights Reserved
          </div>
          <div>
            <a
              href="https://www.facebook.com/copyshopua"
              target="blank"
              aria-label="Facebook"
            >
              <Image
                src="/assets/facebook"
                width={32}
                height={32}
                alt="Facebook"
              />
            </a>
            <a
              href="https://www.instagram.com/copy_shop.ua"
              target="blank"
              aria-label="Instagram"
            >
              <Image
                src="/assets/instagram"
                width={32}
                height={32}
                alt="Instagram"
              />
            </a>
          </div>
        </Social>
      </Container>
    </>
  );
};

export default Footer;

const Wrapper = styled.footer`
  background: var(--mainBackground);
  box-shadow: var(--boxShadow);
  padding: 24px 0;
  li {
    list-style-type: none;
  }
  a {
    strong {
      text-transform: uppercase;
      font-weight: 600;
    }
  }
  & > div {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 0.75fr;
    gap: 24px;
    @media screen and (max-width: 1280px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
    & > div {
      width: 100%;
      display: grid;
      gap: 24px;
      align-self: flex-start;
      @media screen and (max-width: 1280px) {
        justify-content: center;
        text-align: center;
        width: 100%;
      }
    }
  }
`;

const Elem = styled.div`
  line-height: 1.5em;
  font-weight: 500;
  padding-left: 12px;
  a {
    padding: 6px;
    font-weight: 500;
  }
`;

const FooterLink = styled.li`
  margin-left: 12px;
  padding: 6px;
  a:hover {
    text-decoration: underline;
  }
`;

const Social = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
  a {
    filter: opacity(70%);
    transition-duration: var(--transitionDuration);
    &:hover {
      filter: opacity(100%);
    }
  }
  & > div:nth-child(2) {
    display: flex;
    justify-content: end;
    gap: 12px;
  }
`;
