import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('button[data-start]');
const timerEl = document.querySelectorAll('.value');
const timerCss = document.querySelector('.timer');
const fieldCss = document.querySelectorAll('.field');





timerCss.style.display = 'flex';
timerCss.style.gap = '10px';
timerCss.style.padding = '10px';
timerCss.style.textAlign = 'center';

fieldCss[0].style.flexDirection = 'column';
fieldCss[0].style.display = 'flex';
fieldCss[1].style.display = 'flex';
fieldCss[1].style.flexDirection = 'column';
fieldCss[2].style.display = 'flex';
fieldCss[2].style.flexDirection = 'column';
fieldCss[3].style.display = 'flex';
fieldCss[3].style.flexDirection = 'column';

timerEl[0].style.fontSize = '30px';
timerEl[1].style.fontSize = '30px';
timerEl[2].style.fontSize = '30px';
timerEl[3].style.fontSize = '30px';

let timer;
let selectedDate;

btnStartEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      btnStartEl.disabled = true;
    } else {
      btnStartEl.disabled = false;
    }
  },
};

flatpickr(inputEl, options);

function onBtnStartElClick() {
  inputEl.disabled = true;
  btnStartEl.disabled = true;

  timer = setInterval(() => {
    const delta = selectedDate - Date.now();
    const getTime = convertMs(delta);
    Object.entries(getTime).forEach(([name, value], idx) => {
      timerEl[idx].textContent = addLeadingZero(value);
    });

    if (delta <= 1000) {
      clearInterval(timer);
      Notiflix.Notify.success('It is time');
      btnStartEl.disabled = true;
      inputEl.disabled = false;

      return;
    }
  }, 1000);
}

function addLeadingZero(time) {
  return time.toString().padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

btnStartEl.addEventListener('click', onBtnStartElClick);