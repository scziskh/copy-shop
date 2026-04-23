import { createTranslator } from "next-intl";
import { getMessages } from "@/lib/messages";

export const generateMetadata = async ({ params: { locale } }) => {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages });
  return {
    title: `${t("Cart.name")} – Copy Shop`,
    metadataBase: new URL("https://site.copy-shop.ua"),
    alternates: {
      canonical: `/${locale}/cart/`,
      languages: {
        ru: "/ru/cart/",
        uk: "/uk/cart/",
      },
    },
  };
};

const CartLayout = async ({ children }) => {
  return children;
};

export default CartLayout;
