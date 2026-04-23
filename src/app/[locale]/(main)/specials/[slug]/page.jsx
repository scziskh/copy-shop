import config from "@/config";
import SpecialSection from "../../../../../components/sections/specials.page";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const specials = config.specials;

  return specials.map((special) => ({
    slug: special,
  }));
}

const SpecialPage = ({ params }) => {
  return <SpecialSection params={params} />;
};

export default SpecialPage;
