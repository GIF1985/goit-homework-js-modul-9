// импорт библиотеки notiflix.
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Получаем элемент формы
const form = document.querySelector('.form');

// Определяем функцию для создания промиса с задержкой
function createPromise(position, delay) {
  // Создаем новый промис, который разрешается или отклоняется после задержки
  return new Promise((resolve, reject) => {
    // Определяем, должен ли промис разрешиться или отклониться
    const shouldResolve = Math.random() > 0.3;
    // Устанавливаем задержку для разрешения или отклонения промиса
    setTimeout(() => {
      if (shouldResolve) {
        // Разрешаем промис с объектом, содержащим значения позиции и задержки
        resolve({ position, delay });
      } else {
        // Отклоняем промис с объектом, содержащим значения позиции и задержки
        reject({ position, delay });
      }
    }, delay);
  });
}

// Слушаем событие отправки формы
form.addEventListener('submit', event => {
  event.preventDefault(); // Отменяем стандартное поведение формы при отправке, чтобы страница не перезагружалась

  // Получаем значения полей формы
  const delay = Number(event.target.elements.delay.value); // задержка перед выполнением первого промиса
  const step = Number(event.target.elements.step.value); // шаг увеличения задержки перед выполнением каждого следующего промиса
  const amount = Number(event.target.elements.amount.value); // количество промисов для создания

  // Создаем несколько промисов с заданными параметрами задержки и количеством
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay + step * (i - 1)) // Создаем промис с позицией и задержкой, увеличивающейся с каждой следующей позицией
      .then(({ position, delay }) => {
        // Если промис разрешен, выполняем следующие действия
        Notiflix.Notify.success(
          // Выводим уведомление об успешном разрешении промиса
          `✅ Промис ${position} выполнен через ${delay}мс`
        );
      })
      .catch(({ position, delay }) => {
        // Если промис отклонен, выполняем следующие действия
        Notiflix.Notify.failure(
          // Выводим уведомление об отклонении промиса
          `❌ Промис ${position} отклонен через ${delay}мс`
        );
      });
  }
});
