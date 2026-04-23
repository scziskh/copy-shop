import styled from "styled-components";
import config from "@/config";

const Preview = (props) => {
  const { params, product } = props;
  return (
    <Wrapper $params={params}>
      {config.calculatorPreview[product](params)}
    </Wrapper>
  );
};
export default Preview;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  & > div:first-child {
    background-image: ${({ $params }) =>
      $params?.LAMINATION === "2_GLOSSY"
        ? 'url("/assets/filters/glossy");'
        : "none"};
    background-size: cover;
  }

  & > div:last-child {
    background-image: ${({ $params }) =>
      $params?.LAMINATION === "1_GLOSSY" || $params?.LAMINATION === "2_GLOSSY"
        ? 'url("/assets/filters/glossy");'
        : "none"};
    background-size: cover;
  }

  & > div {
    border-radius: ${({ $params }) =>
      $params?.CORNERS === "ROUND_CORNERS"
        ? "24px"
        : $params.FORM === "ROUND"
        ? "100%"
        : "0"};
    transition: all var(--transitionDuration);
    aspect-ratio: ${({ $params }) => {
      switch ($params?.FORMAT) {
        case undefined:
          return $params?.WIDTH
            ? $params?.FORM !== "ROUND"
              ? +$params?.WIDTH > +$params?.HEIGHT
                ? +$params.WIDTH / +$params.HEIGHT
                : +$params.HEIGHT / +$params.WIDTH
              : 1
            : 0;
        case "85x55":
          return 1.55;
        case "90x50":
          return 1.8;
        case "Eurobooklet":
          return 0.47;
        case "Eurobooklet_2":
          return 0.95;
        default:
          return 0.7;
      }
    }};
    background-color: ${({ $params }) => {
      switch ($params?.PAPER) {
        case "80":
          return "white";
        case "120DNS":
          return "white";
        case "160DNS":
          return "white";
        case "300DNS":
          return "white";
        case "400DNS":
          return "white";
        default:
          return "#fffff5";
      }
    }};
    & > div {
      transition: filter var(--transitionDuration);
      filter: ${({ $params }) =>
        $params?.PRINTING === "GRAYSCALE" ? "grayscale(1);" : "grayscale(0);"};
    }
  }
`;
