// import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import 'css-star-rating/css/star-rating.css';
import axios from 'axios';

// Функція для запиту сервера
export async function getFeedbacks() {
  const baseURL = 'https://furniture-store-v2.b.goit.study/api';
  const endPoint = '/feedbacks';
  const url = baseURL + endPoint;
  const params = {
    limit: 10,
    page: 1,
  };
  const response = await axios.get(url, { params });
  return response.data;
}

// Функція для рендеру
function feedbackTemplate(feedback) {
  const rating = feedback.rate;
  const valueRating = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const halfClass = hasHalf ? 'half' : '';

  return `<li class="feedback-item swiper-slide">
  <div class="rating star-svg value-${valueRating} ${halfClass} color-default">
        <ul class="star-container">
          <li class="star">
          <svg class="star-empty">
                <use href="/img/star-rating.icons.svg#star-empty"></use>
            </svg>
             <svg class="star-half">
                <use href="/img/star-rating.icons.svg#star-half"></use>
            </svg>
            <svg class="star-filled">
                <use href="/img/star-rating.icons.svg#star-filled"></use>
            </svg>
          </li>
          <li class="star">
            <svg class="star-empty">
                <use href="/img/star-rating.icons.svg#star-empty"></use>
            </svg>
             <svg class="star-half">
                <use href="/img/star-rating.icons.svg#star-half"></use>
            </svg>
            <svg class="star-filled">
                <use href="/img/star-rating.icons.svg#star-filled"></use>
            </svg>
          </li>
          <li class="star">
            <svg class="star-empty">
                <use href="/img/star-rating.icons.svg#star-empty"></use>
            </svg>
             <svg class="star-half">
                <use href="/img/star-rating.icons.svg#star-half"></use>
            </svg>
            <svg class="star-filled">
                <use href="/img/star-rating.icons.svg#star-filled"></use>
            </svg>
          </li>
          <li class="star">
            <svg class="star-empty">
                <use href="/img/star-rating.icons.svg#star-empty"></use>
            </svg>
             <svg class="star-half">
                <use href="/img/star-rating.icons.svg#star-half"></use>
            </svg>
            <svg class="star-filled">
                <use href="/img/star-rating.icons.svg#star-filled"></use>
            </svg>
          </li>
          <li class="star">
            <svg class="star-empty">
                <use href="/img/star-rating.icons.svg#star-empty"></use>
            </svg>
             <svg class="star-half">
                <use href="/img/star-rating.icons.svg#star-half"></use>
            </svg>
            <svg class="star-filled">
                <use href="/img/star-rating.icons.svg#star-filled"></use>
            </svg>
          </li>
        </ul>
        </div>
        <p class="feedback-text">${feedback.descr}</p>
        <p class="feedback-author">${feedback.name}</p>
      </li>`;
}

export function feedbacksTemplate(feedbacks) {
  return feedbacks.map(feedbackTemplate).join('');
}

// Загальна логіка
const feedbackList = document.querySelector('.feedback-list');

document.addEventListener('DOMContentLoaded', async () => {
  // ДОПИСАТИ приховати кнопки навігації і пагінації
  // ДОПИСАТИ loader start
  try {
    const res = await getFeedbacks();
    feedbackList.insertAdjacentHTML(
      'afterbegin',
      feedbacksTemplate(res.feedbacks)
    );
    // ДОПИСАТИ показати кнопки навігації і пагінації
  } catch (error) {
    // ДОПИСАТИ show Error message
  } finally {
    // ДОПИСАТИ loader finish
  }
});

// Налаштування Swiper and Pagination
// const swiper = new Swiper('.mySwiper', {
//   // Optional parameters
//   direction: 'vertical',
//   loop: false,

//   // If we need pagination
//   pagination: {
//     el: '.swiper-pagination',
//   },

//   // Navigation arrows
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
// });

// Функції, щоб зробити кнопки активними і неактивними

const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

function makeActiveBtn(nameBtn) {
  nameBtn.removeAttribute('disabled');
}

function makeDisabledBtn(nameBtn) {
  nameBtn.setAttribute('disabled', '');
}

// Функції, щоб зробити елемент видимим і невидимим
//НЕ ПРАЦЮЄ ЧОМУСЬ

function showElem(elem) {
  elem.classList.remove('hidden');
}

function hideElem(elem) {
  elem.classList.add('hidden');
}
