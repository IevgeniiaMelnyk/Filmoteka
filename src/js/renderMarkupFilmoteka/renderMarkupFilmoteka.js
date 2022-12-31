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

document.addEventListener('DOMContentLoaded', onCurrentPage)


const loadMo = document.querySelector('.pagination__button_current')
loadMo.addEventListener('click', loadMore)
refs.search.addEventListener('submit', onSearch);
refs.library.addEventListener('click', onClickLibrary);


const getFilmsServis = new GetFilmsServis();
const sStorage = new SStorage();


let userSettings = {
    page: getFilmsServis.currentPage,
    request: getFilmsServis.userRequest,
    firstOupen: false,
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


// загрузка по поиску пользователя
export function onSearch(e) {
  e.preventDefault();
    getFilmsServis.reset();
        
    getFilmsServis.userRequest = e.target[0].value.toLowerCase().trim();
    console.log(getFilmsServis.userRequest)

    
    if (getFilmsServis.userRequest === '') {
        getFilmsServis.reset()
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
                sStorage.save('userSettings', userSettings);
                searchErrorHiden(); 
                                
            }
        });
    }
};

// загрузка по кнопке или пагинации
function loadMore(e) {
    userSettings.firstOupen = false;
    sStorage.save('userSettings', userSettings);
    
    userSettings = sStorage.get('userSettings')
    getFilmsServis.currentPage = userSettings.page;
    getFilmsServis.userRequest = userSettings.request;
    getFilmsServis.nextPage = userSettings.page + 1;
    
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
                refs.message.classList.remove('visually-hidden');
                searchErrorShow();
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

// позволяет остаться на текущей странице при перезагрузке страницы
function onCurrentPage(e) {
    userSettings = sStorage.get('userSettings')
    
    if (userSettings.request === '' && userSettings.page > 0 && !userSettings.firstOupen) {
                
        refs.gallery.innerHTML = '';
        spinnerOn();
        getFilmsServis.getFilmsPopularRestart(userSettings.page).then((posterPropertiesFirst) => {
        
        makeNewArrProp(posterPropertiesFirst);
        spinnerOff();
            renderMarkupList(refs.gallery, posterPropertiesFirst, markupCreating);
            
    });
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

function onClickLibrary() {
    userSettings.firstOupen = false;
    sStorage.save('userSettings', userSettings);
}


