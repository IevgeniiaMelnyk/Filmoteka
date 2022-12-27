import FilmsData from "../moviesAPI/filmsData";
import { getRefs } from "../refs";

const refs = getRefs();
const filmsData = new FilmsData();

export class GetFilmsServis {
    constructor() {
        this.userRequest = '';
        this.page = 1;
    }

    async getFilms() {
    try {
        const postersArr = await filmsData.getSearchQuery(this.userRequest, 100, 'ru');
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