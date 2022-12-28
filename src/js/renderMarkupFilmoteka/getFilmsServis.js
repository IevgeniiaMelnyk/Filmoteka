import FilmsData from "../moviesAPI/filmsData";
import { getRefs } from "../refs";

const refs = getRefs();
const filmsData = new FilmsData();

export class GetFilmsServis {
    constructor() {
        this.userRequest = '';
        this.page = 1;
    }

    async getFilmsPopular() {
    try {
        const postersArrFirst = await filmsData.getDayPopular(this.page);
        console.log(postersArrFirst)
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
        const postersArr = await filmsData.getSearchQuery(this.userRequest, this.page);
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
        this.page = 1;
        refs.gallery.innerHTML = '';
    }

    incrementPage() {
        this.page += 1;
    }


}