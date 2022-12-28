import { GetFilmsServis } from "./getFilmsServis";
import { getRefs } from "../refs";
import { renderMarkupList } from "./renderMarkup";
import { markupCreating } from "./renderMarkup";
import { spinnerOn } from "../spiner/spiner";
import { spinnerOff } from "../spiner/spiner";

const refs = getRefs();


refs.search.addEventListener('submit', onSearch);

const getFilmsServis = new GetFilmsServis();
const settings = '';

// первая загрузка страницы
ifItFirstOupen();
// onFirstOupen()

export function ifItFirstOupen() {
    if (!sessionStorage.getItem(settings)) {
        onFirstOupen();
    }
};


export function onFirstOupen() {

    if (getFilmsServis.page === 1) {
        getFilmsServis.reset(); 
    }
    
    spinnerOn();
    getFilmsServis.getFilmsPopular().then((posterPropertiesFirst) => {
        
        makeNewArrProp(posterPropertiesFirst);
        spinnerOff();
        renderMarkupList(refs.gallery, posterPropertiesFirst, markupCreating);
    });

    getFilmsServis.incrementPage();
    sessionStorage.setItem('settings', getFilmsServis.page);
};


// загрузка по поиску пользователя
export function onSearch(e) {
    
    e.preventDefault();
    getFilmsServis.reset(); 

    getFilmsServis.userRequest = e.target[0].value.toLowerCase().trim();

    
    if (getFilmsServis.userRequest === '') {
        getFilmsServis.reset()
    };


    if (getFilmsServis.userRequest) {
        spinnerOn();
        getFilmsServis.getFilms().then((posterProperties) => {
            if (posterProperties.length === 0) {
                getFilmsServis.reset();
            };

            makeNewArrProp(posterProperties);
            spinnerOff();

            renderMarkupList(refs.gallery, posterProperties, markupCreating);

            getFilmsServis.incrementPage();
        });
    }
};


// вспомогательные функции
function makeNewArrProp(arr) {
    return arr.forEach(element => {
            if (element.genres.length > 2) {
                element.genres = [element.genres[0], element.genres[1], 'Other']
            }
        }); 
};

