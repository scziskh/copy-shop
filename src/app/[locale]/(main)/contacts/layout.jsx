import { createTranslator } from "next-intl";
import { getMessages } from "@/lib/messages";

export const generateMetadata = async ({ params: { locale } }) => {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages });
  return {
    title: t("ContactsPage.title"),
    description: t("ContactsPage.description"),
    metadataBase: new URL("https://site.copy-shop.ua"),
    alternates: {
      canonical: `/${locale}/contacts/`,
      languages: {
        ru: `/ru/contacts/`,
        uk: `/uk/contacts/`,
      },
    },
  };
};

const ContactsLayout = async ({ children }) => {
  return children;
};

export default ContactsLayout;
