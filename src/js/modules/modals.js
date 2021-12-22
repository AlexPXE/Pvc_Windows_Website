"use strict"

function modalPop(btnSelector, popupSelector, closeSelector, showModalByTime = 0) {
    const btn = document.querySelector(btnSelector);
    const popup = document.querySelector(popupSelector);
    const closeBtn = popup.querySelector(closeSelector);  
    
    function openHandler() {
        let flag = typeof(showModalByTime) === 'number' ? !!showModalByTime : false;
        const id = flag ? setTimeout(wOpen, showModalByTime) : 0;
        
        function wOpen(){
            popup.addEventListener('click', closeHandler);
            popup.style.display = 'block';

            setTimeout(() => {
                popup.style.opacity = "1";
                document.body.style.overflow = 'hidden';
            });
        }

        return function (e) {
            if(e.target) {
                e.preventDefault();

                if(flag){
                    clearInterval(id);
                    flag = false;
                }
                wOpen();               
            }       
        };
    }

    popup.style.cssText = "opacity: 0; transition: opacity 0.8s;";       
    

    function closeHandler(e) {        
        let elem = e.target;

        if(elem && elem.closest('button') == closeBtn || elem == popup){
            popup.style.opacity = "0";
            document.body.style.overflow = '';

            setTimeout(() => {
            popup.style.display = '';            
            }, 800);        
            popup.removeEventListener('click', closeHandler);
        }    
    }

    btn.addEventListener('click', openHandler());    
}

export default modalPop;


