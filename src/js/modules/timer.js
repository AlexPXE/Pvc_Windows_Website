import ReverseTimer from "./timerClass";

export default function timer({daySelrctor, hoursSelector, minutesSelector, secondsSelector, deadlineString}){
    
    function dateStr(str) {
        
        const result = str.replace(/(\d{1,2})\D+(\d{1,2})\D+(\d{2,4})\D+(\d{1,2})\D+(\d{1,2})/, "$3-$2-$1T$4:$5:00")
                          .replace(/((?<=^)\d\d(?=\D))|(((?<=\D)\d(?=\D)))/g, str => {
                                switch(str.length) {
                                    case 1:                
                                        return '0' + str;               
                                    case 2:                            
                                        return '20' + str;
                                    default:
                                        console.log(str);
                                }           
                          });

        if(/\d{4,4}-\d\d-\d\dT\d\d:\d\d:\d\d/.test(result)) {
            return result;
        }
        throw 'timer function: Invalid deadline string!';
    }

    const rTimer = new ReverseTimer({
        days: document.querySelector(daySelrctor),
        hours: document.querySelector(hoursSelector),
        minutes: document.querySelector(minutesSelector),
        seconds: document.querySelector(secondsSelector),
    });

    try{
        rTimer.startTimer( dateStr(deadlineString));
    }catch(e){
        console.error(e);
    }
}

