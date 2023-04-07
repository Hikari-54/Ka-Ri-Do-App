const time = {
    total: 0,
    h: 0,
    m: 0,
    s: 0,
}
// Переменная для setInterval
let interval = null;

const initialTime = document.querySelector(".setup-timer");
const remainingTime = document.querySelector(".remaining-timer");

// Запуск таймера
const startButton = document.querySelector(".start-timer");
startButton.addEventListener("click", startTimer);
function startTimer(){
    remainingTime.value = initialTime.value;
    startButton.disabled = true;
    
    time.h = +initialTime.value.slice(0,2);
    time.m = +initialTime.value.slice(3, 5);
    time.s = +initialTime.value.slice(6);
    time.total = time.h*60*60 + time.m*60 +time.s;

    // блок двойного запуска таймера
    

    interval = setInterval(timerCountdown, 1000);

    function timerCountdown(){
        console.log('hi');


        if(time.total > 0){
            time.total--;
            time.h = Math.floor(time.total/3600);
            time.m = Math.floor((time.total % 3600) / 60);
            time.s = time.total - (time.h*3600 + time.m*60);

            let hStr = 0;
            let mStr = 0;
            let sStr = 0;
            if (time.h < 10){
                hStr = "0" + time.h;
            } else{
                hStr = String(time.h);
            }

            if (time.m < 10){
                mStr = "0" + time.m;
            } else{
                mStr = String(time.m);
            }

            if (time.s < 10){
                sStr = "0" + time.s;
            } else{
                sStr = String(time.s);
            }

            remainingTime.value = `${hStr}:${mStr}:${sStr}`;
        }
        if(time.total == 0){
            clearInterval(interval);
            startButton.disabled = false;
        }
    }

}

// Сброс таймера
const resetButton = document.querySelector(".reset-timer");
resetButton.addEventListener("click", resetTimer);
function resetTimer() {
    clearInterval(interval);
    initialTime.value = "00:00:00";
    remainingTime.value = "00:00:00";

    time.h = 0;
    time.m = 0;
    time.s = 0;
    time.total = 0;

    startButton.disabled = false;
}