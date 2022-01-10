export default class ModalClass {
    constructor(modalSelector, closeBtnsSelector, openTimer = null) {
        
        this.modal = document.querySelector(modalSelector);
        this.closeBtnsCash = new Set(document.querySelectorAll(closeBtnsSelector));

        this.closeHandler = (e) => {
            let elem = e.target;         
            if(elem === this.modal || this.closeBtnsCash.has(elem)){
                this.close();
            }
        };       

        this.modal.style.cssText = "opacity: 0; transition: opacity 0.4s;";        

        this.modal.addEventListener('closemodal', e => {
            e.stopPropagation();
            this.close();
        });

        if(openTimer) {
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
            this.timerID = null;
        }

        this.modal.addEventListener('click', this.closeHandler); //add listener for close button
        document.body.style.overflow = 'hidden';
        this.modal.style.display = 'block';
        setTimeout(() => {
            this.modal.style.opacity = '1';
        });
    }

    close() {
        this.modal.removeEventListener('click', this.closeHandler); //remove listener for close button
        this.modal.style.opacity = '0';
        document.body.style.overflow = '';
        setTimeout(() => {            
            this.modal.style.display = 'none';
        }, 400);        
    }
}

export const closeModalEvent = new Event('closemodal', {bubbles: true});