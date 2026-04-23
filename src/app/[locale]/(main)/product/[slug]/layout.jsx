import config from "@/config";
import { getMessages } from "@/lib/messages";
import { createTranslator } from "next-intl";

export const generateStaticParams = async () => {
  return config.products.productsList.map((slug) => ({ slug }));
};

export const generateMetadata = async ({ params: { locale, slug } }) => {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages });
  return {
    title: t(`ProductPage.${slug}.title`),
    description: t(`ProductPage.${slug}.description`),
    metadataBase: new URL("https://site.copy-shop.ua"),
    alternates: {
      canonical: `/${locale}/product/${slug}/`,
      languages: {
        ru: `/ru/product/${slug}/`,
        uk: `/uk/product/${slug}/`,
      },
    },
  };
};

const ProductLayout = ({ children }) => {
  return children;
};

export default ProductLayout;
