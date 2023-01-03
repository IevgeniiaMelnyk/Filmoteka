import { getRefs } from '../refs';
import FilmsData from '../moviesAPI/filmsData';
import { renderModalMarkup } from '../renderMarkupFilmoteka/renderModalFilmMarkup';
import { markupModalCreating } from '../renderMarkupFilmoteka/renderModalFilmMarkup';

const refs = getRefs();
const filmsData = new FilmsData();
const modalErrorMarkup = document.querySelector('.modal-error');

export default function toggleModalFilm() {
  if (document.location.pathname === '/index.html') {
    refs.gallery.addEventListener('click', toggleModal);

    refs.gallery.addEventListener('click', event => {
      refs.modalFilmWrapper.innerHTML = '';

      filmsData
        .getById(event.target.dataset.id)
        .then(filmProperties => {
          console.log(filmProperties);
          modalErrorMarkup.classList.add('visually-hidden');
          renderModalMarkup(
            refs.modalFilmWrapper,
            markupModalCreating(filmProperties)
          );
        })
        .catch(modalErrorMarkup.classList.remove('visually-hidden'));
    });

    refs.closeModalBtn.addEventListener('click', toggleModal);
  }

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
