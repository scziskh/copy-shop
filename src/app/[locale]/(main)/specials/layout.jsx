import { createTranslator } from "next-intl";
import { getMessages } from "@/lib/messages";

export const generateMetadata = async ({ params: { locale } }) => {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages });
  return {
    title: t("Specials.title"),
    description: t("Specials.description"),
    metadataBase: new URL("https://site.copy-shop.ua"),
    alternates: {
      canonical: `/${locale}/specials/`,
      languages: {
        ru: `/ru/specials/`,
        uk: `/uk/specials/`,
      },
    },
  };
};

const SpecialsLayout = async ({ children }) => {
  return children;
};

export default SpecialsLayout;
