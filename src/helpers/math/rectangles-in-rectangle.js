const getRectanglesNumber = (
  rectanglesWidth,
  rectanglesHeight,
  rectangleWidth,
  rectangleHeight
) => {
  const rectanglesRowsV1 = rectangleWidth / rectanglesWidth;
  const rectanglesColumnsV1 = rectangleHeight / rectanglesHeight;
  const rectanglesRowsV2 = rectangleHeight / rectanglesWidth;
  const rectanglesColumnsV2 = rectangleWidth / rectanglesHeight;
  let result;

  const rectanglesCountV1 =
    Math.floor(rectanglesRowsV1) * Math.floor(rectanglesColumnsV1);
  const rectanglesCountV2 =
    Math.floor(rectanglesRowsV2) * Math.floor(rectanglesColumnsV2);

  const rectanglesCount = Math.max(rectanglesCountV1, rectanglesCountV2);

  const boolean1 = rectanglesCount === rectanglesCountV1;
  const boolean2 = rectanglesCount === rectanglesCountV2;

  const boolean3 =
    Math.floor(rectanglesRowsV1) >
      Math.floor((rectangleWidth - 10) / rectanglesWidth) &&
    Math.floor(rectanglesColumnsV1) >
      Math.floor((rectangleHeight - 10) / rectanglesHeight);
  const boolean4 =
    Math.floor(rectanglesRowsV2) >
      Math.floor((rectangleHeight - 10) / rectanglesWidth) &&
    Math.floor(rectanglesColumnsV2) >
      Math.floor((rectangleWidth - 10) / rectanglesHeight);

  if ((boolean1 && boolean3) || (boolean2 && boolean4)) {
    result = rectanglesCount < 3 ? 1 : rectanglesCount - 2;
  } else {
    result = rectanglesCount < 1 ? 1 : rectanglesCount;
  }
  return result;
};

export default getRectanglesNumber;
