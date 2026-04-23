import getHexagonSideLength from "./hexagon-side-length";

const getHexagonsNumber = (apothem, rectangleWidth, rectangleHeight) => {
  // Calculate hexagon area (approximation based on inscribed circle)
  let coef = 1.1;
  if (apothem >= 30) {
    coef = 1.115;
  }
  if (apothem >= 45) {
    coef = 1.15;
  }
  if (apothem >= 60) {
    coef = 1.185;
  }
  if (apothem > 70) {
    coef = 1.34;
  }
  const circleRadius = getHexagonSideLength(apothem) / 2;
  const circleArea = Math.PI * circleRadius ** 2;
  const hexagonArea = circleArea * coef;

  // Calculate rectangle area
  const rectangleArea = rectangleWidth * rectangleHeight;

  // Calculate number of hexagons (approximate)
  return Math.floor(rectangleArea / hexagonArea) !== 0
    ? Math.floor(rectangleArea / hexagonArea)
    : 1;
};

export default getHexagonsNumber;
