"use strict"
class ModalClass {
    constructor(modalSelector, closeBtnSelector, openTimer = 0) {
        
        this.modal = document.querySelector(modalSelector);
        this.closeBtn = document.querySelector(closeBtnSelector);        
        this.closeHandler = (e) => {
            let elem = e.target;
            console.log(elem);
            console.log(this.closeBtn);
            if(elem === this.modal || elem === this.closeBtn){
                this.close();
            }
        };       

        this.modal.style.cssText = "opacity: 0; transition: opacity 0.8s;";        

        if(openTimer){
            this.timerID = setTimeout(() => {
                this.open();
            }, openTimer);
        } else {
            this.timerID = null;
        }
    }    

    open() {
        if(this.timerID) {
            clearInterval(this.timerID);
        }

        this.modal.addEventListener('click', this.closeHandler);
        document.body.style.overflow = 'hidden';
        this.modal.style.display = 'block';
        setTimeout(() => {
            this.modal.style.opacity = '1';
        });
    }

    close() {
        this.modal.removeEventListener('click', this.closeHandler);
        this.modal.style.opacity = '0';
        document.body.style.overflow = '';
        setTimeout(() => {            
            this.modal.style.display = 'none';
        }, 800);        
    }
}

function modalPop({modals, blocksSelector}) {
    const cashButtons = new Map ();    

    modals.forEach(({instance, openButtonsSelector}) => {
        document.querySelectorAll(openButtonsSelector).forEach(btn => {
            cashButtons.set(btn, instance);
        });
    });

    document.querySelectorAll(blocksSelector).forEach((block) => {
        block.addEventListener('click', e => {
            e.preventDefault();
            let elem = e.target;
            if(cashButtons.has(elem)) {
                cashButtons.get(elem).open();
            }
        });
    });
}

export {ModalClass, modalPop};


//for example
/*
const instance = {
    modals: [{
        instance: 'new modalClass',
        openButtonsSelector: 'selectorButtons',
    }],
    blocksSelector: 'blocksSelector' //for listener
};*/