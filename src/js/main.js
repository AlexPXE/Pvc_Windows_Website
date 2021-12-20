import './slider';
import modalPop from './modules/modals';

document.addEventListener('DOMContentLoaded', (e) => {
    modalPop('.header_btn', '.popup_engineer', '.popup_close');
    modalPop('.contact_us_wrap .phone_link', '.popup', '.popup_close', 5000);
    modalPop('.feedback_block .phone_link', '.popup', '.popup_close');
});