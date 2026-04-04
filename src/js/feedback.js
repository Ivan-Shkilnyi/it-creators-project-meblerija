// Функція для запиту сервера

import axios from 'axios';

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

import 'css-star-rating/css/star-rating.css';

function feedbackTemplate(feedback) {
  const rating = feedback.rate;
  const valueRating = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const halfClass = hasHalf ? 'half' : '';

  return `<li class="feedback-item">
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
  // loader start
  try {
    const res = await getFeedbacks();
    feedbackList.insertAdjacentHTML(
      'afterbegin',
      feedbacksTemplate(res.feedbacks)
    );
  } catch (error) {
    // show Error message
  } finally {
    // loader finish
  }
});
