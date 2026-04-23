import { getMessages } from "@/lib/messages";
import { createTranslator } from "next-intl";

export const generateMetadata = async ({ params: { locale } }) => {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages });
  const title = t(`CategoriesPage.title`) || "Copy Shop";
  const description = t(`CategoriesPage.description`) || "Copy Shop";
  return {
    title,
    description,
    metadataBase: new URL("https://site.copy-shop.ua"),
    alternates: {
      canonical: `/${locale}/categories/`,
      languages: {
        ru: "/ru/categories/",
        uk: "/uk/categories/",
      },
    },
  };
};

const CategoriesLayout = ({ children }) => {
  return <>{children}</>;
};

export default CategoriesLayout;
