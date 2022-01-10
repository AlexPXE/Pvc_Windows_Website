import { closeModalEvent } from './modalClass';
import ModalClass from "./modalClass";
import {сreatValidationFunction} from "./validateinput";
import MessageClass from "./message";

export default function popupCalc({
    startWindow,
    secondWindow,
    finishWindow,
    blockSelector,
    startBtnsSelector,
    url
}) {

    class ModalNode {
        constructor(windowOpt, validationFuncCreator) {            

            let {selector, closeBtnSelector, nextBtnSelector, activeClass, ...rest} = windowOpt;           

            const defaultGetData = () => {        
                let data = {};
                this.inputs.forEach((input) => {
                    data[input.hasAttribute('id') ? input.getAttribute('id') : input.getAttribute('name')] = 
                    input.getAttribute('type') == 'checkbox' ? input.checked : input.value;
                });
        
                return data;
            };

            this.resetData = () => {
                this.inputs.forEach((input) => {
                    
                    switch(input.tagName) {
                        case 'SELECT':
                            input.value = input.options[0].value;
                            break;
                        case 'INPUT':
                            if(input.getAttribute('type') === 'checkbox'){
                                input.checked = false;
                            } else {
                                input.value ='';
                            }
                    }

                });
            };

            this.modal = new ModalClass(selector, closeBtnSelector);
            this.btn = document.querySelector(nextBtnSelector);
            console.log(nextBtnSelector, this.btn);
     
    
            if(activeClass) {
                this.getData = function() {
                    let data = {};
                    data.windowType = document.querySelector(`${activeClass} > img`).getAttribute('alt');

                    this.inputs.forEach((input) => {
                        
                        data[input.hasAttribute('id') ? input.getAttribute('id') : input.getAttribute('name')] = 
                        input.getAttribute('type') == 'checkbox' ? input.checked : input.value;
                    });

                    return data;
                };
            } else {
                this.getData = defaultGetData;
            }

            if(Object.keys(rest).length > 0) {
                const cashInputs = new Map();                       

                for(let name in rest) {

                    if(rest.hasOwnProperty(name)) {
                        const func = validationFuncCreator(name, 'top');

                        let d = document.querySelectorAll(rest[name]).forEach((elem) => {
                            cashInputs.set(elem, func);
                        });
                    }
                }

                this.validate = () => {
                    let valid = true;
                    for(let [elem, func] of cashInputs){
                        valid = func(elem) && valid;
                        console.log(valid);
                    }
                    return valid;
                };    

                this.inputs = [...cashInputs.keys()];
                console.log(this.inputs);
            }           
        }        
    }
    
    class ModalList {
        constructor(url) {
            const list = [];
            let formsData = {};
            let last = -1;
            let current = 0;

            const message = new MessageClass({
                loadingMsg: 'Отправка данных...',
                successMsg: 'Спасибо за обращние, наши менеджеры скоро свяжутся с вами.',
                failureMsg: 'Ошибка отправки данных, пожалуйста проверьте соединение.',
                textStyle: 'font-size: 16px; font-weight: 700',
                successEvent: closeModalEvent
            });

            const resetData = () => {
                for(let i = 0; i < last; i++) {
                    list[i].resetData();
                }
            };
            const submitData = async (url, data) => {
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
            };            

            const handler = async (e) => { 
                e.stopPropagation();
                e.preventDefault();               
                let btn = e.target;
                
                if(btn === list[current].btn && list[current].validate()) {                    
                    console.log('Хандлер!');
                    if(next()){
                        let success = await message.showMessage(btn.form, [btn])( submitData(url, JSON.stringify(formsData)));
                        if(success){
                            resetData();
                        }
                    }
                }
            };
            
            const removeListener = ({btn}) => {
                btn.removeEventListener('click', handler);
            };

            const addListener = ({btn}) => {
                btn.addEventListener('click', handler);
            };

            const collectFormData = () => {
                formsData = {...formsData, ...list[current].getData()};
                console.log(formsData);
            };

            const next = () => {
                
                removeListener(list[current]);                    
                collectFormData();                
                console.log('Next');      
                
                if(current < last) {              
                    
                    list[current].modal.close();
                    addListener(list[++current]);                
                    list[current].modal.open();

                    return false;
                }
                return true; 
            };                

            this.add = (ModalN) => {   
                if(ModalN instanceof ModalNode){
                    list.push(ModalN);
                    ++last;
                }
                return this;
            };

            this.start = () => {
                formsData = {};
                console.log(list[current]);
                removeListener(list[current]);
                current = 0;
                addListener(list[current]);
                list[current].modal.open();
            };
        }
    }   

    const calc = new ModalList(url)
                    .add( new ModalNode(startWindow, сreatValidationFunction))
                    .add( new ModalNode(secondWindow, сreatValidationFunction))
                    .add( new ModalNode(finishWindow, сreatValidationFunction));

    
    const btnsBlock = document.querySelector(blockSelector);
    const startBtns = new Set(btnsBlock.querySelectorAll(startBtnsSelector));

    btnsBlock.addEventListener('click', (e) => {        
        if(startBtns.has(e.target)){
            calc.start();
        }
    });
}
   
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