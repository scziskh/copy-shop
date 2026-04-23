"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { useMemo } from "react";
import styled from "styled-components";

const BreadCrumbs = ({ path }) => {
  const locale = useLocale();
  const domain = "https://site.copy-shop.ua";

  const crumbs = useMemo(() => {
    const base = [{ name: "Copy Shop", link: `/${locale}`, position: 1 }];
    if (!path) return base;

    const dynamicCrumbs = path.map((item, index) => ({
      name: item.name,
      link: `${item.link}`,
      position: index + 2,
    }));

    return [...base, ...dynamicCrumbs];
  }, [path, locale]);

  const jsonLd = useMemo(() => {
    if (!crumbs || crumbs.length === 0) return null;

    return {
      "@context": "https://schema.org",
      name: crumbs[crumbs.length - 1]?.name || "Copy Shop Navigation",
      "@type": "BreadcrumbList",
      itemListElement: crumbs
        .filter((crumb) => crumb.name)
        .map((crumb) => ({
          "@type": "ListItem",
          position: crumb.position,
          name: String(crumb.name || "Copy Shop"),
          item: {
            "@id": `${domain}${crumb.link}/`,
            name: crumb.name,
          },
        })),
    };
  }, [crumbs, domain]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Wrapper>
        {crumbs.map((crumb, index) => (
          <li key={index}>
            <Link href={crumb.link}>
              <span>{crumb.name}</span>
            </Link>
          </li>
        ))}
      </Wrapper>
    </>
  );
};

export default BreadCrumbs;

const Wrapper = styled.ol`
  display: flex;
  list-style-type: none;
  height: 48px;
  width: 100%;
  padding: 0;
  margin: 0;

  & > li {
    align-self: center;
    padding-left: 6px;

    &:not(:last-child)::after {
      opacity: 0.8;
      content: "/";
      padding: 0 4px 0 8px;
    }

    &:last-child > a {
      color: var(--thirdColor);
      font-weight: 600;
      pointer-events: none;
    }

    & > a {
      opacity: 0.8;
      text-decoration: none;
      color: inherit;
      &:hover {
        opacity: 1;
        transition-duration: var(--transitionDuration);
      }
    }
  }
`;
