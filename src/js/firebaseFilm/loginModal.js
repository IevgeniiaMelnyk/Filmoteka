(() => {
  const refs = {
    openModalBtn: document.querySelector('#signin'),
    closeModalBtn: document.querySelector('.modal-close-btn'),
    modal: document.querySelector('[login-data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is_hidden');
    document.body.classList.toggle('modal-open');
  }
})();

(() => {
  const refs = {
    openModalBtn: document.querySelector('#signup'),
    closeModalBtn: document.querySelector('[reg-modal-close]'),
    modal: document.querySelector('[reg-data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is_hidden');
    document.body.classList.toggle('modal-open');
  }
})();

const formLog = document.querySelector('.login-form');
const formReg = document.querySelector('.reg-form');

formLog.addEventListener('submit', logSubmit);
formReg.addEventListener('submit', regSubmit);

function logSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, password },
  } = event.currentTarget;

  async function exampleLogin() {
    const email = email.value;
    const password = password.value;
    const result = await fbFilmsAuth.login(email, password);
    console.log(result);
    console.log(fbFilmsAuth.getUserDisplayName());
  }
  event.currentTarget.reset();
}

function regSubmit(event) {
  event.preventDefault();
  const {
    elements: { name, email, password },
  } = event.currentTarget;

  async function exampleRegistration() {
    const email = email.value;
    const password = password.value;
    const user = name.value;
    const result = await fbFilmsAuth.singUp(email, password, user);
    console.log(result);
    console.log(fbFilmsAuth.getUserDisplayName());
  }
  event.currentTarget.reset();
}
