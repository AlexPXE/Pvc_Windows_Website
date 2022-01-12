import './slider';
import ModalClass from './modules/modalClass';
import {modalPop} from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import popupCalc from './modules/caclc';
import timer from './modules/timer';
import imgs from './modules/imgs';


document.addEventListener('DOMContentLoaded', (e) => {
    
    modalPop({modals: [{
            instance: new ModalClass('.popup_engineer', '.popup_engineer .popup_close > strong', 4000),
            openButtonsSelector: '.header .header_btn',
        }, {
            instance: new ModalClass('.popup', '.popup .popup_close > strong'),
            openButtonsSelector: '.header .phone_link, .feedback .phone_link',
        }],                
        blocksSelector: '.header, .feedback' //a click listener will be added here
    });
    

    tabs({
        blockTabsSelector: '.glazing_slider', 
        tabsSelector: '.glazing_block', 
        contenSelector: '.glazing_content', 
        activeClass: 'active', 
        inAnimation: 'bounceIn', 
        outAnimation: 'bounceOut',         
    });
    
    tabs({
        blockTabsSelector: '.decoration_slider', 
        tabsSelector: '.decoration_item > div', 
        contenSelector: '.decoration_content > div>div', 
        activeClass: 'after_click', 
        inAnimation: 'bounceIn', 
        outAnimation: 'zoomOut',              
    });
    
    tabs({
        blockTabsSelector: '.balcon_icons', 
        tabsSelector: '.balcon_icons_img', 
        contenSelector: '.big_img.text-center > img', 
        activeClass: 'do_image_more',                 
        display: 'inline'
    });
    

    forms('http://localhost:3003/posts', {
        'user_name': {
            funcName: 'name',
            tooltipPosition: 'top'
        },
        'user_phone': {
            funcName: 'phone',
            tooltipPosition: 'bottom'
        }
    });
    
    popupCalc({
        startWindow: {
            selector: '.popup_calc',
            closeBtnSelector:'.popup_calc_close > strong',
            nextBtnSelector:'.popup_calc .popup_calc_button',
            activeClass:'.balcon_icons .do_image_more',        
            'lengthmm': '#width, #height'
        },
        secondWindow: {
            selector: '.popup_calc_profile',
            closeBtnSelector:'.popup_calc_profile_close > strong',
            nextBtnSelector:'.popup_calc_profile .popup_calc_profile_button',
            'select': '#view_type',
            'checkbox': '.popup_calc_profile .checkbox'
        },
        finishWindow: {
            selector: '.popup_calc_end',
            closeBtnSelector:'.popup_calc_end_close > strong',
            nextBtnSelector:'.popup_calc_end button[name="submit"]',
            'name': '.popup_calc_end input[name = "user_name"]',
            'phone': '.popup_calc_end input[name = "user_phone"]'
        },        
        blockSelector: 'section.glazing',  //a click listener will be added here
        startBtnsSelector: '.popup_calc_btn',
        url:'http://localhost:3003/posts'
    });

    timer({
        daySelrctor:'#days',
        hoursSelector:'#hours',
        minutesSelector:'#minutes',
        secondsSelector:'#seconds',
        deadlineString:'12 01 2022 19 00'
    });

    imgs({
        blockSelector: '.works',
        imgsSelector: '.works .preview',
    });

    /*
    const argsExample = {
    startWindow: {
        selector: '',
        closeBtnSelector:'',
        nextBtnSelector:'',
        activeClass:'',        
    },
    secondWindow: {
        selector: '',
        closeBtnSelector:'',
        nextBtnSelector:'',
        'valid func name': 'inputs selector',
    },
    finishWindow: {
        selector: '',
        closeBtnSelector:'',
        nextBtnSelector:'',
        'valid func name': 'inputs selector',
    },
    blockSelector: ''
    startBtnsSelector: '',
    url:'http://....'

};*/

   /* const g = document.querySelector('.form.main_form');
    let {bottom, height,left, right, top, width, x, y} = g.getBoundingClientRect();
    
    window.addEventListener('scroll', (e) => {

        ({bottom, height,left, right, top, width, x, y} = g.getBoundingClientRect());
        console.log(
            'bottom: ', bottom,
            '\nheight: ', height,
            '\nleft: ', left,
            '\nright: ', right,
            '\ntop: ', top,
            '\nwidth: ', width,
            '\nx: ', x,
            '\ny: ', y
        );
    });*/
});
