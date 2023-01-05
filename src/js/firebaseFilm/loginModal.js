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
  }
})();
