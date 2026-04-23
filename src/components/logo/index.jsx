import { useLocale, useTranslations } from "next-intl";
import Image from "@/components/image";
import Link from "next/link";

const Logo = (props) => {
  const t = useTranslations("Logo");
  const locale = useLocale();

  return (
    <Link href={`/${locale}`}>
      <Image
        src={t("src")}
        width={props.width ?? 90}
        height={props.height ?? 60}
        alt={t("alt")}
        priority={true}
        title={t("title")}
      />
    </Link>
  );
};

export default Logo;
