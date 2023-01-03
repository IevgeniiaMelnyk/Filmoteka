import { getRefs } from '../refs';
import FilmsData from '../moviesAPI/filmsData';
import { renderModalMarkup } from '../renderMarkupFilmoteka/renderModalFilmMarkup';
import { markupModalCreating } from '../renderMarkupFilmoteka/renderModalFilmMarkup';
import renderErrorModalMarkup from '../renderMarkupFilmoteka/renderErrorModalMarkup';

const refs = getRefs();
const filmsData = new FilmsData();

export default function toggleModalFilm() {
  let atHome = true;

  if (!atHome) {
    console.log(atHome);
    return;
  }

  refs.gallery.addEventListener('click', openModalFilm);
  refs.closeModalBtn.addEventListener('click', closeModal);

  function toggleClasses() {
    document.body.classList.toggle('modal-open');
    refs.modal.classList.toggle('is_hidden');
  }

  function openModalFilm(event) {
    if (event.target === event.currentTarget) return;
    refs.modalFilmWrapper.innerHTML = '';
    document.addEventListener('keydown', closeModalOnEscape);
    refs.modal.addEventListener('click', closeModalOnBackdrop);
    toggleClasses();

    filmsData
      .getById(event.target.dataset.id)
      .then(filmProperties => {
        console.log(filmProperties);
        // refs.modalErrorMarkup.classList.add('visually-hidden');
        renderModalMarkup(
          refs.modalFilmWrapper,
          markupModalCreating(filmProperties)
        );
      })
      // .catch(refs.modalErrorMarkup.classList.remove('visually-hidden'));
      .catch(renderErrorModalMarkup);
  }
  function closeModal(event) {
    toggleClasses();
  }

  function closeModalOnEscape(event) {
    if (event.key !== 'Escape') return;

    toggleClasses();
    document.removeEventListener('keydown', closeModalOnEscape);
    refs.modalFilmWrapper.innerHTML = '';
  }

  function closeModalOnBackdrop(event) {
    if (event.target !== event.currentTarget) return;

    toggleClasses();
    refs.modal.removeEventListener('click', closeModalOnBackdrop);
    refs.modalFilmWrapper.innerHTML = '';
  }
}

toggleModalFilm();
