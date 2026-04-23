import { redirect } from "next/navigation";

export const generateMetadata = async () => {
  return {
    title: "Copy Shop — Оперативна Поліграфія в Києві",
    description:
      "Copy Shop — це поліграфія цифрового, офсетного, шовкотрафаретного й широкоформатного друку з широкии спектром післядрукарських послуг в Києві.",
    metadataBase: new URL("https://site.copy-shop.ua"),
    alternates: {
      canonical: `/uk/`,
      languages: {
        ru: "/ru/",
        uk: "/uk/",
      },
    },
  };
};

export default async function RootPage() {
  redirect("uk");
}
