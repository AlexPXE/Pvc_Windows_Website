"use strict"

function modalPop({modals, blocksSelector}) {
    const cashButtons = new Map ();    

    modals.forEach(({instance, openButtonsSelector}) => {
        document.querySelectorAll(openButtonsSelector).forEach(btn => {
            cashButtons.set(btn, instance);
        });
    });

    document.querySelectorAll(blocksSelector).forEach((block) => {
        block.addEventListener('click', e => {
           // e.preventDefault();
            let elem = e.target;
            if(cashButtons.has(elem)) {
                cashButtons.get(elem).open();
            }
        });
    });
}

export {modalPop};


//for example
/*
const instance = {
    modals: [{
        instance: new modalClass('modalSelector', 'closeBtnSelector', openTimer = null),
        openButtonsSelector: 'selectorButtons',
    }],
    blocksSelector: 'blocksSelector' //for listener
};*/