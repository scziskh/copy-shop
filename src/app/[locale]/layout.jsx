import StyledComponentsRegistry from "@/lib/registry";
import { intl } from "@/config/intl.config";
import { NextIntlClientProvider } from "next-intl";
import StoreProvider from "@/layouts/store-provider";
import { unstable_setRequestLocale } from "next-intl/server";
import GoogleAnalytics from "@/components/google-analytics";

export const generateStaticParams = async () => {
  return intl.locales.map((locale) => ({ locale }));
};

export const metadata = {
  verification: {
    google: "on90SqppCqB6WZm7HdUzKKXOpZ9pSknpLIkteViN5Ig",
  },
};

export const dynamic = "force-static";

const LocaleLayout = async ({ children, params }) => {
  // У Next.js 15+ або деяких версіях 14 краще деструктуризувати params ось так:
  const { locale } = params;

  // 1. Обов'язково повідомляємо про локаль
  unstable_setRequestLocale(locale);

  // 2. Для статичного експорту надійніше імпортувати повідомлення напряму,
  // щоб не залежати від роботи внутрішніх функцій getMessages()
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const timeZone = "Europe/Kyiv";

  return (
    <html lang={locale}>
      <body>
        <GoogleAnalytics />
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone={timeZone}
        >
          <StyledComponentsRegistry>
            <StoreProvider>{children}</StoreProvider>
          </StyledComponentsRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
