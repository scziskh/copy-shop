import Script from "next/script";

const event = ({ action, category, value }) => (
  <Script id="" strategy="lazyOnload">
    {`
      gtag('event', '${action}', {
        event_category: '${category}',
        value: '${value}',
      });
    `}
  </Script>
);

export const viewItem = (value) =>
  event({
    action: "view_item",
    category: "ecommerce",
    value,
  });
export const addToCart = (value) =>
  event({
    action: "add_to_cart",
    category: "ecommerce",
    value,
  });
export const beginCheckout = (value) =>
  event({
    action: "begin_checkout",
    category: "ecommerce",
    value,
  });
export const addShippingInfo = (value) =>
  event({
    action: "add_shipping_info",
    category: "ecommerce",
    value,
  });
export const addPaymentInfo = (value) =>
  event({
    action: "add_shipping_info",
    category: "ecommerce",
    value,
  });
export const purchase = (value) =>
  event({
    action: "purchase",
    category: "ecommerce",
    value,
  });
