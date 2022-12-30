import { GetFilmsServis } from "./getFilmsServis";
import { getRefs } from "../refs";
import { renderMarkupList } from "./renderMarkup";
import { markupCreating } from "./renderMarkup";
import { spinnerOn } from "../spiner/spiner";
import { spinnerOff } from "../spiner/spiner";
import { SStorage } from "../storage/sessionStorage";

const refs = getRefs();

document.addEventListener('DOMContentLoaded', onCurrentPage)

const loadMo = document.querySelector('.pagination__button_current')
loadMo.addEventListener('click', loadMore)
refs.search.addEventListener('submit', onSearch);


const getFilmsServis = new GetFilmsServis();
const sStorage = new SStorage();


let userSettings = {
    page: getFilmsServis.currentPage,
    request: getFilmsServis.userRequest,
};


// первая загрузка страницы
ifItFirstOupen();

export function ifItFirstOupen() {
    if (sStorage.load('userSettings') === undefined) {
        // getFilmsServis.reset();
        popularFilmsRender();
    }
};


// популярные фильмы рендер
export function popularFilmsRender() {

    // if (getFilmsServis.nextPage === 1 && getFilmsServis.currentPage === 0) {
    //     getFilmsServis.reset(); 
    // }
    refs.gallery.innerHTML = '';
    spinnerOn();
    getFilmsServis.getFilmsPopular().then((posterPropertiesFirst) => {
        
        makeNewArrProp(posterPropertiesFirst);
        spinnerOff();
        renderMarkupList(refs.gallery, posterPropertiesFirst, markupCreating);
    });

    getFilmsServis.incrementPage();
    userSettings.page = getFilmsServis.currentPage;
    userSettings.request = getFilmsServis.userRequest;
    sStorage.save('userSettings', userSettings);

};


// загрузка по поиску пользователя
export function onSearch(e) {
    
    e.preventDefault();
    getFilmsServis.reset(); 

    getFilmsServis.userRequest = e.target[0].value.toLowerCase().trim();

    
    if (getFilmsServis.userRequest === '') {
        getFilmsServis.reset()
        sStorage.clear();
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
            userSettings.page = getFilmsServis.currentPage;
            userSettings.request = getFilmsServis.userRequest;
            sStorage.save('userSettings', userSettings);
            
        });
    }
};


// загрузка по кнопке или пагинации
function loadMore() {
    refs.gallery.innerHTML = '';
    if (getFilmsServis.userRequest === '') {
        popularFilmsRender();
    } else {
        nextLouding();
    }
}

// следующая загрузка
function nextLouding() {
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
            userSettings.page = getFilmsServis.currentPage;
            userSettings.request = getFilmsServis.userRequest;
            sStorage.save('userSettings', userSettings);
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

function onCurrentPage(e) {
    userSettings = sStorage.get('userSettings')
    console.log(e)
    console.log(userSettings)

    if (userSettings.request === '' && userSettings.page > 0) {
        refs.gallery.innerHTML = '';
        spinnerOn();
        getFilmsServis.getFilmsPopularRestart(userSettings.page).then((posterPropertiesFirst) => {
        
        makeNewArrProp(posterPropertiesFirst);
        spinnerOff();
        renderMarkupList(refs.gallery, posterPropertiesFirst, markupCreating);
    });

    getFilmsServis.incrementPage();
    userSettings.page = getFilmsServis.currentPage;
    userSettings.request = getFilmsServis.userRequest;
    sStorage.save('userSettings', userSettings);
    };

    if (userSettings.request && userSettings.page > 0) {
        refs.gallery.innerHTML = '';
        spinnerOn();
        getFilmsServis.getFilmsRestart(userSettings.request, userSettings.page).then((posterPropertiesFirst) => {
        
            makeNewArrProp(posterPropertiesFirst);
            spinnerOff();
            renderMarkupList(refs.gallery, posterPropertiesFirst, markupCreating);
        });
    }
}