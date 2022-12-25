import { poster_sizes, genres_en } from '../dataStorage/moviesData';
import axios from 'axios';

const MOVIES_API_KEY = 'c1b8c874be54ebc5c34c225dbd6a36f5';
// https://api.themoviedb.org/3/trending/all/day?api_key=c1b8c874be54ebc5c34c225dbd6a36f5&page=1&language=ru
const MOVIES_API_DAY = 'https://api.themoviedb.org/3/trending/all/day';

// https://api.themoviedb.org/3/search/movie?api_key=c1b8c874be54ebc5c34c225dbd6a36f5&language=ru&query=Star%wars&page=1&include_adult=false
const MOVIES_API_SEARCH = 'https://api.themoviedb.org/3/search/movie?';

// https://api.themoviedb.org/3/movie/13778?api_key=c1b8c874be54ebc5c34c225dbd6a36f5&language=ru
const MOVIES_API_ID = 'https://api.themoviedb.org/3/movie/';

const MOVIES_API_BASE_IMAGE = 'https://image.tmdb.org/t/p';

/* CLASS FilmsData
   async getDayPopular(page, language = 'en')  
   Список фильмов для главной страницы
   * @param {int} page
   * @param {string} language  one of 'en' 'ru' 'ua'
   
   async getSearchQuery(query, page, language = 'en') 
   Список фильмов для главной страницы поиск 
   *  @param {string} query
   * @param {int} page
   * @param {string} language  one of 'en' 'ru' 'ua'
   *    
   * @returns {object} {
   * films  {
   * id string
   * title - название
   * posters  - массив { string width, string -ссылка} на изображение постеров разных размеров
   *  genres - массив жанров string
   * year -год запуска в прокат string
   * poster_path - путь к постеру относительный без размера
   * }
   * total_pages
   * total_results
   *  base_poster_path - начало пути к постеру путь к постеру  <<base_poster_path>>/<size>/<poster_path>
   * }
  
  getById(id, language = 'en')
 * Данные одного фильма для модалки
 * @param {*} id
 * @param {*} language
 * @returns {object}
 * {
      title,
      vote: vote_average,
      votes: vote_count,
      popularity,
      original_title,
      genres - массив объектов {id, name},
      about,
      poster_path - относительный путь к постеру,
      posters - массив ссылок на постеры разных размеров,
      release_date: year,
    };
 */

class FilmsData {
  #searchParamsDay;
  #searchParamsQuery;
  #searchParamsID;
  /**
   * @param {string} language one of 'en' 'ru' 'ua'
   */
  constructor(language = 'en') {
    this.#searchParamsDay = new URLSearchParams({
      api_key: MOVIES_API_KEY,
      page: 1,
      language: 'en',
    });

    this.#searchParamsQuery = new URLSearchParams({
      api_key: MOVIES_API_KEY,
      page: 1,
      language: language,
      query: '',
    });
    this.#searchParamsID = new URLSearchParams({
      api_key: MOVIES_API_KEY,
    });
  }
  // ==============Вспомогательные методы
  preparePosters(poster_path) {
    return poster_sizes.map(size => {
      return {
        size: size,
        path: `${MOVIES_API_BASE_IMAGE}/${size}/${poster_path}`,
      };
    });
  }

  prepareGenres(genre_ids) {
    return genre_ids.reduce((genres_in, genre_id) => {
      const genre = genres_en.find(el => el.id === genre_id);
      if (genre) genres_in.push(genre['name_' + this.language]);
      return genres_in;
    }, []);
  }

  getFilmsDataFromRequest(filmsArray) {
    const films = filmsArray.map(
      ({
        id,
        title,
        name,
        poster_path,
        genre_ids,
        release_date,
        first_air_date,
      }) => {
        const posters = this.preparePosters(poster_path);
        const genres = this.prepareGenres(genre_ids);
        const release_year = release_date
          ? release_date
          : first_air_date
          ? first_air_date
          : '';
        const year = release_year ? release_year.slice(0, 4) : '';
        return {
          id: id,
          title: title ? title : name,
          posters: posters,
          genres: genres,
          year: year,
          poster_path,
        };
      }
    );
    return films;
  }

  async #getListFromParams(searchParams, url) {
    try {
      const response = await axios.get(url, {
        params: searchParams,
      });

      const total_pages = response.data.total_pages;
      const total_results = response.data.total_results;
      const results = response.data.results;
      const films = this.getFilmsDataFromRequest(results);

      return {
        films,
        total_pages,
        total_results,
        sizes: poster_sizes,
        base_poster_path: MOVIES_API_BASE_IMAGE,
      };
    } catch (err) {
      throw err;
    }
  }

  #getFilmDataSingle(filmObj) {
    const title = filmObj.title ? filmObj.title : filmObj.original_title;
    const {
      genres,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      vote_average,
      vote_count,
    } = filmObj;
    const about = overview;
    const posters = this.preparePosters(poster_path);
    const year = release_date ? release_date.slice(0, 4) : '';
    return {
      title,
      vote: vote_average,
      votes: vote_count,
      popularity,
      original_title,
      genres,
      about,
      poster_path,
      posters,
      release_date: year,
    };
  }

  async #getSingleFromParams(searchParams, url) {
    try {
      const response = await axios.get(url, {
        params: searchParams,
      });

      return this.#getFilmDataSingle(response.data);
    } catch (e) {
      throw e;
    }
  }

  //==========Основные методы====================
  /**Список фильмов для главной страницы
   * @param {int} page
   * @param {string} language
   * @returns {object} {
   * films  {
   * id string
   * title - название
   * posters  - массив { string width, string -ссылка} на изображение постеров разных размеров
   *  genres - массив жанров string
   * year -год запуска в прокат string
   * poster_path - путь к постеру
   * }
   * total_pages
   * total_results
   * }
   */
  async getDayPopular(page, language = 'en') {
    this.language = language;
    this.#searchParamsDay.set('page', page);
    this.#searchParamsDay.set('language', language);
    return this.#getListFromParams(this.#searchParamsDay, MOVIES_API_DAY);
  }

  /**
   *Поиск Список фильмов для главной страницы поиск
   * @param {string} query
   * @param {int} page
   * @param {string} language  one of 'en' 'ru' 'ua'
   * @returns {object} {
   * films  {
   * id string
   * title - название
   * posters  - массив { string width, string -ссылка} на изображение постеров разных размеров
   *  genres - массив жанров string
   * year -год запуска в прокат string
   * sizes - список размеров
   * poster_path - путь к постеру
   * }
   * total_pages
   * total_results
   * sizes
   * base_poster_path
   * }
   */
  async getSearchQuery(query, page, language = 'en') {
    try {
      this.language = language;
      const searchText = encodeURIComponent(query);
      while (query.includes(' ')) {
        query = query.replace(' ', '%');
      }
      this.#searchParamsQuery.set('query', query);
      this.#searchParamsQuery.set('page', page);
      this.#searchParamsQuery.set('language', language);
      return this.#getListFromParams(
        this.#searchParamsQuery,
        MOVIES_API_SEARCH
      );
    } catch (e) {
      throw e;
    }
  }

  /**
   * Данные одного фильма для модалки
   * @param {*} id
   * @param {*} language
   * @returns {object}
   */
  async getById(id, language = 'en') {
    try {
      const url = `${MOVIES_API_ID}${id}`;
      this.#searchParamsID.set('language', language);
      return this.#getSingleFromParams(this.#searchParamsID, url);
    } catch (e) {
      throw e;
    }
  }
}

async function TestFilms() {
  const getFilms = new FilmsData();
  try {
    const newLocal = await getFilms.getDayPopular(100, 'ua');
    const films = newLocal;
    console.log('======================');
    console.log(films.films[2].genres);
    const films2 = await getFilms.getById(9471, 'ua');
    console.log('======================');
    console.log(films2);
  } catch (e) {
    console.log('Error', e);
  }
}

export default FilmsData;
