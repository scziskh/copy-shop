import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async (params) => {
  const locale = params.locale || "uk";
  const messages = (await import(`../messages/${locale}`)).default;

  return {
    messages,
  };
});
