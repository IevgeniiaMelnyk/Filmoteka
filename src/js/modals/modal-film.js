import { getRefs } from '../refs';
import FilmsData from '../moviesAPI/filmsData';
import { renderModalMarkup } from '../renderMarkupFilmoteka/renderModalFilmMarkup';
import { markupModalCreating } from '../renderMarkupFilmoteka/renderModalFilmMarkup';

const refs = getRefs();
const filmsData = new FilmsData();

export default function toggleModalFilm() {
  refs.gallery.addEventListener('click', toggleModal);

  refs.gallery.addEventListener('click', event => {
    filmsData
      .getById(event.target.dataset.id)
      .then(filmProperties => {
        console.log(filmProperties);
        refs.modalFilmWrapper.innerHTML = '';
        renderModalMarkup(
          refs.modalFilmWrapper,
          markupModalCreating(filmProperties)
        );
      })
      .catch(error => console.log(error));
  });

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

toggleModalFilm();
