export default class TooltipUg {
    constructor(cssText, position = 'top', showHidetime = '.4s') {
        
        const hide = (element) => {
            console.log('hide(): тултип ликвидирован');
            element.style.opacity = 0;
            setTimeout(() => {
                element.remove();
            }, 400);            
        };        

        const messageElement = document.createElement('div');       

        messageElement.style.cssText = `
        position: absolute;
        min-height: 40px;
        padding-left: 12px;
        padding-right: 6px;
        border: 1px solid;
        border-radius: 3px;        
        box-shadow: 5px 4px 7px #494a48;
        z-index: 10;
        opacity: 0;
        transition: opacity ${showHidetime}; 
         ${cssText}`;     
         
        const positionFunc = {
            'left': function({
                input: {x, y},
                message: {width: wMessage, height: hMessage}
            }) {

                if(x > wMessage) {
                    return {
                        x: x - wMessage,
                        y: window.pageYOffset + y
                    };
                }

                return {
                    x: 5,
                    y: y + window.pageYOffset - hMessage
                };
            },

            'right': function({
                input: {right: x, y},
                message: {width: wMessage, height: hMessage}                
            }) {
                const rigtBorder = document.documentElement.clientWidth - x;

                if(rigtBorder > wMessage) {
                    return {
                        x: x,
                        y: y + window.pageYOffset
                    };
                }

                return {
                    x: document.documentElement.clientWidth - wMessage,
                    y: y + window.pageYOffset - hMessage
                };
            },

            'top': function({
                input: {x, y},
                message: {height: hMessage}
            }) {
                return {
                    x: x,
                    y: y + window.pageYOffset - hMessage
                };
            },

            'bottom': function({
                input: {x, bottom: y},                
            }) {
                return {
                    x: x,
                    y: y + window.pageYOffset
                };
            }
        };

        
        this.show = (messageHTMLContent = 'message', element) => {
            
            const message = messageElement.cloneNode(false);            

            message.innerHTML = messageHTMLContent;
            document.body.prepend(message);

            let {x, y} = positionFunc[position]({
                input: element.getBoundingClientRect(),
                message: message.getBoundingClientRect()
            }); 
            
            message.style.top = `${y}px`;
            message.style.left = `${x}px`;

            setTimeout(() => {
                message.style.opacity = 1;
            });

            const ClickHandler = (e) => {
                if(e.target !== message) {
                    console.log('Тултип ликвидировался!');
                    document.removeEventListener('click', ClickHandler);
                    hide(message);
                }
            };

            document.addEventListener('click', ClickHandler);
        };
    }    
}

