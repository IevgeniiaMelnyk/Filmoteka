import { GetFilmsServis } from './getFilmsServis';
import { getRefs } from '../refs';
import { renderMarkupList, markupCreating } from './renderMarkup';
import { spinnerOn, spinnerOff } from '../spiner/spiner';
import { SStorage } from '../storage/sessionStorage';
import { searchErrorShow, searchErrorHiden } from '../errors/showAndHideErrors';

const refs = getRefs();

export const getFilmsServis = new GetFilmsServis();
export const sStorage = new SStorage();

document.addEventListener('DOMContentLoaded', onCurrentPage);
refs.search.addEventListener('submit', onSearch);
refs.filmotekaLogo.addEventListener('click', onClickLogoFilmoteka);
refs.genreForm.addEventListener('submit', getFilmsByGenre);
refs.popularBtn.addEventListener('click', onClickPopularBtn);

export let userSettings = {
  page: getFilmsServis.currentPage,
  request: getFilmsServis.userRequest,
  genre: getFilmsServis.genre,
  firstOupen: false,
  newSerch: false,
};

// первая загрузка страницы
export function ifItFirstOupen() {
  if (sStorage.load('userSettings') === undefined) {
    popularFilmsRender();
    userSettings.firstOupen = true;
    sStorage.save('userSettings', userSettings);
    getFilmsServis.changeLanguageEn();
  }
}
ifItFirstOupen();

// при нажатии на лого загрузка первой страницы популярных фильмов
export function onClickLogoFilmoteka() {
  getFilmsServis.reset();
  sStorage.clear();
}

export function onClickPopularBtn() {
  getFilmsServis.reset();
  sStorage.clear();
  ifItFirstOupen();
}

// популярные фильмы рендер
export function popularFilmsRender() {
  refs.gallery.innerHTML = '';
  spinnerOn();
  getFilmsServis.getFilmsPopular().then(posterProperties => {
    makeNewArrProp(posterProperties);
    spinnerOff();
    renderMarkupList(refs.gallery, posterProperties, markupCreating);
  });

  getFilmsServis.incrementPage();
  userSettings.page = getFilmsServis.currentPage;
  userSettings.request = getFilmsServis.userRequest;
  sStorage.save('userSettings', userSettings);
}

// загрузка по поиску пользователя
export function onSearch(e) {
  e.preventDefault();
  getFilmsServis.reset();

  getFilmsServis.userRequest = e.target[0].value.toLowerCase().trim();

  if (getFilmsServis.userRequest === '') {
    getFilmsServis.reset();
    sStorage.clear();
    refs.message.classList.remove('visually-hidden');
    refs.tuiContainer.classList.add('visually-hidden');
    searchErrorShow();
    refs.input.value = '';
    refs.input.blur();
  }

  if (getFilmsServis.userRequest) {
    spinnerOn();
    getFilmsServis.getFilms().then(posterProperties => {
      if (posterProperties.length === 0) {
        getFilmsServis.reset();
        sStorage.clear();
        spinnerOff();
        refs.message.classList.remove('visually-hidden');
        refs.tuiContainer.classList.add('visually-hidden');
        searchErrorShow();
        refs.input.value = '';
        refs.input.blur();
      }

      if (posterProperties.length > 0) {
        makeNewArrProp(posterProperties);
        spinnerOff();
        renderMarkupList(refs.gallery, posterProperties, markupCreating);
        getFilmsServis.incrementPage();
        userSettings.page = getFilmsServis.currentPage;
        userSettings.request = getFilmsServis.userRequest;
        userSettings.genre = [];
        userSettings.newSerch = true;
        sStorage.save('userSettings', userSettings);
        refs.message.classList.add('visually-hidden');
        refs.tuiContainer.classList.remove('visually-hidden');
        searchErrorHiden();
        refs.input.value = '';
        refs.input.blur();
      }
    });
  }
}

// загрузка по жанру
export function getFilmsByGenre(e) {
  e.preventDefault();
  getFilmsServis.reset();
  refs.gallery.innerHTML = '';
  const genre = e.target.elements[0].value;
  getFilmsServis.genre.push(Number(genre));
  spinnerOn();
  getFilmsServis.getFilmsGenre().then(posterProperties => {
    makeNewArrProp(posterProperties);
    spinnerOff();
    renderMarkupList(refs.gallery, posterProperties, markupCreating);
  });

  getFilmsServis.incrementPage();
  userSettings.page = getFilmsServis.currentPage;
  userSettings.request = '';
  userSettings.newSerch = true;
  userSettings.genre = getFilmsServis.genre;
  sStorage.save('userSettings', userSettings);
  getFilmsServis.genre = [];
}

// вспомогательные функции
export function makeNewArrProp(arr) {
  return arr.forEach(element => {
    if (element.genres.length > 2) {
      element.genres = [element.genres[0], element.genres[1], '...'];
    }
  });
}

// позволяет остаться на текущей странице при перезагрузке страницы
export function onCurrentPage(e) {
  userSettings = sStorage.get('userSettings');
  getFilmsServis.currentPage = userSettings.page;
  getFilmsServis.request = userSettings.request;
  getFilmsServis.genre = userSettings.genre;

  if (
    userSettings.request === '' &&
    !userSettings.genre.length &&
    userSettings.page === 1 &&
    !userSettings.firstOupen
  ) {
    refs.gallery.innerHTML = '';
    spinnerOn();
    getFilmsServis
      .getFilmsPopularRestart(userSettings.page)
      .then(posterProperties => {
        makeNewArrProp(posterProperties);
        spinnerOff();
        renderMarkupList(refs.gallery, posterProperties, markupCreating);
      });
  }
  if (
    userSettings.request === '' &&
    !userSettings.genre.length &&
    userSettings.page > 0 &&
    !userSettings.firstOupen
  ) {
    getFilmsServis.getFilmsPopularRestart(userSettings.page);
  }

  if (userSettings.request && userSettings.page === 1) {
    refs.gallery.innerHTML = '';
    spinnerOn();
    getFilmsServis
      .getFilmsRestart(userSettings.request, userSettings.page)
      .then(posterProperties => {
        makeNewArrProp(posterProperties);
        spinnerOff();
        renderMarkupList(refs.gallery, posterProperties, markupCreating);
      });
  }
  if (userSettings.request && userSettings.page > 0) {
    getFilmsServis.getFilmsRestart(userSettings.request, userSettings.page);
  }

  if (userSettings.genre.length > 0 && userSettings.page === 1) {
    refs.gallery.innerHTML = '';
    spinnerOn();
    getFilmsServis
      .getFilmsGenreRestart(userSettings.genre, userSettings.page)
      .then(posterProperties => {
        makeNewArrProp(posterProperties);
        spinnerOff();
        renderMarkupList(refs.gallery, posterProperties, markupCreating);
      });
  }

  if (userSettings.genre.length && userSettings.page > 0) {
    getFilmsServis.getFilmsGenreRestart(userSettings.genre, userSettings.page);
  }

  userSettings.firstOupen = false;
  sStorage.save('userSettings', userSettings);
}
