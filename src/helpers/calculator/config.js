export const PRODUCT_DEFAULTS = {
  "staple-brochures": {
    pages: 24,
    count: 10,
  },
  "spring-brochures": {
    pages: 50,
    count: 10,
  },
  books: {
    pages: 50,
    count: 5,
  },
  "standart-business-cards": {
    pages: 0,
    count: 100,
    price: 230, // Дефолтная цена, если API недоступно
  },
  stickers: {
    count: 1, // Будет пересчитано функцией math.js
  },
};

/**
 * Размеры для широкоформатной печати (в мм)
 */
export const POSTER_SIZES = {
  A0: { w: 841, h: 1189 },
  A1: { w: 594, h: 841 },
  A2: { w: 420, h: 594 },
  "800_1800": { w: 800, h: 1800 },
  "800_2000": { w: 800, h: 2000 },
  "1000_2000": { w: 1000, h: 2000 },
};

/**
 * Дополнительные настройки для валидации или шагов калькулятора
 */
export const CALCULATOR_STEPS = {
  "staple-brochures": 4, // Кратность страниц для брошюровки на скобу
  default: 1,
};
