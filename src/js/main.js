import './slider';
import {ModalClass, modalPop} from './modules/modals';
import tabs from './modules/tabs';

document.addEventListener('DOMContentLoaded', (e) => {
    
    modalPop({modals: [{
            instance: new ModalClass('.popup_engineer', '.popup_engineer .popup_close > strong', 4000),
            openButtonsSelector: '.header .header_btn',
        }, {
            instance: new ModalClass('.popup', '.popup .popup_close>strong'),
            openButtonsSelector: '.header .phone_link, .feedback .phone_link',
        }],        
        blocksSelector: '.header, .feedback'
    });

    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active', 'bounceIn', 'bounceOut');
    tabs('.decoration_slider', '.decoration_item>div', '.decoration_content>div>div', 'after_click', 'bounceIn', 'zoomOut' );
    
});