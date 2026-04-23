import { getMessages } from "@/lib/messages";
import { createTranslator } from "next-intl";

export const generateMetadata = async ({ params: { locale } }) => {
  const slug = "copy";
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages });
  return {
    title: `${t(`ServicesPage.${slug}.title`)}`,
    description: `${t(`ServicesPage.${slug}.description`)}`,
    metadataBase: new URL("https://site.copy-shop.ua"),
    alternates: {
      canonical: `/${locale}/services/${slug}/`,
      languages: {
        ru: `/ru/services/${slug}/`,
        uk: `/uk/services/${slug}/`,
      },
    },
  };
};

const ServicesLayout = ({ children }) => {
  return children;
};

export default ServicesLayout;
