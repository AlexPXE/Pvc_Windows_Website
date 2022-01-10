//animate.css needed


function tabs({blockTabsSelector, tabsSelector, contenSelector, activeClass, inAnimation = "flipInX", outAnimation = "flipOutX", display = 'block'}) {
    const tabsBlock = document.querySelector(blockTabsSelector);      
    const tabsNodeList = tabsBlock.querySelectorAll(tabsSelector);
    const contentTabs = document.querySelectorAll(contenSelector);   
    
    function tabHandlerFabric(tabsNodeList, itemsNodeList, activeClass) {        
        const tabsCash = new Map();    
        let notInProgress = true;

        tabsNodeList.forEach((val, ind) => {            //preparation tabs
            val.classList.remove(activeClass);
            itemsNodeList[ind].style.display = "none";
            itemsNodeList[ind].classList.add('animated');
            tabsCash.set(val, itemsNodeList[ind]);
        });

        function togleTab(activateTab, deactivateTab) {
            let link = activateTab.querySelector('a');

            deactivateTab && deactivateTab.classList.remove(activeClass);
            activateTab && activateTab.classList.add(activeClass);            
            link && link.focus();
        }

        function showElement(elem) {
            tabsCash.get(elem).style.display = display;  
        }

        function hideElement(elem) {
            tabsCash.get(elem).style.display = 'none';               
        }
        
        function animateCSS(elem, nameOfAnimation) {  //animation function
            return  new Promise(resolve => {
                elem.classList.add(nameOfAnimation);
                console.log(elem);

                elem.addEventListener('animationend', (e) => {
                    console.log('Animation end!');
                    elem.classList.remove(nameOfAnimation);
                    resolve();
                }, {once: true});
            });
        }        

        let activeTab = tabsNodeList[0];          
        togleTab(activeTab);
        showElement(activeTab);
        
        return async function(e) {
            
            let elem = e.target.closest(tabsSelector);

            if(notInProgress && elem && tabsCash.has(elem) && elem != activeTab) {       
                notInProgress = false;
                togleTab(elem, activeTab);                
                await animateCSS(tabsCash.get(activeTab), outAnimation);
                hideElement(activeTab);                
                showElement(elem);                                                            
                await animateCSS(tabsCash.get(elem), inAnimation);
                activeTab = elem;
                notInProgress = true;                
            }
        };
    }
    
    tabsBlock.addEventListener('click', tabHandlerFabric(tabsNodeList, contentTabs, activeClass) );
}

export default tabs;