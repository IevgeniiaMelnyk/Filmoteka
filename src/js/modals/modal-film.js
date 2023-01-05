import { getRefs } from '../refs';
import FilmsData from '../moviesAPI/filmsData';
import { renderModalMarkup } from '../renderMarkupFilmoteka/renderModalFilmMarkup';
import { markupModalCreating } from '../renderMarkupFilmoteka/renderModalFilmMarkup';
import renderErrorModalMarkup from '../renderMarkupFilmoteka/renderErrorModalMarkup';
import { addMod, removeMod } from './modal-film-btn';
import { fbFilmsData, PLACE_Q, PLACE_W } from '../firebaseFilm/fbFilms';
import { fbFilmsAuth } from '../firebaseFilm/testAuth';

const refs = getRefs();
const filmsData = new FilmsData();
let filmObj = null;
let filmId = null;

export default function toggleModalFilm() {
  refs.gallery.addEventListener('click', openModalFilm);
  refs.closeModalBtn.addEventListener('click', closeModal);

  function toggleClasses() {
    document.body.classList.toggle('modal-open');
    refs.modal.classList.toggle('is_hidden');
  }

  function openModalFilm(event) {
    const hasId = event.target.hasAttribute('data-id');
    filmId = event.target.dataset.id;
    if (event.target === event.currentTarget) return;
    else if (hasId === false) return;

    refs.modalFilmWrapper.innerHTML = '';
    document.addEventListener('keydown', closeModalOnEscape);
    refs.modal.addEventListener('click', closeModalOnBackdrop);

    toggleClasses();

    filmsData
      .getById(filmId)
      .then(filmProperties => {
        filmObj = filmProperties;
        renderModalMarkup(
          refs.modalFilmWrapper,
          markupModalCreating(filmProperties)
        );

        const addToWatched =
          refs.modalFilmWrapper.querySelector('.add-to-watched');
        const addToQueue = refs.modalFilmWrapper.querySelector('.add-to-queue');

        addToWatched.addEventListener('click', onClickBtnWatched);
        addToQueue.addEventListener('click', onClickBtnQueue);
      })
      .catch(renderErrorModalMarkup);
  }

  async function onClickBtnWatched(event) {
    if (event.target.classList.contains('add-to-watched')) {
      const film1 = await filmsData.getById(filmId);
      console.log('film1 =', film1);
      const result = await fbFilmsData.writeTo(film1, 'WA');
      console.log('result = ', result);

      removeMod(event.target, 'watched');
    } else if (event.target.classList.contains('remove-from-watched')) {
      addMod(event.target, 'watched');
    }
  }

  async function onClickBtnQueue(event) {
    if (event.target.classList.contains('add-to-queue')) {
      const film1 = await filmsData.getById(filmId);
      console.log('film1 =', film1);
      const result = await fbFilmsData.writeTo(film1, 'QU');
      console.log('result = ', result);

      removeMod(event.target, 'queue');
    } else if (event.target.classList.contains('remove-from-queue')) {
      addMod(event.target, 'queue');
    }
  }

  function closeModal(event) {
    toggleClasses();
  }

  function closeModalOnEscape(event) {
    if (event.key !== 'Escape') return;

    toggleClasses();
    document.removeEventListener('keydown', closeModalOnEscape);
  }

  function closeModalOnBackdrop(event) {
    if (event.target !== event.currentTarget) return;

    toggleClasses();
    refs.modal.removeEventListener('click', closeModalOnBackdrop);
  }
}

toggleModalFilm();
