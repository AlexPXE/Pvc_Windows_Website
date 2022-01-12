export default function imgs({blockSelector, imgsSelector, transitionTime = 300}) {
    const block = document.querySelector(blockSelector);   
    const modal = document.createElement('div');
    modal.style.cssText =`
                display: none; 
                position: fixed; 
                opacity: 0;
                transition: opacity ${(transitionTime/1000)}s;
                width: 100%; 
                height: 100%; 
                top: 0; 
                left: 0; 
                background-color: rgba(0, 0, 0, .7);`;

    const imeges = block.querySelectorAll(imgsSelector);
    
    const cashImgs = new Map();

    imeges.forEach(img => {
        let cloneImg = img.cloneNode(false);        
        cloneImg.setAttribute('class', '');        
        cloneImg.setAttribute('src', img.closest('a').getAttribute('href'));
        cloneImg.style.cssText ='position: fixed; top: 10%; left: 50%; display: none; transform: translateX(-50%)';
        modal.append(cloneImg);
        cashImgs.set(img, cloneImg);
    });

    block.append(modal);

    function showHideHadlerCreat(cash, modal){
        
        let activeImg;

        const hide = (e) => {            
            modal.style.opacity = '0';
            document.body.style.overflow = '';

            setTimeout(() => {
                activeImg.style.display = 'none';
                modal.style.display = 'none';    
            }, transitionTime);
        };
        
        const show = imgEl => {
            document.body.style.overflow = 'hidden';
            activeImg = cash.get(imgEl);
            activeImg.style.display = 'block';
            modal.style.display = 'block';            
            modal.addEventListener('click', hide, {once: true});
            setTimeout(() => {modal.style.opacity = '1';});            
        };
        
        return (e) => {
            e.preventDefault();
            if(cash.has(e.target)){
                show(e.target);
            }
        };
    }       

    block.addEventListener('click', showHideHadlerCreat(cashImgs, modal));
}