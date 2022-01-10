export default class ReverseTimer {
    constructor({days, hours, minutes, seconds}) {        

        let timerId;

        const zeroBeginning = (numb) => {
            return `${((numb < 10) && '0') || ""}${numb}`;
        };

        const display = (sec) => {
            days.textContent = zeroBeginning(~~(sec / 86400));
            hours.textContent = zeroBeginning(~~((sec % 86400) / 3600));
            minutes.textContent = zeroBeginning( ~~(sec / 60) % 60);
            seconds.textContent = zeroBeginning(sec % 60);            
        };
        
        this.stopTimer = () => {
            clearInterval(timerId);
            console.log('Stop timer!');
        };
        
        this.startTimer = (deadLine) => {
            
            let stopDate;
            try {
                stopDate = Date.parse(deadLine);
                if(!stopDate){
                    throw 'timerClass.starTimer(deadLine): Invalid deadline string!';
                }
                
            } catch(e){
                console.error(e);
                return;
            }
            console.log('Start timer!');
            
            
            timerId = setInterval(() => {
                if(Date.now() < stopDate) {
                    display(~~((stopDate - Date.now())/1000));
                } else {
                    this.stopTimer();
                    display(0);
                }
            }, 1000);

        };
    }
}

