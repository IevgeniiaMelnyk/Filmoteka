import FilmsData from '../moviesAPI/filmsData';
import { getRefs } from '../refs';
import { tuiPagination } from '../pagination/pagination';
import { LStorage } from '../storage/localStorage';

const refs = getRefs();
const filmsData = new FilmsData();
export const lStorage = new LStorage();

const language = lStorage.get('language');

export class GetFilmsServis {
  constructor() {
    this.userRequest = '';
    this.nextPage = 1;
    this.currentPage = 0;
    this.totalResults = 0;
  }

  async getFilmsPopular() {
    try {
      const postersArrFirst = await filmsData.getDayPopular(this.nextPage);
      this.totalResults = postersArrFirst.total_results;
      tuiPagination(this.totalResults);

      const posterPropertiesFirst = postersArrFirst.films.map(
        ({ id, posters, title, genres, year, vote }) => ({
          id,
          posters,
          title,
          genres,
          year,
          vote,
        })
      );
      return posterPropertiesFirst;
    } catch (err) {
      console.log(err);
    }
  }

  async getFilmsPopularPag() {
    try {
      const postersArrPag = await filmsData.getDayPopular(
        this.currentPage,
        language
      );

      const posterPropertiesPag = postersArrPag.films.map(
        ({ id, posters, title, genres, year, vote }) => ({
          id,
          posters,
          title,
          genres,
          year,
          vote,
        })
      );
      return posterPropertiesPag;
    } catch (err) {
      console.log(err);
    }
  }

  async getFilms() {
    try {
      const postersArr = await filmsData.getSearchQuery(
        this.userRequest,
        this.nextPage,
        language
      );
      this.totalResults = postersArr.total_results;
      tuiPagination(this.totalResults);

      const posterProperties = postersArr.films.map(
        ({ id, posters, title, genres, year, vote }) => ({
          id,
          posters,
          title,
          genres,
          year,
          vote,
        })
      );
      return posterProperties;
    } catch (err) {
      console.log(err);
    }
  }

  async getFilmsPag(request) {
    try {
      const postersArrRecPag = await filmsData.getSearchQuery(
        request,
        this.currentPage,
        language
      );

      const posterPropertiesRecPag = postersArrRecPag.films.map(
        ({ id, posters, title, genres, year, vote }) => ({
          id,
          posters,
          title,
          genres,
          year,
          vote,
        })
      );
      return posterPropertiesRecPag;
    } catch (err) {
      console.log(err);
    }
  }

  async getFilmsPopularRestart(page) {
    try {
      const postersArrFirst = await filmsData.getDayPopular(page, language);
      this.totalResults = postersArrFirst.total_results;
      tuiPagination(this.totalResults);

      const posterPropertiesFirst = postersArrFirst.films.map(
        ({ id, posters, title, genres, year, vote }) => ({
          id,
          posters,
          title,
          genres,
          year,
          vote,
        })
      );
      return posterPropertiesFirst;
    } catch (err) {
      console.log(err);
    }
  }

  async getFilmsRestart(request, page) {
    try {
      const postersArr = await filmsData.getSearchQuery(
        request,
        page,
        language
      );
      this.totalResults = postersArr.total_results;
      tuiPagination(this.totalResults);

      const posterProperties = postersArr.films.map(
        ({ id, posters, title, genres, year, vote }) => ({
          id,
          posters,
          title,
          genres,
          year,
          vote,
        })
      );
      return posterProperties;
    } catch (err) {
      console.log(err);
    }
  }

  reset() {
    this.nextPage = 1;
    this.currentPage = 0;
    refs.gallery.innerHTML = '';
  }

  incrementPage() {
    this.nextPage += 1;
    this.currentPage += 1;
  }

  get request() {
    return this.userRequest;
  }

  set request(newUserRequest) {
    this.userRequest = newUserRequest;
  }

  changeLanguageEn() {
    lStorage.save('language', 'en');
  }

  changeLanguageRu() {
    lStorage.save('language', 'ru');
  }
}
