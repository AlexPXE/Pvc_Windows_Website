import TooltipUg from './tooltipClass';


function validateInput() {
        
    const checkFunctions = {
        'name': function(inputElement) {
            const message = [];

            let inputString = inputElement.value.replace(/-{2,}| {2,}/g, match => {
                switch(match[0]) {
                    case ' ':
                        return ' ';
                    case '-':
                        return '-';
                }
            }).replace(/(?<=^)[ -]+|[ -]+(?=$)/g, '');

            /^$|.{31,}/u.test(inputString) && message.push('-Имя должно содержать от 1-го до 30-ти символов;');

            /[^\p{L} -]/u.test(inputString) && message.push('-Допускается ввод только букв, символов " " и "-";');

            /\S+ \S+ |\S- | -\S|\S+-\S+-/ug.test(inputString) && message.push('-Допускается ввод от 1-го до 2-х слов<br>разделенных пробелом;');
            
            console.log(message);
            inputElement.value = inputString;
            return message;
        },

        'phone': function(inputElement) {
            const message = [];
            let inputString = inputElement.value.replace(/\D+/gu, '');
            !/^[7-8]\d{10,10}$/.test(inputString) && message.push('-Пример: <br>+7 982 123-45-67;<br>+79821234567;<br>8 982 123-45-67;<br>89821234567');
            
            console.log(message);
            inputElement.value = inputString;
            return message;
        },

        'lengthmm': function(inputElement) {
            const message = [];
            let inputString = inputElement.value.replace(/[^\d]|(?<=^)0+(?=$)|(?<=^)0+[1-9]/g, '');

            /(?<=^)\d{6,}(?=$)/.test(inputString) && message.push('-Число дллжно состаять, не более<br>чем из пяти цифр;');
            /^$/.test(inputString) && message.push('-Строка не должна быть пустой.');

            inputElement.value = inputString;            
            return message;
        },
        'checkbox': function(checkbox) {
            const message = [];
            return message;
        },        
        'select': function(select){
            const message = [];
            return message;
        }
    };

    return (validationType, tooltipPositin = 'top') => {
        const tooltip = new TooltipUg('background-color: #bffff9; font-size: 12px', tooltipPositin);
        const validate = checkFunctions[validationType];        
       
        return (inputElement) => {           
            
            if(inputElement.tagName === 'INPUT' || inputElement.tagName === 'SELECT') {

                const messageArray = validate(inputElement);

                if(messageArray.length === 0) {     //input is valid
                    console.log(true);
                    return true;
                }
                
                tooltip.show(messageArray.join('<br>'), inputElement); //input is not valid
            }
            return false;
        };
    };
}

export const сreatValidationFunction = validateInput();
