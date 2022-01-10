import { closeModalEvent } from './modalClass';
import { сreatValidationFunction } from './validateinput';
import MessageClass from './message';

function forms(url, inputsObjArg = {}) {
    
        
    const message = new MessageClass({
        loadingMsg: "Отправка данных...",
        successMsg: "Спасибо за обращение, наш менеджер скоро свяжется с Вами.",
        failureMsg: "Ошибка отправки данных. Попробуйте позже.",
        textStyle: 'font-size: 16px; font-weight: 700',
        successEvent: closeModalEvent
    });       

    function validateInputsFabric(inputNameFuncNameObj, functionCreator) {
        const cash = new Map();

        const reduceCallback = (valid, input) => {                
            if(input.hasAttribute('name')) {                    
                let attributeVal = input.getAttribute('name');

                if(cash.has(attributeVal)) {
                    return cash.get(attributeVal)(input) && valid;
                }
            }
            return true;            
        };

        for(let inputName in inputNameFuncNameObj) {
            if(inputNameFuncNameObj.hasOwnProperty(inputName)) {
                let {funcName: name, tooltipPosition: position} = inputNameFuncNameObj[inputName];
                cash.set(inputName, functionCreator(name, position));
            }            
        }

        return (form) => {
            let inputs = [...form.querySelectorAll('input')];
            return inputs.reduce(reduceCallback, true);
        };
    }

    const validateForm = validateInputsFabric(inputsObjArg, сreatValidationFunction);

    async function postData(url, data) {
        return await fetch(url, {
            method: "POST",
            body: data,
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => res.ok)
        .catch(err => {
            console.log('Error: ', err.message);
            return false;
        });
    }

    document.body.addEventListener('submit', async (e) => {        
        e.preventDefault();    
        const form = e.target;             
        if(validateForm(form)) {
            let formObj = Object.fromEntries(new FormData(form).entries()); //create an object from a form                
            formObj.action = form.submit.innerText;
            await message.showMessage(form, [form.submit])(postData(url, JSON.stringify(formObj)));
        }   
    });
}

export default forms;
