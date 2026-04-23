"use client";

import Container from "@/layouts/container";
import { useTranslations } from "next-intl";
import { styled } from "styled-components";

const PaymentDeliveryInfo = () => {
  const t = useTranslations("PaymentDeliveryInfo");
  const locations = useTranslations("Locations");
  return (
    <Wrapper>
      <Container>
        <Column>
          <div>
            <h2>{t("paymentHeader")}</h2>
            <ul>
              <li>{t("non-cash")}</li>
            </ul>
            <span>{t("paymentDescription")}</span>
          </div>
          <div>
            <h2>{t("deliveryHeader")}</h2>
            <ul>
              <li>{t("post")}</li>
              <li>
                {t("self")}
                <ul>
                  <li>{locations("amosova.address")}</li>
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <h2>{t("returnHeader")}</h2>
            <p>{t("returnDescription")}</p>
          </div>
        </Column>
      </Container>
    </Wrapper>
  );
};

export default PaymentDeliveryInfo;

const Wrapper = styled.div`
  margin-top: 24px;
  background: var(--mainBackground);
  padding: 24px 0;
  box-shadow: var(--boxShadow);
  h2 {
    padding-bottom: 18px;
  }
  ul {
    margin-left: 1em;
    li {
      margin: 0.5em 0;
    }
  }
  span {
    font-weight: 600;
  }
`;

const Column = styled.div`
  display: flex;
  gap: 24px;
  @media screen and (max-width: 1024px) {
    flex-wrap: wrap;
  }
  & > div {
    width: calc(100% / 3);
    @media screen and (max-width: 1024px) {
      flex-wrap: wrap;
      width: 100%;
      justify-items: center;
    }
  }
`;
