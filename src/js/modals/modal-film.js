import { getRefs } from '../refs';

const refs = getRefs();

export default function toggleModalFilm() {
  refs.gallery.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleClasses() {
    document.body.classList.toggle('modal-open');
    refs.modal.classList.toggle('is_hidden');
  }

  function toggleModal(event) {
    if (event.target === event.currentTarget) return;

    document.addEventListener('keydown', closeModal);
    refs.modal.addEventListener('click', closeModalOnBackdrop);
    toggleClasses();
  }

  function closeModal(event) {
    if (event.key !== 'Escape') return;

    toggleClasses();
    document.removeEventListener('keydown', closeModal);
  }

  function closeModalOnBackdrop(event) {
    if (event.target !== event.currentTarget) return;

    toggleClasses();
    refs.modal.removeEventListener('click', closeModalOnBackdrop);
  }
}
