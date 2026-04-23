import Fallback from "@/components/fallback";
import loading from "./loading.svg";

const Loading = () => {
  return (
    <>
      <Fallback loading={loading} />
    </>
  );
};

export default Loading;
