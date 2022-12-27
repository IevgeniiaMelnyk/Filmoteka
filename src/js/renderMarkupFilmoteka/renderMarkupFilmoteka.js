import { GetFilmsServis } from "./getFilmsServis";
import { getRefs } from "../refs";
import { renderMarkupList } from "./renderMarkup";
import { markupCreating } from "./renderMarkup";

const refs = getRefs();

document.addEventListener('DOMContentLoaded', onFirstOupep);

refs.search.addEventListener('submit', onSearch);

const getFilmsServis = new GetFilmsServis();

export function onFirstOupep() {

    if (getFilmsServis.page === 1) {
        getFilmsServis.reset(); 
    }
        
    getFilmsServis.getFilmsPopular().then((posterPropertiesFirst) => {
        renderMarkupList(refs.gallery, posterPropertiesFirst, markupCreating);
    });

    getFilmsServis.incrementPage();
};

onFirstOupep();

export function onSearch(e) {
    
    e.preventDefault();
    getFilmsServis.reset(); 

    getFilmsServis.userRequest = e.target[0].value.toLowerCase();
    console.log(getFilmsServis.userRequest)

    getFilmsServis.getFilms().then((posterProperties) => {
        renderMarkupList(refs.gallery, posterProperties, markupCreating);
    });

    getFilmsServis.incrementPage();
};




