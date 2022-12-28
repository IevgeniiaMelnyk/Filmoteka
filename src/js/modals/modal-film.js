import { getRefs } from '../refs';

const refs = getRefs();

export default function toggleModalFilm() {
  refs.gallery.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal(event) {
    if (event.target === event.currentTarget) {
      return;
    }
    document.body.classList.toggle('modal-open');
    refs.modal.classList.toggle('is_hidden');
  }
}
