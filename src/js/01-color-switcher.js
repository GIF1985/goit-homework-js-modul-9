// Находим кнопки "Start" и "Stop"
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId; // Идентификатор таймера

// Обработчик события клика на кнопке "Start"
function onStartBtnClick() {
  startBtn.disabled = true; // Делаем кнопку "Start" неактивной
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor(); // Меняем цвет фона на случайный
  }, 1000); // Запускаем таймер с интервалом в 1 секунду
}

// Обработчик события клика на кнопке "Stop"
function onStopBtnClick() {
  startBtn.disabled = false; // Делаем кнопку "Start" снова активной
  clearInterval(intervalId); // Останавливаем таймер
}

// Добавляем обработчики событий на кнопки
startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

// Функция для генерации случайного цвета в формате HEX
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
