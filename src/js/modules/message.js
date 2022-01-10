export default class MessageClass {
    constructor({loadingMsg = 'Sending data...', successMsg = 'Success!', failureMsg = 'Fail!', textStyle = '', successEvent = new Event('successMsg', {buble: true})}) {
        const messageElement = document.createElement('div');        
        messageElement.style.cssText = textStyle;
        
        const hideMessage = () => {
            messageElement.innerText = '';
            messageElement.remove();
        };

        const blockUnblockInputs = (inputs) => {
            inputs.forEach(input => {
                if(input.hasAttribute('readonly')) {
                    input.removeAttribute('readonly');
                } else {
                    input.setAttribute('readonly', '');
                }
            });
        };

        const hideElements = elemets => {
            elemets.forEach(elem => {
                elem.style.display = 'none';
            });
        };

        const showElements = elements => {
            elements.forEach(elem => {
                elem.style.display = 'block';
            });
        };       
        
        
        this.showMessage = function(form, elementsToHide) {            
            let inputs = form.querySelectorAll('input');

            blockUnblockInputs(inputs);
            form.style.height = window.getComputedStyle(form).height;
            hideElements(elementsToHide);
            messageElement.innerText = loadingMsg;
            form.append(messageElement);

            return async promise => {
                let success = await promise;
                if(success) {
                    messageElement.innerText = successMsg;
                    form.reset();
                    setTimeout(() => form.dispatchEvent(successEvent), 4300);                                        
                } else {
                    messageElement.innerText = failureMsg;                    
                }
                setTimeout(() => {
                    hideMessage();
                    showElements(elementsToHide);
                    blockUnblockInputs(inputs);
                }, 4000);

                return success;
            };      
        };
    }     
    
}

