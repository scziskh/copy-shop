import { getMessages } from "@/lib/messages";
import { createTranslator } from "next-intl";

export const generateMetadata = async ({ params: { locale, slug } }) => {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages });
  return {
    title: t(`Specials.${slug}.h2`),
    description: t(`Specials.${slug}.description`),
    metadataBase: new URL("https://site.copy-shop.ua"),
    alternates: {
      canonical: `/${locale}/specials/${slug}/`,
      languages: {
        ru: `/ru/specials/${slug}/`,
        uk: `/uk/specials/${slug}/`,
      },
    },
  };
};

const SpecialLayout = ({ children }) => {
  return children;
};

export default SpecialLayout;
