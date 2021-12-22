function tabs(blockTabsSelector, tabsSelector, contenSelector, activeClass) {
    const tabsBlock = document.querySelector(blockTabsSelector);      
    const tabsNodeList = tabsBlock.querySelectorAll(tabsSelector);
    const contentTabs = document.querySelectorAll(contenSelector);   
    
    function tabHandlerFabric(tabsNodeList, itemsNodeList, activeClass) {        
        const tabsCash = new Map();    

        tabsNodeList.forEach((val, ind) => {
            val.classList.remove(activeClass);
            itemsNodeList[ind].style.display = "none";            
            tabsCash.set(val, itemsNodeList[ind]);
        });

        function activateTab(elem) {
            elem.classList.add(activeClass);
            tabsCash.get(elem).style.display = "block";
        }

        function deactivateTab(elem) {
            elem.classList.remove(activeClass);                        
            tabsCash.get(elem).style.display = "none";
        }

        function focusLinkInTab(elem) {             //if there is a link inside the element, focus on the link
            elem && elem.querySelector('a').focus();
        }

        let activeTab = tabsNodeList[0];  
        activateTab(activeTab);

        return function(e) {
            let elem = e.target.closest(tabsSelector);

            if(elem && tabsCash.has(elem) && elem != activeTab) {                
                deactivateTab(activeTab);
                activateTab(elem);
                focusLinkInTab(elem);
                activeTab = elem;
            }
        };
    }

    tabsBlock.addEventListener('click', tabHandlerFabric(tabsNodeList, contentTabs, activeClass) );
}

export default tabs;