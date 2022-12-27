import { GetFilmsServis } from "./getFilmsServis";
import { getRefs } from "../refs";
import { renderMarkupList } from "./renderMarkup";
import { markupCreating } from "./renderMarkup";


const refs = getRefs();
refs.search.addEventListener('submit', onSearch);

const getFilmsServis = new GetFilmsServis();

export function onSearch(e) {
    
    e.preventDefault();
    getFilmsServis.reset(); 

    getFilmsServis.userRequest = e.target[0].value.toLowerCase();
    console.log(getFilmsServis.userRequest)

    getFilmsServis.getFilms().then((posterProperties) => {
        renderMarkupList(refs.gallery, posterProperties, markupCreating);
    });
};




