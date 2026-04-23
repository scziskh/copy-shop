import Blanks from "@/components/preview/previews/blanks";
import Certificates from "@/components/preview/previews/certificates";
import Flyers from "@/components/preview/previews/flyers";
import StandartBusinessCards from "@/components/preview/previews/standart-business-card";
import StandartInvitationCards from "@/components/preview/previews/standart-invitation-cards";
import Stickers from "@/components/preview/previews/stickers";
import StaplesCalculator from "@/helpers/calculator/broshures/staples";
import SpringCalculator from "@/helpers/calculator/broshures/spring";
import CalculatorBoxes from "@/helpers/calculator/calculator-boxes";
import CalculatorSingleSheet from "@/helpers/calculator/single-sheet";
import CalculatorStandartBCards from "@/helpers/calculator/standart-business-cards";
import CalculatorStickers from "@/helpers/calculator/stickers";
import DiplomsCalculator from "@/helpers/calculator/broshures/diploms";
import ThermobinderCalculator from "@/helpers/calculator/broshures/book";
import WidePrintingCalculator from "@/helpers/calculator/wide-printing/index";

export const Calculator = {
  "standart-business-cards": (data) => new CalculatorStandartBCards(data),
  booklets: (data) => new CalculatorSingleSheet(data),
  certificates: (data) => new CalculatorSingleSheet(data),
  flyers: (data) => new CalculatorSingleSheet(data),
  "standart-invitation-cards": (data) => new CalculatorSingleSheet(data),
  blanks: (data) => new CalculatorSingleSheet(data),
  batteryboxes: (data) => new CalculatorBoxes(data),
  stickers: (data) => new CalculatorStickers(data),
  "staple-brochures": (data) => new StaplesCalculator(data),
  "spring-brochures": (data) => new SpringCalculator(data),
  diploms: (data) => new DiplomsCalculator(data),
  books: (data) => new ThermobinderCalculator(data),
  posters: (data) => new WidePrintingCalculator(data),
  banners: (data) => new WidePrintingCalculator(data),
};

export const calculatorPreview = {
  "standart-business-cards": (params) => (
    <StandartBusinessCards params={params} />
  ),
  booklets: (params) => <Flyers params={params} />,
  certificates: (params) => <Certificates params={params} />,
  flyers: (params) => <Flyers params={params} />,
  "standart-invitation-cards": (params) => (
    <StandartInvitationCards params={params} />
  ),
  blanks: (params) => <Blanks params={params} />,
  batteryboxes: () => <></>,
  stickers: (params) => <Stickers params={params} />,
  "staple-brochures": () => <></>,
  "spring-brochures": () => <></>,
  diploms: () => <></>,
  books: () => <></>,
  posters: () => <></>,
  banners: () => <></>,
};

export const calculator = {
  "standart-business-cards": [
    {
      input: "SELECTION",
      name: "FORMAT",
      content: ["90x50", "85x55"],
    },
    {
      input: "SELECTION",
      name: "PAPER",
      content: ["300", "300DNS", "400DNS"],
    },
    {
      input: "SELECTION",
      name: "PRINTING",
      content: ["COLOR", "GRAYSCALE"],
    },
    {
      input: "SELECTION",
      name: "SIDES",
      content: ["2", "1"],
    },
    {
      input: "SELECTION",
      name: "LAMINATION",
      content: [
        "NO_LAMINATION",
        "1_MATT",
        "2_MATT",
        "1_GLOSSY",
        "2_GLOSSY",
        "1_VELVET",
        "2_VELVET",
        "2_THICK_MATT",
        "2_THICK_GLOSSY",
      ],
    },
    {
      input: "SELECTION",
      name: "CORNERS",
      content: ["RIGHT_CORNERS", "ROUND_CORNERS"],
    },
    {
      input: "NUMBER",
      name: "COUNT",
    },
  ],
  booklets: [
    {
      input: "SELECTION",
      name: "FORMAT",
      content: ["Eurobooklet", "Eurobooklet_2", "A6", "A5", "A4", "A3"],
    },
    {
      input: "SELECTION",
      name: "PAPER",
      content: ["130", "150", "170"],
    },
    {
      input: "SELECTION",
      name: "PRINTING",
      content: ["COLOR", "GRAYSCALE"],
    },
    {
      input: "SELECTION",
      name: "SIDES",
      content: ["2", "1"],
    },
    {
      input: "SELECTION",
      name: "LAMINATION",
      content: [
        "NO_LAMINATION",
        "1_MATT",
        "2_MATT",
        "1_GLOSSY",
        "2_GLOSSY",
        "1_VELVET",
        "2_VELVET",
      ],
    },
    {
      input: "SELECTION",
      name: "FOLDING",
      content: ["0", "1", "2"],
    },
    {
      input: "NUMBER",
      name: "COUNT",
    },
  ],
  flyers: [
    {
      input: "SELECTION",
      name: "FORMAT",
      content: ["Eurobooklet", "A6", "A5", "A4", "A3"],
    },
    {
      input: "SELECTION",
      name: "PAPER",
      content: ["130", "150", "170", "80"],
    },
    {
      input: "SELECTION",
      name: "PRINTING",
      content: ["COLOR", "GRAYSCALE"],
    },
    {
      input: "SELECTION",
      name: "SIDES",
      content: ["2", "1"],
    },
    {
      input: "SELECTION",
      name: "LAMINATION",
      content: [
        "NO_LAMINATION",
        "1_MATT",
        "2_MATT",
        "1_GLOSSY",
        "2_GLOSSY",
        "1_VELVET",
        "2_VELVET",
      ],
    },
    {
      input: "NUMBER",
      name: "COUNT",
    },
  ],
  certificates: [
    {
      input: "SELECTION",
      name: "FORMAT",
      content: ["A4", "A5", "A6", "A3"],
    },
    {
      input: "SELECTION",
      name: "PAPER",
      content: ["250", "300", "300DNS", "400DNS"],
    },
    {
      input: "SELECTION",
      name: "PRINTING",
      content: ["COLOR", "GRAYSCALE"],
    },
    {
      input: "SELECTION",
      name: "SIDES",
      content: ["1", "2"],
    },
    {
      input: "SELECTION",
      name: "LAMINATION",
      content: [
        "NO_LAMINATION",
        "1_MATT",
        "2_MATT",
        "1_GLOSSY",
        "2_GLOSSY",
        "1_VELVET",
        "2_VELVET",
        "2_THICK_MATT",
        "2_THICK_GLOSSY",
      ],
    },
    {
      input: "NUMBER",
      name: "COUNT",
    },
  ],
  "standart-invitation-cards": [
    {
      input: "SELECTION",
      name: "FORMAT",
      content: ["A5", "A4", "A3", "A6"],
    },
    {
      input: "SELECTION",
      name: "PAPER",
      content: ["250", "300"],
    },
    {
      input: "SELECTION",
      name: "PRINTING",
      content: ["COLOR", "GRAYSCALE"],
    },
    {
      input: "SELECTION",
      name: "SIDES",
      content: ["2", "1"],
    },
    {
      input: "SELECTION",
      name: "FOLDING",
      content: ["0", "1"],
    },
    {
      input: "SELECTION",
      name: "LAMINATION",
      content: [
        "NO_LAMINATION",
        "1_MATT",
        "2_MATT",
        "1_GLOSSY",
        "2_GLOSSY",
        "1_VELVET",
        "2_VELVET",
      ],
    },
    {
      input: "NUMBER",
      name: "COUNT",
    },
  ],
  blanks: [
    {
      input: "SELECTION",
      name: "FORMAT",
      content: ["A4", "A5", "A6"],
    },
    {
      input: "SELECTION",
      name: "PAPER",
      content: ["120DNS", "160DNS", "80"],
    },
    {
      input: "SELECTION",
      name: "PRINTING",
      content: ["COLOR", "GRAYSCALE"],
    },
    {
      input: "SELECTION",
      name: "SIDES",
      content: ["1"],
    },
    {
      input: "NUMBER",
      name: "COUNT",
    },
  ],
  batteryboxes: [
    {
      input: "SELECTION",
      name: "BOX",
      content: ["160", "200", "250"],
    },
    {
      input: "NUMBER",
      name: "COUNT",
    },
  ],
  stickers: [
    {
      input: "SELECTION",
      name: "FORM",
      content: ["SQUARE", "ROUND"],
    },
    {
      input: "STICKER_SIZE",
      name: "STICKER_SIZE",
    },
    {
      name: "HEIGHT",
    },
    {
      name: "WIDTH",
    },
    {
      input: "SELECTION",
      name: "MATERIAL",
      content: ["FILM", "PAPER"],
    },
    {
      input: "SELECTION",
      name: "PRINTING",
      content: ["COLOR", "GRAYSCALE"],
    },
    {
      input: "SELECTION",
      name: "LAMINATION",
      content: [
        "NO_LAMINATION",
        "2_MATT",
        "2_GLOSSY",
      ],
    },
    {
      input: "NUMBER",
      name: "COUNT",
    },
  ],
  "staple-brochures": [
    {
      input: "SELECTION",
      name: "FORMAT",
      content: ["A4", "A5", "A6"],
    },
    {
      input: "MULTIPLY",
      name: "COVER",
      content: [
        {
          input: "SELECTION",
          name: "PAPER",
          content: ["NO_PAPER", "130", "150", "170", "200", "250", "300"],
        },
        {
          input: "SELECTION",
          name: "PRINTING",
          content: ["COLOR", "GRAYSCALE"],
        },
        {
          input: "SELECTION",
          name: "SIDES",
          content: ["1", "2"],
        },
        {
          input: "SELECTION",
          name: "LAMINATION",
          content: [
            "NO_LAMINATION",
            "1_MATT",
            "2_MATT",
            "1_GLOSSY",
            "2_GLOSSY",
          ],
        },
      ],
    },
    {
      input: "MULTIPLY",
      name: "INER",
      content: [
        {
          input: "SELECTION",
          name: "PAPER",
          content: ["80", "130", "150", "170", "200"],
        },
        {
          input: "SELECTION",
          name: "PRINTING",
          content: ["COLOR", "GRAYSCALE"],
        },
        {
          input: "SELECTION",
          name: "LAMINATION",
          content: ["NO_LAMINATION", "2_MATT", "2_GLOSSY"],
        },
        {
          input: "NUMBER",
          name: "PAGES",
        },
      ],
    },
    {
      input: "NUMBER",
      name: "COUNT",
    },
  ],
  "spring-brochures": [
    {
      input: "SELECTION",
      name: "FORMAT",
      content: ["A4", "A5", "A6"],
    },
    {
      input: "SELECTION",
      name: "BINDING",
      content: ["PLASTIC_SPRING", "METAL_SPRING"],
    },
    {
      input: "MULTIPLY",
      name: "INER",
      content: [
        {
          input: "SELECTION",
          name: "PAPER",
          content: ["80", "130", "150", "170", "200"],
        },
        {
          input: "SELECTION",
          name: "PRINTING",
          content: ["COLOR", "GRAYSCALE"],
        },
        {
          input: "SELECTION",
          name: "SIDES",
          content: ["2", "1"],
        },
        {
          input: "SELECTION",
          name: "LAMINATION",
          content: ["NO_LAMINATION", "2_MATT", "2_GLOSSY"],
        },
        {
          input: "NUMBER",
          name: "PAGES",
        },
      ],
    },
    {
      input: "NUMBER",
      name: "COUNT",
    },
  ],
  diploms: [
    {
      input: "NUMBER",
      name: "COLOR_PAGES",
    },
    {
      input: "NUMBER",
      name: "GRAYSCALE_PAGES",
    },
  ],
  books: [
    {
      input: "SELECTION",
      name: "FORMAT",
      content: ["A4", "A5", "A6"],
    },
    {
      input: "MULTIPLY",
      name: "COVER",
      content: [
        {
          input: "SELECTION",
          name: "PAPER",
          content: ["130", "150", "170", "200", "250", "300"],
        },
        {
          input: "SELECTION",
          name: "PRINTING",
          content: ["COLOR", "GRAYSCALE"],
        },
        {
          input: "SELECTION",
          name: "SIDES",
          content: ["1", "2"],
        },
        {
          input: "SELECTION",
          name: "LAMINATION",
          content: ["NO_LAMINATION", "1_MATT", "1_GLOSSY"],
        },
      ],
    },
    {
      input: "MULTIPLY",
      name: "INER",
      content: [
        {
          input: "SELECTION",
          name: "PAPER",
          content: ["80", "130", "150", "170", "200"],
        },
        {
          input: "SELECTION",
          name: "PRINTING",
          content: ["COLOR", "GRAYSCALE"],
        },
        {
          input: "SELECTION",
          name: "SIDES",
          content: ["2", "1"],
        },
        {
          input: "NUMBER",
          name: "PAGES",
        },
      ],
    },
    {
      input: "NUMBER",
      name: "COUNT",
    },
  ],
  posters: [
    {
      input: "WIDE_PRINTING_SIZE",
      name: "WIDE_PRINTING_SIZE",
    },
    {
      name: "HEIGHT",
    },
    {
      name: "WIDTH",
    },
    {
      input: "SELECTION",
      name: "WIDE_PAPER",
      content: ["150", "140", "180"],
    },
    {
      input: "SELECTION",
      name: "FORMAT",
      content: ["A0", "A1", "A2", "CUSTOM"],
    },
    {
      input: "NUMBER",
      name: "COUNT",
    },
  ],
  banners: [
    {
      input: "SELECTION",
      name: "WIDE_PAPER",
      content: ["BANNER_510", "BANNER_440"],
    },
    {
      input: "SELECTION",
      name: "FORMAT",
      content: ["800_1800", "800_2000", "1000_2000", "CUSTOM"],
    },
    {
      input: "WIDE_PRINTING_SIZE",
      name: "WIDE_PRINTING_SIZE",
    },
    {
      name: "HEIGHT",
    },
    {
      name: "WIDTH",
    },
    {
      input: "SELECTION",
      name: "LUVERS",
      content: ["NO_LUVERS", "LINEAR", "CORNER"],
    },
    {
      input: "NUMBER",
      name: "COUNT",
    },
  ],
};
