'use strict';

const CARDS_COUNT = 18;
const MIN_PRICE = 5000;
const MAX_PRICE = 20000;
const DISCOUNT_ROUND = 500;
const DISCOUNT_PERCENT = 1.15;
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
const DEBOUNCE_INTERVAL = 500;

const cards = [];

function getRandomNumber(minNumber, maxNumber) {
  return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
}

function dataGeneration() {
  let round = (a, b) => Math.round(a / b) * b;

  for (let i = 0; i < CARDS_COUNT; i++) {
    let productPrice = getRandomNumber(MIN_PRICE, MAX_PRICE);
    let url = IMG_URLS[getRandomNumber(0, IMG_URLS.length)];
    cards[i] = {
      url: `img/catalog/${url}.jpg`,
      brand: BRANDS[getRandomNumber(0, BRANDS.length)],
      title: TITLES[getRandomNumber(0, TITLES.length)],
      price: productPrice,
      category: CATEGORIES[getRandomNumber(0, CATEGORIES.length)],
      discount: round(productPrice * DISCOUNT_PERCENT, DISCOUNT_ROUND),
      flag: FLAGS[getRandomNumber(0, FLAGS.length)],
      isElectric: ELECTRIC_TYPE[getRandomNumber(0, ELECTRIC_TYPE.length)],
    };
  }
}

function renderMarkup(target, markup) {
  target.innerHTML = '';
  target.insertAdjacentHTML('afterbegin', markup);
}

const catalogList = document.querySelector('.catalog-list');

function renderCards(cardsData = cards) {
  const cards = cardsData
    .map(function (cardData) {
      return `<li class="catalog-item">
    <div class="actions">
      <a class="buy" href="#">Купить</a>
      <a class="bookmark" href="#">В закладки</a>
    </div>
    ${
      cardData.flag
        ? `<div class="flag flag-${cardData.flag}">
	    <span class="visually-hidden">
	       Новинка
	    </span>
    </div>`
        : ''
    }
    <div class="image">
      <img
        src="${cardData.url}"
        width="218"
        height="168"
        alt="${cardData.title}"
      />
    </div>
    <h3 class="item-title">${cardData.title}</h3>
    <span class="discount">${cardData.discount} Р.</span>
    <a class="button price" href="#">${cardData.price} Р.</a>
  </li>`;
    })
    .join('');
  renderMarkup(catalogList, cards);
}

function openModalWindow() {
  const openModalButton = document.querySelector('.contacts-button');
  const closeModalButton = document.querySelector('.modal-close ');
  const modalWindow = document.querySelector('.modal-write');
  const modalWrapper = document.querySelector('.modal');

  function showModal() {
    modalWindow.classList.add('modal-show');
    initListeners();
  }

  function initListeners() {
    closeModalButton.addEventListener('click', closeModal);
    document.addEventListener('keydown', onKeyDownModalClose);
  }

  function removeListeners() {
    closeModalButton.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', onKeyDownModalClose);
  }

  function onKeyDownModalClose(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeModal();
    }
  }

  function closeModal() {
    modalWindow.classList.remove('modal-show');
    removeListeners();
  }

  openModalButton.addEventListener('click', showModal);
}

let lastTimeout;

function debounce(callback, evt) {
  if (lastTimeout) {
    clearTimeout(lastTimeout);
  }
  lastTimeout = setTimeout(callback, DEBOUNCE_INTERVAL, evt);
}

function sortCards() {
  const sortList = document.querySelector('.sorting-list');

  function onSortListClick(evt) {
    evt.preventDefault();
    const button = evt.target.closest('li');

    function getSortedPrice() {
      return cards.sort(function (a, b) {
        return b.price - a.price;
      });
    }

    if (!button) {
      return;
    }

    if (button.dataset.type === 'price') {
      getSortedPrice();
      console.log('aaa');
      renderCards(getSortedPrice());
    }
  }

  sortList.addEventListener('click', onSortListClick);
}
dataGeneration();
console.log(cards);
renderCards();
openModalWindow();
sortCards();
