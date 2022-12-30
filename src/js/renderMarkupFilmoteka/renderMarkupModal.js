import FilmsData from '../moviesAPI/filmsData';
import { getRefs } from '../refs';

const refs = getRefs();
const filmsData = new FilmsData();

// getById(id, language = 'en')
//  * Данные одного фильма для модалки
//  * @param {*} id
//  * @param {*} language
//  * @returns {object}
//  * {
//       title,
//       vote: vote_average,
//       votes: vote_count,
//       popularity,
//       original_title,
//       genres - массив объектов {id, name},
//       about,
//       poster_path - относительный путь к постеру,
//       posters - массив ссылок на постеры разных размеров,
//       release_date: year,
//     };

export function renderModalMarkup(element, markupModalCreating) {
  element.insertAdjacentHTML('beforeend', markupModalCreating);
}

export function markupModalCreating({
  title,
  vote,
  votes,
  popularity,
  original_title,
  genres,
  about,
  poster_path,
  posters,
  year,
}) {
  if (
    posters[4].path !== 'https://image.tmdb.org/t/p/w500/null' &&
    genres.length > 0
  ) {
    const str = genres.map(genres => genres.name).join(', ');
    const letter = str[0].toUpperCase();
    const genre = str.replaceAt(0, letter);

    return `<div class="modal-container">
      <div class="poster-thumb">
        <picture>
            <source
            srcset="
            ${posters[4].path} 1x,
            ${posters[5].path} 2x
            "
            media="(min-width: 1200px)"
          />
            <source
            srcset="
            ${posters[3].path} 1x,
            ${posters[4].path} 2x
            "
            media="(min-width: 768px)"
          />
            <source
            srcset="
            ${posters[3].path} 1x,
            ${posters[4].path} 2x
            "
            media="(max-width: 767px)"
          />

          <img
            class="movie-poster"
            src="${posters[3].path}"
            alt="${title}"

            loading="lazy"
          />
        </picture>
      </div>

      <div>
        <table class="info">
          <caption class="movie-title">
          ${title.toUpperCase()}
          </caption>
          <tbody>
            <tr class="table-row">
              <td class="td">
                <p class="characteristic">Vote / Votes</p>
              </td>
              <td class="description">
                <span class="vote">${vote} </span> &nbsp;
                <span class="characteristic">/</span> ${votes}
              </td>
            </tr>
            <tr class="table-row">
              <td class="td">
                <p class="characteristic">Popularity</p>
              </td>
              <td class="description">${popularity}</td>
            </tr>
            <tr class="table-row">
              <td class="td">
                <p class="characteristic">Original Title</p>
              </td>
              <td class="description">${original_title.toUpperCase()}</td>
            </tr>
            <tr class="table-row">
              <td class="td">
                <p class="characteristic">Genre</p>
              </td>
              <td class="description">${genre}</td>
            </tr>
          </tbody>
        </table>
        <h3 class="about">About</h3>
        <p class="about-descr">
          ${about}
        </p>
        <div class="buttons-wrapper">
          <button
            type="button"
            class="button-modal add-to-watched-btn"
            data-action="add-to-watched"
          >
            add to Watched</button
          ><button
            type="button"
            class="button-modal add-to-queue-btn"
            data-action="add-to-queue"
          >
            add to queue
          </button>
        </div>
      </div>
    </div>`;
  }
}
