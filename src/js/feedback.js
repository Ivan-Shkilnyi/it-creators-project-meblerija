import { getFeedbacks } from './feedback-api';
import { feedbacksTemplate } from './feedback-render';

const feedbackList = document.querySelector('.feedback-list');

document.addEventListener('DOMContentLoaded', async () => {
  // loader start
  try {
    const res = await getFeedbacks();
    feedbackList.insertAdjacentHTML(
      'beforebegin',
      feedbacksTemplate(res.feedbacks)
    );
  } catch (error) {
    // show Error message
  } finally {
    // loader finish
  }
});
