const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-footer-close]'),
  modal: document.querySelector('[data-modal-footer]'),
  
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.modal.addEventListener('click', onBackdropClick);

function onOpenModal() {
  refs.modal.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscKeyPress);
  
}

function onCloseModal() {
  refs.modal.classList.add('is-hidden');
  window.removeEventListener('keydown', onEscKeyPress);
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    refs.modal.classList.add('is-hidden');
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
onCloseModal();
  }
  
}
