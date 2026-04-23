import config from "@/config";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export const generateStaticParams = async () => {
  const locales = ["uk", "ru"];
  const categories = config.products.categoriesList;

  return locales.flatMap((locale) =>
    categories.map((slug) => ({ locale, slug })),
  );
};

export const generateMetadata = async ({ params }) => {
  const { locale, slug } = await params;

  const t = await getTranslations({ locale, namespace: "CategoriesPage" });

  const schemaTitle = "Copy Shop";
  const seoTitle = t(`${slug}.title`);
  const description = t(`${slug}.description`);

  const baseUrl = "https://site.copy-shop.ua";
  const currentPath = `/${locale}/categories/${slug}/`;
  const fullUrl = `${baseUrl}${currentPath}`;

  return {
    title: seoTitle,
    description: description,
    metadataBase: new URL(baseUrl), // Додаємо базу для відносних посилань
    alternates: {
      canonical: currentPath,
      languages: {
        "uk-UA": `/uk/categories/${slug}/`,
        "ru-UA": `/ru/categories/${slug}/`,
        "x-default": `/uk/categories/${slug}/`,
      },
    },

    openGraph: {
      title: seoTitle, // Краще використовувати SEO заголовок категорії
      description: description,
      url: fullUrl,
      siteName: schemaTitle,
      locale: locale === "uk" ? "uk_UA" : "ru_RU",
      type: "website",
      images: [
        {
          url: `/schema/og-${slug}.jpg`,
          width: 1200,
          height: 630,
          alt: schemaTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: description,
      images: `/schema/og-${slug}.jpg`,
    },
  };
};

const CategoryLayout = ({ children, params: { locale } }) => {
  unstable_setRequestLocale(locale);

  return children;
};

export default CategoryLayout;
