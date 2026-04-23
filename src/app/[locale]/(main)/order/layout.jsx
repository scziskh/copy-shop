import { createTranslator } from "next-intl";
import { getMessages } from "@/lib/messages";

export const generateMetadata = async ({ params: { locale } }) => {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages });
  return {
    title: `${t("Order.name")} – Copy Shop`,
    metadataBase: new URL("https://site.copy-shop.ua"),
    alternates: {
      canonical: `/${locale}/order/`,
      languages: {
        ru: `/ru/order/`,
        uk: `/uk/order/`,
      },
    },
  };
};

const OrderLayout = async ({ children }) => {
  return children;
};

export default OrderLayout;
