import { GetFilmsServis } from "./getFilmsServis";
import { getRefs } from "../refs";
import { renderMarkupList } from "./renderMarkup";
import { markupCreating } from "./renderMarkup";
import { spinnerOn } from "../spiner/spiner";
import { spinnerOff } from "../spiner/spiner";
import { SStorage } from "../storage/sessionStorage";
import { searchErrorShow } from "../errors/showAndHideErrors";
import { searchErrorHiden } from "../errors/showAndHideErrors";



const refs = getRefs();

export const getFilmsServis = new GetFilmsServis();
export const sStorage = new SStorage();


document.addEventListener('DOMContentLoaded', onCurrentPage);
refs.search.addEventListener('submit', onSearch);
refs.filmoteka.addEventListener('click', onClickLogo);


let userSettings = {
    page: getFilmsServis.currentPage,
    request: getFilmsServis.userRequest,
    firstOupen: false,
    newSerch: false,
};


// первая загрузка страницы
export function ifItFirstOupen() {
    if (sStorage.load('userSettings') === undefined) {
        popularFilmsRender();
        userSettings.firstOupen = true;
        sStorage.save('userSettings', userSettings);
    }
};
ifItFirstOupen();


// при нажатии на лого загрузка первой страницы популярных фильмов
export function onClickLogo() {
    getFilmsServis.reset();
    sStorage.clear();
}


// загрузка по кнопке

// refs.nextPageBtn.addEventListener('click', loadMore);

// function loadMore(e) {
     
//     userSettings = sStorage.get('userSettings')
//     getFilmsServis.currentPage = userSettings.page;
//     getFilmsServis.userRequest = userSettings.request;
//     getFilmsServis.nextPage = userSettings.page + 1;
//     userSettings.newSerch = false;
//     sStorage.save('userSettings', userSettings);
    
//     refs.gallery.innerHTML = '';
//     if (getFilmsServis.userRequest === '') {
//         popularFilmsRender();
//     } else {
//         nextLouding();
//     }
// }
// ======================================


// популярные фильмы рендер
export function popularFilmsRender() {

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


// следующая загрузка
function nextLouding() {
    
    if (getFilmsServis.userRequest) {
        spinnerOn();
        getFilmsServis.getFilms().then((posterProperties) => {
            
            if (posterProperties.length === 0) {
                spinnerOff();
                getFilmsServis.reset();
                refs.message.classList.remove('visually-hidden');
                searchErrorShow();
                sStorage.clear();
            };

            if (posterProperties.length > 0) {
                makeNewArrProp(posterProperties);
                spinnerOff();
                renderMarkupList(refs.gallery, posterProperties, markupCreating);
                getFilmsServis.incrementPage();
                userSettings.page = getFilmsServis.currentPage;
                userSettings.request = getFilmsServis.userRequest;
                sStorage.save('userSettings', userSettings);
            };
        });
    };
};


// загрузка по поиску пользователя
export function onSearch(e) {
  e.preventDefault();
    getFilmsServis.reset();

        
    getFilmsServis.userRequest = e.target[0].value.toLowerCase().trim();
        
    if (getFilmsServis.userRequest === '') {
        getFilmsServis.reset();
        sStorage.clear();
        refs.message.classList.remove('visually-hidden');
        searchErrorShow();
    };

    if (getFilmsServis.userRequest) {
        spinnerOn();
        getFilmsServis.getFilms().then((posterProperties) => {
            if (posterProperties.length === 0) {
                getFilmsServis.reset()
                sStorage.clear();
                spinnerOff();
                refs.message.classList.remove('visually-hidden');
                searchErrorShow();
            };

            if (posterProperties.length > 0) {
                makeNewArrProp(posterProperties);
                spinnerOff();
                renderMarkupList(refs.gallery, posterProperties, markupCreating);
                getFilmsServis.incrementPage();
                userSettings.page = getFilmsServis.currentPage;
                userSettings.request = getFilmsServis.userRequest;
                userSettings.newSerch = true;
                sStorage.save('userSettings', userSettings);
                searchErrorHiden(); 
            }
        });
    }
};


// вспомогательные функции
export function makeNewArrProp(arr) {
    return arr.forEach(element => {
            if (element.genres.length > 2) {
                element.genres = [element.genres[0], element.genres[1], 'Other']
            }
        }); 
};


// позволяет остаться на текущей странице при перезагрузке страницы
function onCurrentPage(e) {
    userSettings = sStorage.get('userSettings');
    getFilmsServis.currentPage = userSettings.page;
    getFilmsServis.request = userSettings.request;
       
    if (userSettings.request === '' && userSettings.page > 0 && !userSettings.firstOupen) {
        refs.gallery.innerHTML = '';
        spinnerOn();
        getFilmsServis.getFilmsPopularRestart(userSettings.page).then((posterPropertiesFirst) => {
        makeNewArrProp(posterPropertiesFirst);
        spinnerOff();
        renderMarkupList(refs.gallery, posterPropertiesFirst, markupCreating);
    });
    };

    userSettings.firstOupen = false;
    sStorage.save('userSettings', userSettings);

    if (userSettings.request && userSettings.page > 0) {
        refs.gallery.innerHTML = '';
        spinnerOn();
        getFilmsServis.getFilmsRestart(userSettings.request, userSettings.page).then((posterPropertiesFirst) => {
            makeNewArrProp(posterPropertiesFirst);
            spinnerOff();
            renderMarkupList(refs.gallery, posterPropertiesFirst, markupCreating);
        });
    };
};





