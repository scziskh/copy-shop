"use client";

import { useTranslations } from "next-intl";
import Script from "next/script";

const getLocaleBusiness = (locale, t) => {
  const baseUrl = "https://site.copy-shop.ua";
  const currentUrl = `${baseUrl}/${locale}/`;
  const mainDescription = t("HomePage.description");
  const mainImage = `${baseUrl}/schema/og-main.jpg`;

  return [
    {
      "@context": "http://schema.org",
      "@type": "PrintShop",
      "@id": `${baseUrl}/#organization`,
      name: "Copy Shop™",
      legalName: "ТОВ «Копі Шоп»",
      description: mainDescription,
      image: mainImage,
      logo: `${baseUrl}/schema/logo.jpg`,
      url: currentUrl,
      telephone: t("Feedback.phone.contact"),
      email: "sale@copy-shop.ua",
      taxID: "43334342",
      priceRange: "UAH 10-40000",
      foundingDate: "2015-01-01",
      hasMap: "https://www.google.com/maps?cid=11351187425176124526",
      address: {
        "@type": "PostalAddress",
        streetAddress: t("Locations.amosova.address"),
        addressLocality: "Kyiv",
        addressRegion: "Kyiv City",
        postalCode: "03038",
        addressCountry: "UA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "50.422324",
        longitude: "30.4678506",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      sameAs: [
        "https://www.instagram.com/copy_shop.ua",
        "https://www.facebook.com/copyshopua",
        "https://t.me/yevhenii_copy_shop_ua",
      ],
    },
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Copy Shop™",
      description: mainDescription,
      publisher: { "@id": `${baseUrl}/#organization` },
      inLanguage: locale === "uk" ? "uk-UA" : "ru-RU",
    },
  ];
};

const LocalBusiness = ({ locale }) => {
  const t = useTranslations();
  return (
    <>
      <Script
        id="localBusiness"
        key={"LocalBusiness"}
        type="application/ld+json"
      >
        {JSON.stringify(getLocaleBusiness(locale, t))}
      </Script>
    </>
  );
};

export default LocalBusiness;
