// Импортируем библиотеку flatpickr
import flatpickr from 'flatpickr';

// Добавляем импорт стилей для flatpickr
import 'flatpickr/dist/flatpickr.min.css';

// Находим элемент с id "datetime-picker" и кнопку с id "start-btn"
const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('#start-btn');

// Объявляем переменные для хранения выбранного времени и интервала времени
let selectedMs;
let timeInterval;

// Опции для конфигурации flatpickr
const options = {
  enableTime: true, // Включаем выбор времени
  time_24hr: true, // Используем 24-часовой формат времени
  defaultDate: new Date(), // Устанавливаем текущую дату и время по умолчанию
  minuteIncrement: 1, // Устанавливаем интервал выбора минут
  onClose(selectedDates) {
    // Обработчик события закрытия выбора времени
    startBtn.disabled = true; // Отключаем кнопку старта
    console.log(selectedDates[0]); // Выводим выбранную дату и время в консоль
    selectedMs = Date.parse(selectedDates[0]); // Преобразуем выбранную дату и время в миллисекунды

    // Проверяем, что выбранное время находится в будущем
    if (selectedMs < new Date().getTime()) {
      window.alert('Please choose a date in the future'); // Выводим сообщение об ошибке
      return;
    }

    startBtn.disabled = false; // Включаем кнопку старта
  },
};

// Добавляем обработчик события клика на кнопку старта
startBtn.addEventListener('click', onStartBtnClick);

// Функция обработки клика на кнопку старта
function onStartBtnClick() {
  //   console.log('click');
  clearInterval(timeInterval); // Очищаем предыдущий интервал, чтобы не создавать конфликтов
  startBtn.disabled = true; // Блокируем кнопку старта
  datetimePicker.disabled = true; // Блокируем инпут
  timeInterval = setInterval(() => {
    // Запускаем новый интервал
    // selectedMs = selectedMs - (selectedMs % 100);
    let diffMs = selectedMs - new Date().getTime(); // Вычисляем разницу во времени между выбранной датой и текущим временем
    diffMs = diffMs - (diffMs % 1000);
    const diffObj = convertMs(diffMs); // Преобразуем разницу в объект с данными о времени
    setDate(diffObj); // Устанавливаем отображение оставшегося времени на странице
    selectedMs -= 1; // Вычитаем одну секунду из оставшегося времени
  }, 1000);
}

function addLeadingZero(number) {
  return number < 10 ? `0${number}` : number.toString();
}

// Функция установки отображения оставшегося времени на странице
function setDate(data) {
  document.querySelector('[data-seconds]').innerText = addLeadingZero(
    data.seconds
  );
  document.querySelector('[data-minutes]').innerText = addLeadingZero(
    data.minutes
  );
  document.querySelector('[data-hours]').innerText = addLeadingZero(data.hours);
  document.querySelector('[data-days]').innerText = addLeadingZero(data.days);
}

// Инициализация datetimePicker с опциями
flatpickr(datetimePicker, options);

// Функция для конвертации миллисекунд в дни, часы, минуты и секунды
function convertMs(ms) {
  // Количество миллисекунд в единице времени
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Оставшиеся дни
  const days = Math.floor(ms / day);
  // Оставшиеся часы
  const hours = Math.floor((ms % day) / hour);
  // Оставшиеся минуты
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Оставшиеся секунды
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  if (ms <= 0) {
    // Если таймер закончил работу
    clearInterval(timeInterval); // Очищаем интервал
    startBtn.disabled = false; // Разблокируем кнопку старта
    datetimePicker.disabled = false; // Разблокируем datetimePicker
    clearInterval(timeInterval); // останавливаем интервал
    setDate({ days: 0, hours: 0, minutes: 0, seconds: 0 }); // устанавливаем отображение времени на 0
  }

  if (ms < 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
