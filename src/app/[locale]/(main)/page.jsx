import PaymentDeliveryInfo from "@/components/payment-delivery-info";
import AddressSection from "@/components/sections/address.section";
import FeedbackSection from "@/components/sections/feedback.section";
import ProductsSection from "@/components/sections/products.section";
import SliderSection from "@/components/sections/slider.section";
import Container from "@/layouts/container";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export const generateMetadata = async ({ params: { locale } }) => {
  const t = await getTranslations({ locale, namespace: "HomePage" });

  const schemaTitle = "Copy Shop™";
  const seoTitle = t("title");
  const description = t("description");

  const baseUrl = "https://site.copy-shop.ua";
  const currentPath = `/${locale}/`;
  const fullUrl = `${baseUrl}${currentPath}`;

  return {
    title: seoTitle,
    description: description,
    alternates: {
      canonical: fullUrl,
      languages: {
        "uk-UA": `${baseUrl}/uk/`,
        "ru-UA": `${baseUrl}/ru/`,
        "x-default": `${baseUrl}/uk/`,
      },
    },

    openGraph: {
      title: schemaTitle,
      description: description,
      url: fullUrl,
      siteName: schemaTitle,
      locale: locale === "uk" ? "uk_UA" : "ru_RU",
      type: "website",
      images: [
        {
          url: `${baseUrl}/schema/og-main.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: schemaTitle,
      description: description,
      images: `${baseUrl}/schema/og-main.jpg`,
    },
  };
};

export default async function HomePage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  return (
    <>
      <SliderSection />
      <AddressSection />
      <ProductsSection />
      <PaymentDeliveryInfo />
      <Container>
        <div className="padding-24">
          <FeedbackSection />
        </div>
      </Container>
    </>
  );
}
