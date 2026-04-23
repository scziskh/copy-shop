import "@/globals.css";
import PageLayout from "@/layouts/page-layout";
import { getMessages } from "@/lib/messages";
import { Suspense } from "react";
import Loading from "./loading";
import Messangers from "@/components/messangers";

const LocaleLayout = async ({ children, params }) => {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <PageLayout locale={locale} messages={messages}>
      <Messangers />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </PageLayout>
  );
};

export default LocaleLayout;
