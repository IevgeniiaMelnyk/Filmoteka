import { getRefs } from '../refs';

const refs = getRefs();

export default function renderErrorModalMarkup() {
  const errorMarkup = `<div class="error-img-thumb">
    <img
      class="movie-poster"
      src="/src/images/error-images/search-error-min.png"
      alt="Error"
      loading="lazy"
    />
  </div>

  <p class="error-text">
    Oops... <br />
    The page you requested could not be found...
  </p>`;

  return (refs.modalFilmWrapper.innerHTML = errorMarkup);
}
