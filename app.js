// Счётчик для индекса задач в LocalStorage
let numOfTasksInStorage = 0;
// Копия задач из LocalStorage
let tasksInStorage = {};


// Загрузка задач из LocalStorage - вызывается при загрузке DOM
function syncHostToStorage(){
    // Если задачи существуют
    if(localStorage.key("TasksInStorage") != null){
        // Получаем задачи из LocalStorage
        tasksInStorage = JSON.parse(localStorage.getItem("TasksInStorage"));

        // Добавление всех задач из localStorage в DOM
        for (key in tasksInStorage) {

            let currentTaskFromStorage = tasksInStorage[key];

            // Находим разделитель
            let indexOfDivider = currentTaskFromStorage.indexOf("~");

            let text = currentTaskFromStorage.slice(0, indexOfDivider);
            let color = currentTaskFromStorage.slice(indexOfDivider + 1);
            
            // Замена текста задачи в шаблоне
            textOfTaks.textContent = text;
            
            // Копия заполненного шаблона
            let templateCopy = template.content.cloneNode(true);

            // Добавляем новую задачу
            taskList.append(templateCopy);

            // Вставка цвета задачи
            document.querySelector(".todo-task:last-of-type").style.borderLeft = `2px solid ${color}`;

            // Обновляем счётчик для задач
            numOfTasksInStorage = key;
        }
        numOfTasksInStorage++;
    } 
}
// При загрузке DOM, задачи из localStorage добавляются на страницу
addEventListener("DOMContentLoaded", syncHostToStorage);


// Input ввода текста задачи
const inputTask = document.querySelector(".input-task");
// Контейнер для списка задач
const taskList = document.querySelector(".task-list");
// Шаблон задачи
const template = document.querySelector("template");
// Тег текста задачи в шаблоне
const textOfTaks = template.content.querySelector("p");
// Добавление задачи
function addTask(){
    if (inputTask.value != ""){
        // Вставка текста из input'a
        textOfTaks.textContent = inputTask.value;

        // Копия заполненного шаблона
        let templateCopy = template.content.cloneNode(true);

        // Добавление цветового тега
        templateCopy.querySelector(".todo-task").style.borderLeft = `2px solid ${currentColor}`;

        // Добавляем новую задачу
        taskList.append(templateCopy);

        // Добавление в LocalStorage
        tasksInStorage[numOfTasksInStorage] = inputTask.value + `~${currentColor}`;
        numOfTasksInStorage++;
        localStorage.setItem("TasksInStorage", JSON.stringify(tasksInStorage));

        // Удаляем введённый текст в input
        inputTask.value = "";
    }
}
// Обработка события добавления задачи
const addTaskButton = document.querySelector(".addTaskButton");
addTaskButton.addEventListener("click", addTask);


// Выполнение задачи - вызывается из HTML кода
function taskDone(elem){
    const taskBlock = elem.parentNode;
    // Если задача не выполнена
    if(taskBlock.querySelector(".taskDoneImg").style.opacity == 0){
        taskBlock.querySelector(".taskDoneImg").style.opacity = 1;
        taskBlock.querySelector("p").style.color = "#A8A8B4";
        taskBlock.querySelector("p").style.textDecoration = "line-through #A8A8B4";
    }else{
        taskBlock.querySelector(".taskDoneImg").style.opacity = 0;
        taskBlock.querySelector("p").style.color = "#575767";
        taskBlock.querySelector("p").style.textDecoration = "none";
    }
}


// Удаление задачи - вызывается из HTML кода
function deleteTask(elem){
    // Получение конкретной задачи
    const currentTask = elem.parentNode;
    // Текст задачи для поиска ключа
    let textOfTask = currentTask.querySelector("p").textContent;
    // Массив ключей всех задач
    let arrOfKeys = Object.keys(tasksInStorage);

    // Ищем ключ по тексту задачи
    for (let numOfKeyInArr in arrOfKeys){
        if (tasksInStorage[arrOfKeys[numOfKeyInArr]].includes(textOfTask)){
            // Удаляем найденное свойство
            delete tasksInStorage[arrOfKeys[numOfKeyInArr]];
            // Вносим новый объект в localStorage, заменяя им прошлую версию
            localStorage.setItem("TasksInStorage", JSON.stringify(tasksInStorage));
        }
    }
    // Удаление задачи из DOM дерева
    currentTask.remove();
}


// Добавление цветовых тегов для задачи
let isColorPickerOpened = false;
let currentColor = "rgb(226 21 21)";

const colorPicker = document.querySelector(".colorPicker");
const colorPickerButton = document.querySelector('.colorPickerButton');
// Открытие модульного окна
colorPickerButton.addEventListener("click", colorPickerAppearance);
function colorPickerAppearance() {
    if (isColorPickerOpened == false){
        isColorPickerOpened = true;
        let inputTaskPosition = inputTask.getBoundingClientRect();
        colorPicker.style.display = "block";
        colorPicker.style.top = inputTaskPosition.top + window.pageYOffset - 80 + "px";
    } else{
        isColorPickerOpened = false;
        colorPicker.style.display = "none";
    }    
}
// Выбор цвета
const colorPickerItems = document.querySelectorAll(".colorPickerItem");
for (let numOfColorButton = 0; numOfColorButton < colorPickerItems.length; numOfColorButton++) {
    let colorButton = colorPickerItems[numOfColorButton];
    colorButton.addEventListener("click", colorChanger)
}
function colorChanger(){
    currentColor = this.style.backgroundColor;
    isColorPickerOpened = false;
    colorPicker.style.display = "none";
    colorPickerButton.style.backgroundColor = currentColor;
};


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