"use client";
import { useTranslations } from "next-intl";
import Categories from "../page";
import BreadCrumbs from "@/components/breadcrumbs";
import Container from "@/layouts/container";

const Category = ({ params }) => {
  const { slug } = params;
  const t = useTranslations("Navigation");
  const categoryName = t(slug) || slug;

  return (
    <>
      <Container>
        <BreadCrumbs
          path={[{ name: categoryName, link: `/categories/${slug}` }]}
        />
      </Container>
      <Categories category={slug} />
    </>
  );
};

export default Category;
