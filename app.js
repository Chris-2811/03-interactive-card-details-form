const wrapper = document.querySelector('.wrapper');
const usernameEl = document.querySelector('#cardholder');
const numberEl = document.getElementById('cardnumber');
const monthEl = document.getElementById('month');
const yearEl = document.getElementById('year');
const cvcEl = document.getElementById('cvc');
const form = document.getElementById('form');
const content = document.getElementById('content');

const cardNameEl = document.getElementById('name');
const cardNumberEl = document.getElementById('number');
const cardCVCEl = document.getElementById('cvc-card');
const cardMonthEl = document.getElementById('card-month');
const cardYearEl = document.getElementById('card-year');

const confirmation = document.getElementById('confirmation');
const continueBtn = document.getElementById('continue');

// Utility functions

const isRequired = (value) => (value === '' ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;
const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

// Show error
function showError(input, message) {
  const formControl =
    input.id === 'month' || input.id === 'year'
      ? input.parentElement.parentElement.parentElement
      : input.parentElement.parentElement;
  formControl.className = 'form-control error';

  console.log(input.parentElement.parentElement.parentElement);

  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show Success
function showSuccess(input) {
  const formControl =
    input.id === 'month' || input.id === 'year'
      ? input.parentElement.parentElement.parentElement
      : input.parentElement.parentElement;
  formControl.className = 'form-control';
}

// Validating functions

function checkUsername() {
  let valid = false;
  const min = 3;
  const max = 25;

  const username = usernameEl.value.trim();

  if (!isRequired(username)) {
    showError(usernameEl, 'Username can\'t be blank');
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameEl,
      `Username must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(usernameEl);
    valid = true;
  }

  return valid;
}

function checkCardnumber() {
  let valid = false;
  const min = 16;
  const max = 16;

  const number = numberEl.value;

  if (!isRequired(number)) {
    showError(numberEl, 'Cardnumber can\'nt be blank');
  } else if (!isBetween(number.length, min, max)) {
    showError(numberEl, 'Number must be 16 characters');
  } else {
    showSuccess(numberEl);
    valid = true;
  }

  return valid;
}

function checkCVC() {
  let valid = false;
  const min = 3;
  const max = 3;

  const cvc = cvcEl.value;

  if (!isRequired(cvc)) {
    showError(cvcEl, 'CVC can\'t be blank');
  } else if (!isBetween(cvc.length, min, max)) {
    showError(cvcEl, `Must be ${min} characters`);
  } else {
    showSuccess(cvcEl);
    valid = true;
  }

  return valid;
}

function checkDate() {
  let valid = false;

  const month = monthEl.value;
  const year = yearEl.value;

  const date = new Date();
  let currentYear = date.getFullYear();
  currentYear = currentYear.toString().slice(2, 4);

  if (!isRequired(month) || !isRequired(year)) {
    showError(monthEl, " Date can't be blank");
  } else if (month < 1 || month > 12 || year < currentYear) {
    showError(monthEl, 'Wrong format');
  } else {
    showSuccess(monthEl);
    valid = true;
  }

  return valid;
}

// Add Eventlistener
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate forms
  let isUsernameValid = checkUsername();
  let isNumberValid = checkCardnumber();
  let isCVCValid = checkCVC();
  let isDateValid = checkDate();

  let isFormValid =
    isUsernameValid && isNumberValid && isCVCValid && isDateValid;

  if (isFormValid) {
    content.style.display = 'none';
    confirmation.style.display = 'flex';
  }
});

// limit the length of inputs and put display on cards

cvcEl.addEventListener('input', (e) => {
  if (e.target.value.length > 3) {
    e.target.value = e.target.value.slice(0, 3);
  }

  cardCVCEl.innerText = e.target.value;
});

monthEl.addEventListener('input', (e) => {
  console.log(e.target);
  if (e.target.value.length > 2) {
    e.target.value = e.target.value.slice(0, 2);
  }

  cardMonthEl.innerText = e.target.value;

  if (e.target.value == '') {
    cardMonthEl.innerText = '00';
  }
});

yearEl.addEventListener('input', (e) => {
  console.log(e.target);
  if (e.target.value.length > 2) {
    e.target.value = e.target.value.slice(0, 2);
  }

  cardYearEl.innerText = e.target.value;

  if (e.target.value == '') {
    cardYearEl.innerText = '00';
  }
});

numberEl.addEventListener('input', (e) => {
  if (e.target.value.length <= 17) {
    e.target.value = e.target.value.slice(0, 16);
  }

  e.target.value === ''
    ? (cardNumberEl.innerText = '0000 0000 0000 0000')
    : (cardNumberEl.innerText = e.target.value
        .replace(/\D/g, '') // Remove non-numeric characters
        .replace(/(\d{4})/g, '$1 ') // Add a space after every 4 digits
        .trim()); //
});

usernameEl.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
  if (e.target.value.length <= 25) {
    e.target.value = e.target.value.slice(0, 25);
  }

  cardNameEl.innerText = e.target.value;
  if (e.target.value === '') {
    cardNameEl.innerText = 'JANE APPLESEED';
  }
});

// Reset event
continueBtn.addEventListener('click', (e) => {
  confirmation.style.display = 'none';
  content.style.display = 'flex';

  usernameEl.value = '';
  numberEl.value = '';
  monthEl.value = '';
  yearEl.value = '';
  cvcEl.value = '';

  cardNameEl.innerText = 'Jane appleseed';
  cardNumberEl.innerText = '0000 0000 0000 0000';
  cardCVCEl.innerText = '000';
  cardMonthEl.innerText = '00';
  cardYearEl.innerText = '00';
});
