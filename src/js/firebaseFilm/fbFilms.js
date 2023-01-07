import { ref, set, get, child, remove } from 'firebase/database';

import { fbFilmsAuth } from './testAuth';
import { filmsDatabase } from './fbInit';
import { returnMessage } from '../dataStorage/errorsMessage';
import { FilmFromList, SingleFilm, FilmsData } from '../moviesAPI/filmsData';

export const PLACE_Q = 'QU';
export const PLACE_W = 'WA';

class FbFilmsData {
  constructor(language = 'en') {
    this.db = filmsDatabase;
    this.language = language;
    this.refs = null;
    this.filmList = [];
    this.uid = null;
    this.isReadFilm = false;
  }

  /**
   *
   */
  setUid() {
    this.uid = fbFilmsAuth.getUserUid();

    if (this.uid) {
      this.refs = ref(this.db, 'users/' + this.uid);
    } else {
      this.uid = null;
      this.refs = null;
      this.filmList = [];
    }
    this.isReadFilm = false;
  }
  /**
   *@private
   *@param {int} id
   *@param {String} place 'QU' 'WA'
   */
  async checkFilmInList(id, place) {
    if (!this.isReadFilm) {
      await this.#readFilmToUser();
    }

    for (let i = 0; i < this.filmList.length; i += 1) {
      if (this.filmList[i].id === id) {
        this.filmList[i].place = place;
        return this.filmList[i];
      }
    }

    return null;
  }

  /**
   * @private
   * prepare before Actions
   * @returns {Promise<String>} message if message == "" then is ok
   */
  async prepareBeforeActions() {
    this.setUid();
    if (!this.refs) {
      return returnMessage('auth/login', this.language);
    }
    try {
      if (!this.isReadFilm) {
        await this.#readFilmToUser();
      }
      return '';
    } catch (e) {
      return returnMessage(e.code, this.language);
    }
  }

  /**
   * Сохраняет фильм в очередь
   * требует авторизации
   * @param {SingleFilm} film
   * @param {String} place 'QU' 'WA'
   * @returns {Promise} String сообщение об ошибке если пустая строка значит все в порядке
   */
  async writeTo(film, place) {
    this.setUid();
    console.log(this.uid);
    if (place != PLACE_Q && place != PLACE_W) {
      return returnMessage('films/place', this.language);
    }
    if (!this.uid) {
      return returnMessage('auth/login', this.language);
    }

    try {
      let filmW = await this.checkFilmInList(film.id, place);
      console.log('filmW:', filmW);
      if (!filmW) {
        const { id, title, genres, release_date, poster_path, vote, language } =
          film;

        filmW = new FilmFromList({
          id,
          title,
          genres,
          year: release_date,
          poster_path,
          vote,
          language,
        });
        filmW.place = place;
        this.filmList.push(filmW);
        console.log('writeTo this.filmList=', this.filmList);
      }

      await set(ref(this.db, 'users/' + this.uid + '/' + filmW.id), filmW);
      return '';
    } catch (e) {
      return returnMessage(e.code, this.language);
    }
  }

  /**
   * Считывает список из базы
   * @private
   * @returns
   */
  async #readFilmToUser() {
    if (!this.refs) {
      return false;
    }
    if (this.filmList.length === 0) {
      const snapshot = await get(child(this.refs, `/`));

      if (snapshot.exists()) {
        const filmObjects = snapshot.val();
        this.filmList = Object.values(filmObjects).map(
          ({ id, title, genres, year, poster_path, vote, place }) => {
            const film = new FilmFromList({
              id,
              title,
              genres,
              year,
              poster_path,
              vote,
            });

            film.place = place;
            return film;
          }
        );
      }

      this.isReadFilm = true;
      return true;
    }
  }
  /**
   * Возвращает список фильмов из очереди или просмотренных
   * Требует авторизации
   * @param {String} place 'QU' 'WA'
   * @returns {films:Array, message:String} список фильмов , сообщение об ошибке
   */
  async getFilms(place) {
    this.setUid();
    if (place != PLACE_Q && place != PLACE_W) {
      return returnMessage('films/place', this.language);
    }
    if (!this.refs) {
      return returnMessage('auth/login', this.language);
    }
    try {
      if (!this.isReadFilm) {
        await this.#readFilmToUser();
      }
    } catch (e) {
      return returnMessage(e.code, this.language);
    }
    return {
      films: this.filmList.filter(el => el.place === place),
      message: '',
    };
  }
  /**
   *
   * @param {String} filmId
   * @param {String} place QU WA
   * @returns {Promise<String>} error message
   */
  async removeFilm(filmId, place = 'QU') {
    const beforeMessage = await this.prepareBeforeActions();
    if (beforeMessage.length > 0) return beforeMessage;
    const filmIndex = this.filmList.findIndex(e => e.id == filmId);
    if (filmIndex >= 0) {
      this.filmList.splice(filmIndex, 1);
      await remove(ref(this.db, 'users/' + this.uid + '/' + filmId));
    } else {
      return returnMessage('films/film-not-fount', this.language);
    }
    return '';
  }

  /**
   *
   * @param {int} filmId
   * @returns {Promise<FilmFromList>} or string error message if film not found return null
   */
  async getFilmById(filmId) {
    const beforeMessage = await this.prepareBeforeActions();
    if (beforeMessage.length > 0) return beforeMessage;
    const film = this.filmList.find(el => el.id == filmId);

    if (film) return film;
    return null;
  }
}

export const fbFilmsData = new FbFilmsData();
