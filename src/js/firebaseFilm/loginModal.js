<<<<<<< Updated upstream
import { fbFilmsAuth } from './testAuth';

const refs = {
  openLoginModalBtn: document.querySelector('#signin'),
  closeLoginModalBtn: document.querySelector('.modal-close-btn'),
  loginModal: document.querySelector('.login-data-modal'),
  openRegModalBtn: document.querySelector('#signup'),
  closeRegModalBtn: document.querySelector('.reg-modal-close'),
  regModal: document.querySelector('.reg-data-modal'),
};
=======
(() => {
  const refs = {
    openModalBtn: document.querySelector('#signin'),
    closeModalBtn: document.querySelector('.modal-close-btn'),
    modal: document.querySelector('[login-data-modal]'),
  };
>>>>>>> Stashed changes

refs.openLoginModalBtn.addEventListener('click', toggleLogModal);
refs.closeLoginModalBtn.addEventListener('click', toggleLogModal);

function toggleLogModal() {
  refs.loginModal.classList.toggle('is_hidden');
  document.body.classList.toggle('modal-open');
}

refs.openRegModalBtn.addEventListener('click', toggleRegModal);
refs.closeRegModalBtn.addEventListener('click', toggleRegModal);

function toggleRegModal() {
  refs.regModal.classList.toggle('is_hidden');
  document.body.classList.toggle('modal-open');
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    toggleLogModal();
    toggleRegModal();
  }
}

const formLog = document.querySelector('.login-form');
const formReg = document.querySelector('.reg-form');
const userEmail = document.querySelector('.login-email');
const userPassw = document.querySelector('.login-password');
const regName = document.querySelector('.reg-name');
const regEmail = document.querySelector('.reg-email');
const regPassw = document.querySelector('.reg-password');

formLog.addEventListener('submit', logSubmit);
formReg.addEventListener('submit', regSubmit);
<<<<<<< Updated upstream

async function exampleLogin(userMail, userPassword) {
  const email = userMail;
  const password = userPassword;
  const result = await fbFilmsAuth.login(email, password);
  console.log(result);
  console.log(fbFilmsAuth.getUserDisplayName());
}

async function exampleRegistration(regName, regMail, regPassword) {
  const email = regMail;
  const password = regPassword;
  const user = regName;
  const result = await fbFilmsAuth.singUp(email, password, user);
  console.log(result);
  console.log(fbFilmsAuth.getUserDisplayName());
}

function logSubmit(event) {
  event.preventDefault();
  const userMail = userEmail.value;
  const userPassword = userPassw.value;
  exampleLogin(userMail, userPassword);

  event.currentTarget.reset();
  toggleLogModal();
}

function regSubmit(event) {
  event.preventDefault();
  const userRegName = regName.value;
  const userRegMail = regEmail.value;
  const userRegPassw = regPassw.value;
  exampleRegistration(userRegName, userRegMail, userRegPassw);

  event.currentTarget.reset();
  toggleRegModal();
}
=======
>>>>>>> Stashed changes
