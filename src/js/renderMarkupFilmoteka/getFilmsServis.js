import FilmsData from "../moviesAPI/filmsData";
import { getRefs } from "../refs";

const refs = getRefs();
const filmsData = new FilmsData();

export class GetFilmsServis {
    constructor() {
        this.userRequest = '';
        this.page = 1;
    }

    async getFilmsFirst() {
    try {
        const postersArrFirst = await filmsData.getDayPopular(this.page);
        const posterPropertiesFirst = postersArrFirst.films.map(({ id, posters, title, genres, year }) => (
            {
                id,
                posters,
                title,
                genres,
                year,
            }));
        return posterPropertiesFirst;
        } catch(err) {
        console.log(err);
        }
    }

    async getFilms() {
    try {
        const postersArr = await filmsData.getSearchQuery(this.userRequest, this.page);
        const posterProperties = postersArr.films.map(({ id, posters, title, genres, year }) => (
            {
                id,
                posters,
                title,
                genres,
                year,
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