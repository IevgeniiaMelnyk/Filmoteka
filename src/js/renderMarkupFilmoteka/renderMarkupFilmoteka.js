import { GetFilmsServis } from './getFilmsServis';
import { getRefs } from '../refs';
import { renderMarkupList } from './renderMarkup';
import { markupCreating } from './renderMarkup';

const refs = getRefs();

refs.search.addEventListener('submit', onSearch);

const getFilmsServis = new GetFilmsServis();

export function onFirstOupen() {
  if (getFilmsServis.page === 1) {
    getFilmsServis.reset();
  }

  getFilmsServis.getFilmsPopular().then(posterPropertiesFirst => {
    makeNewArrProp(posterPropertiesFirst);

    renderMarkupList(refs.gallery, posterPropertiesFirst, markupCreating);
  });

  getFilmsServis.incrementPage();
}

onFirstOupen();

export function onSearch(e) {
  e.preventDefault();
  getFilmsServis.reset();

  getFilmsServis.userRequest = e.target[0].value.toLowerCase();

  getFilmsServis.getFilms().then(posterProperties => {
    makeNewArrProp(posterProperties);

    renderMarkupList(refs.gallery, posterProperties, markupCreating);
  });

  getFilmsServis.incrementPage();
}

function makeNewArrProp(arr) {
  return arr.forEach(element => {
    if (element.genres.length > 2) {
      element.genres = [element.genres[0], element.genres[1], 'Other'];
    }
  });
}
