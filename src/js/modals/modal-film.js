import { getRefs } from '../refs';
import FilmsData from '../moviesAPI/filmsData';
import { renderModalMarkup } from '../renderMarkupFilmoteka/renderModalFilmMarkup';
import { markupModalCreating } from '../renderMarkupFilmoteka/renderModalFilmMarkup';
import renderErrorModalMarkup from '../renderMarkupFilmoteka/renderErrorModalMarkup';

const refs = getRefs();
const filmsData = new FilmsData();

export default function toggleModalFilm() {
  refs.gallery.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleClasses() {
    document.body.classList.toggle('modal-open');
    refs.modal.classList.toggle('is_hidden');
  }

    function toggleModal(event) {
    if (event.target === event.currentTarget) return;
    refs.modalFilmWrapper.innerHTML = '';
    document.addEventListener('keydown', closeModal);
    refs.modal.addEventListener('click', closeModalOnBackdrop);
    toggleClasses();

    filmsData
      .getById(event.target.dataset.id)
      .then(filmProperties => {
        console.log(filmProperties);
        console.log(document.location.pathname);
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
    if (event.key !== 'Escape') return;

    toggleClasses();
    document.removeEventListener('keydown', closeModal);
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
