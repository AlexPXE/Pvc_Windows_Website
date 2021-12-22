import './slider';
import modalPop from './modules/modals';
import tabs from './modules/tabs';

document.addEventListener('DOMContentLoaded', (e) => {
    modalPop('.header_btn', '.popup_engineer', '.popup_close');
    modalPop('.contact_us_wrap .phone_link', '.popup', '.popup_close', 5000);
    modalPop('.feedback_block .phone_link', '.popup', '.popup_close');
    tabs('.decoration_slider', '.decoration_item>div', '.decoration_content>div>div', 'after_click' );
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
});