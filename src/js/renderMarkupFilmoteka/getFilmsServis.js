import FilmsData from "../moviesAPI/filmsData";
import { getRefs } from "../refs";

const refs = getRefs();
const filmsData = new FilmsData();

export class GetFilmsServis {
    constructor() {
        this.userRequest = '';
        this.nextPage = 1;
        this.currentPage = 0;
    }

    async getFilmsPopular() {
    try {
        const postersArrFirst = await filmsData.getDayPopular(this.nextPage);
        const posterPropertiesFirst = postersArrFirst.films.map(({ id, posters, title, genres, year, vote }) => (
            {
                id,
                posters,
                title,
                genres,
                year,
                vote,
            }));
        return posterPropertiesFirst;
        } catch(err) {
        console.log(err);
        }
    }

    async getFilms() {
    try {
        const postersArr = await filmsData.getSearchQuery(this.userRequest, this.nextPage);
        const posterProperties = postersArr.films.map(({ id, posters, title, genres, year, vote }) => (
            {
                id,
                posters,
                title,
                genres,
                year,
                vote,
            }));
        return posterProperties;
        } catch(err) {
        console.log(err);
        }
    }

    async getFilmsPopularRestart(page) {
    try {
        const postersArrFirst = await filmsData.getDayPopular(page);
        const posterPropertiesFirst = postersArrFirst.films.map(({ id, posters, title, genres, year, vote }) => (
            {
                id,
                posters,
                title,
                genres,
                year,
                vote,
            }));
        return posterPropertiesFirst;
        } catch(err) {
        console.log(err);
        }
    }

     async getFilmsRestart(request, page) {
    try {
        const postersArr = await filmsData.getSearchQuery(request, page);
        const posterProperties = postersArr.films.map(({ id, posters, title, genres, year, vote }) => (
            {
                id,
                posters,
                title,
                genres,
                year,
                vote,
            }));
        return posterProperties;
        } catch(err) {
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


}