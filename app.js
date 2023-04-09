// Счётчик для индекса задач в LocalStorage
let numOfTasksInStorage = 0;
// Копия задач из LocalStorage
const tasksInStorage = {};

const inputTask = document.querySelector(".input-task");

// Загрузка задач из LocalStorage
function syncHostToStorage(){

}
// Добавление задачи
function addTask(){
    if (inputTask.value != ""){
        // Контейнер для списка задач
        const taskList = document.querySelector(".task-list");
        // Шаблон задачи
        const template = document.querySelector("template");
        // Тег текста задачи
        const textOfTaks = template.content.querySelector("p");
        // Вставка текста из input'a
        textOfTaks.textContent = inputTask.value;
        // Копия заполненного шаблона
        let templateCopy = template.content.cloneNode(true);
        // Добавляем новую задачу
        taskList.append(templateCopy);
        // Удаляем введённый текст в input
        inputTask.value = "";
    }
}
// Удаление задачи
function deleteTask(){

}

// Обработка события добавления задачи
const addTaskButton = document.querySelector(".addTaskButton");
addTaskButton.addEventListener("click", addTask);

// Обработка события удаления задачи






// Работа с таймером
const time = {
    total: 0,
    h: 0,
    m: 0,
    s: 0,
}
// Переменная для setInterval
let interval = null;
// Инициализируем звуковой файл
let alarm = new Audio("audio/alarm.mp3");

// input'ы начального и оставшегося времени
const initialTime = document.querySelector(".setup-timer");
const remainingTime = document.querySelector(".remaining-timer");

// Запуск таймера
const startButton = document.querySelector(".start-timer");
startButton.addEventListener("click", startTimer);
function startTimer(){
    // Синхронизируем время
    remainingTime.value = initialTime.value;

    // Блок двойного запуска таймера
    startButton.disabled = true;
    
    // Расчёт актуального времени
    time.h = +initialTime.value.slice(0,2);
    time.m = +initialTime.value.slice(3, 5);
    time.s = +initialTime.value.slice(6);
    time.total = time.h*60*60 + time.m*60 +time.s;

    interval = setInterval(timerCountdown, 1000);
    // Ежесекундный перерасчёт времени
    function timerCountdown(){

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
            // Сбрасываем интервал по завершению
            clearInterval(interval);

            // Возврат возможности запуска таймера
            startButton.disabled = false;

            // Звук таймера
            alarm.play();
            setTimeout(()=>{
                alarm.pause();
                alarm.currentTime = 0.0;
            }, 5000);
        }
    }
}

// Сброс таймера
const resetButton = document.querySelector(".reset-timer");
resetButton.addEventListener("click", resetTimer);
function resetTimer() {
    // Сбрасываем интервал по завершению
    clearInterval(interval);

    remainingTime.value = "00:00:00";

    time.h = 0;
    time.m = 0;
    time.s = 0;
    time.total = 0;

    // Сброс звука таймера
    alarm.pause();
    alarm.currentTime = 0.0;

    // Возврат возможности запуска таймера
    startButton.disabled = false;
}