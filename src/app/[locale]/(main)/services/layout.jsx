import { createTranslator } from "next-intl";
import { getMessages } from "@/lib/messages";

export const generateMetadata = async ({ params: { locale } }) => {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages });
  return {
    title: t("ServicesPage.title"),
    description: t("ServicesPage.description"),
    metadataBase: new URL("https://site.copy-shop.ua"),
    alternates: {
      canonical: `/${locale}/services/`,
      languages: {
        ru: `/ru/services/`,
        uk: `/uk/services/`,
      },
    },
  };
};

const ServicesLayout = async ({ children }) => {
  return children;
};

export default ServicesLayout;
