import config from "@/config";

export const dynamic = "force-static";
export const revalidate = false;

export const generateStaticParams = () => {
  return [{}];
};

export const GET = () => {
  const baseUrl = "https://site.copy-shop.ua";
  const locales = ["uk", "ru"];
  const { productsList } = config.products;
  const categoriesList = [
    "business-cards",
    "multipage-printing",
    "stickers-and-labels",
    "invitations-and-envelopes",
    "photo-services",
    "marketing-and-office",
    "calendars",
    "large-format",
    "silk-screen-printing",
    "pos-materials",
    "clothes",
  ];

  const servicesList = [
    "digital-printing",
    "copy",
    "scan",
    "wide-printing",
    "cutting",
    "silk-screen-printing",
    "foil-stamping",
    "stamping",
    "plotter",
    "lamination",
    "designer",
    "folding",
  ];

  const specialsList = config.specials;

  const nowDate = new Date().toISOString();

  const staticPages = locales.flatMap((locale) => [
    { url: `${baseUrl}/${locale}/`, priority: 1.0 },
    { url: `${baseUrl}/${locale}/contacts/`, priority: 0.5 },
    { url: `${baseUrl}/${locale}/services/`, priority: 0.6 },
    { url: `${baseUrl}/${locale}/about-us/`, priority: 0.4 },
    { url: `${baseUrl}/${locale}/specials/`, priority: 0.4 },
    { url: `${baseUrl}/${locale}/payment-delivery/`, priority: 0.4 },
    { url: `${baseUrl}/${locale}/layout-requirements/`, priority: 0.4 },
    { url: `${baseUrl}/${locale}/terms/`, priority: 0.4 },
    { url: `${baseUrl}/${locale}/privacy-policy/`, priority: 0.4 },
    { url: `${baseUrl}/${locale}/service-rules/`, priority: 0.4 },
  ]);

  const products = productsList.flatMap((product) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/products/${product}/`,
      priority: 1.0,
    })),
  );

  const categories = categoriesList.flatMap((category) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/categories/${category}/`,
      priority: 0.8,
    })),
  );

  const services = servicesList.flatMap((service) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/services/${service}/`,
      priority: 0.7,
    })),
  );

  const specials = specialsList.flatMap((service) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/specials/${service}/`,
      priority: 0.5,
    })),
  );

  const allPages = [
    ...staticPages,
    ...products,
    ...categories,
    ...services,
    ...specials,
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      (page) => `
    <url>
      <loc>${page.url}</loc>
      <lastmod>${nowDate}</lastmod>
      <priority>${page.priority}</priority>
    </url>`,
    )
    .join("")}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
