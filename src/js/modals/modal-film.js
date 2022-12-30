import { getRefs } from '../refs';
import FilmsData from '../moviesAPI/filmsData';
import { renderModalMarkup } from '../renderMarkupFilmoteka/renderMarkupModal';
import { markupModalCreating } from '../renderMarkupFilmoteka/renderMarkupModal';

const refs = getRefs();
const filmsData = new FilmsData();

export default function toggleModalFilm() {
  refs.gallery.addEventListener('click', toggleModal);
  refs.gallery.addEventListener('click', event =>
    filmsData.getById(event.target.dataset.id).then(filmProperties => {
      console.log(filmProperties);
      refs.modalFilmWrapper.innerHTML = '';
      renderModalMarkup(
        refs.modalFilmWrapper,
        markupModalCreating(filmProperties)
      );
    })
  );
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
    // console.log(event.target);
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
