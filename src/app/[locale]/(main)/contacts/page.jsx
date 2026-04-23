"use client";

import BreadCrumbs from "@/components/breadcrumbs";
import FeedbackSection from "@/components/sections/feedback.section";
import Container from "@/layouts/container";
import { useTranslations } from "next-intl";
import styled from "styled-components";

const ContactsPage = () => {
  const pages = useTranslations("MenuHeader");
  return (
    <Container>
      <BreadCrumbs path={[{name: pages("contacts"), link: `/contacts`}]}/>
      <FeedbackSection />
      <GoogleMapWrapper>
        <GoogleMap
          width="100%"
          height="450"
          allowFullScreen=""
          aria-hidden="false"
          tabIndex={0}
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10167.755301565216!2d30.4997609!3d50.4236114!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf3942567b61%3A0x9e420f3cd2dc7c6e!2sCopy%20Shop!5e0!3m2!1sru!2sua!4v1731319307014!5m2!1sru!2sua"
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
        />
      </GoogleMapWrapper>
    </Container>
  );
};

const GoogleMap = styled.iframe`
  width: 100%;
  height: 450px;
  border: 0;
  outline: 0;
`;

const GoogleMapWrapper = styled.div`
  margin: 0 0 36px 0;
  overflow: hidden;
  width: 100%;
  height: 450px;
  border-radius: 12px;
`;

export default ContactsPage;
