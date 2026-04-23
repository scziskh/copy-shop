/*Configs*/
import config from "@/config";
import { images } from "./config";
import SimpleProductSection from "../../../../../components/sections/product.page";
import { viewItem } from "@/components/google-analytics/events";
import BreadCrumbs from "@/components/breadcrumbs";
import Container from "@/layouts/container";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateStaticParams() {
  const locales = ["uk", "ru"];
  const products = config.products.productsList;

  return locales.flatMap((locale) =>
    products.map((slug) => ({
      locale,
      slug,
    })),
  );
}

const SimpleProduct = async ({ params }) => {
  const { slug, locale } = params;

  unstable_setRequestLocale(locale);

  const categoryTranslation = await getTranslations({
    locale,
    namespace: "Navigation",
  });
  const productTranslation = await getTranslations({
    locale,
    namespace: "Products",
  });

  const category = config.products.productCategory[slug];
  const ViewItem = viewItem(slug);

  return (
    <>
      {ViewItem}
      <Container>
        <BreadCrumbs
          path={[
            {
              name: categoryTranslation(category),
              link: `/${locale}/categories/${category}`,
            },
            {
              name: productTranslation(`${slug}.name`),
              link: `/${locale}/product/${slug}`,
            },
          ]}
        />
      </Container>
      <SimpleProductSection params={params} images={images} />
    </>
  );
};

export default SimpleProduct;
