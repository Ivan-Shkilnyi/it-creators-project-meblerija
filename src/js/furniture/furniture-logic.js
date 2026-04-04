import { fetchCategories, fetchFurniture } from './furniture-api.js';
import {
  createCategoriesMarkup,
  createFurnitureMarkup,
  appendFurniture,
} from './furniture-render.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  categoriesList: document.querySelector('#categories'),
  furnitureList: document.querySelector('#furniture-list'),
  loadMoreBtn: document.querySelector('#load-more'),
  loader: document.querySelector('#loader'),
};

let currentCategory = '';
let currentPage = 1;

// ---------- Init-categories ----------

const CATEGORIES_ORDER = [
  'Всі товари',
  'М’які меблі',
  'Шафи та системи зберігання',
  'Ліжка та матраци',
  'Столи',
  'Стільці та табурети',
  'Кухні',
  'Меблі для дитячої',
  'Меблі для офісу',
  'Меблі для передпокою',
  'Меблі для ванної кімнати',
  'Садові та вуличні меблі',
  'Декор та аксесуари',
];

export async function initCategories() {
  try {
    refs.loader.classList.remove('hidden');
    const apiCategories = await fetchCategories();

    const finalCategories = CATEGORIES_ORDER.map(name => {
      const found = apiCategories.find(c => c.name.trim() === name.trim());
      return {
        _id: name === 'Всі товари' ? '' : found ? found._id : 'temp-id',
        name: name,
      };
    });

    refs.categoriesList.innerHTML = createCategoriesMarkup(finalCategories);

    const firstBtn = refs.categoriesList.querySelector('.category-btn');
    if (firstBtn) firstBtn.classList.add('is-active');

    await renderFurnitureSection('', 1);
  } catch (error) {
    console.error(error);
  } finally {
    refs.loader.classList.add('hidden');
  }
}

// --------------- Load More ---------------

refs.loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    await renderFurnitureSection(currentCategory, currentPage);

    const firstCard = document.querySelector('.furniture-item');
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
  } catch (error) {
    iziToast.error({
      message: 'Сталася помилка. Спробуйте пізніше',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

// --------------- additional functions ---------------

function showLoader() {
  refs.loader.classList.add('is-visible');
}

function hideLoader() {
  refs.loader.classList.remove('is-visible');
}

function showLoadMoreButton() {
  refs.loadMoreBtn.classList.add('is-visible');
}

function hideLoadMoreButton() {
  refs.loadMoreBtn.classList.remove('is-visible');
}
