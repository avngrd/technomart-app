'use strict';

const CARDS_COUNT = 18;
const MIN_PRICE = 5000;
const MAX_PRICE = 20000;
const DISCOUNT_ROUND = 500;
const DISCOUNT_PERCENT = 0.15;
const IMG_URLS = ['bosch-2000', 'bosch-3000', 'bosch-6000', 'bosch-9000', 'makita-td-110'];
const BRANDS = ['BOSCH', 'Makita', 'Vagner', 'Mega', 'Proline'];
const TITLES = [
  'Перфоратор BOSCH BFG 2000',
  'Перфоратор BOSCH BFG 3000',
  'Перфоратор BOSCH BFG 6000',
  'Перфоратор BOSCH BFG 9000',
  'Шуруповерт Makita TD-110',
];
const FLAGS = ['new', 'promo', ''];
const CATEGORIES = ['Перфораторы', 'Шуруповерты', 'Ключи', 'Отвертки'];
const ELECTRIC_TYPE = [true, false];

let PRICES = [];
let cards = [];

function getRandomNumber(minNumber, maxNumber) {
  let min = Math.floor(minNumber);
  let max = Math.ceil(maxNumber);
  return Math.ceil(Math.random() * (max - min)) + min;
}

function dataGeneration() {
  function generatePrices() {
    for (let i = 0; i < CARDS_COUNT; i++) {
      PRICES[i] = Math.ceil(getRandomNumber(MIN_PRICE, MAX_PRICE));
    }
  }
  generatePrices();

  let round = (a, b) => Math.round(a / b) * b;

  for (let i = 0; i < CARDS_COUNT; i++) {
    let url = IMG_URLS[getRandomNumber(-1, IMG_URLS.length - 1)];
    cards[i] = {
      url: `img/catalog/${url}.jpg`,
      brand: BRANDS[getRandomNumber(-1, BRANDS.length - 1)],
      title: TITLES[getRandomNumber(-1, TITLES.length - 1)],
      price: PRICES[i],
      category: CATEGORIES[getRandomNumber(-1, CATEGORIES.length - 1)],
      discount: round(PRICES[i] * DISCOUNT_PERCENT, DISCOUNT_ROUND),
      flag: FLAGS[getRandomNumber(-1, FLAGS.length - 1)],
      isElectric: ELECTRIC_TYPE[getRandomNumber(-1, ELECTRIC_TYPE.length - 1)],
    };
  }
  console.log(cards);
}

dataGeneration();
