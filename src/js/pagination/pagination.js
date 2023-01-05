import Pagination from 'tui-pagination';
// import '/node_modules/tui-pagination/dist/tui-pagination.css';
import { getRefs } from '../refs';
import { GetFilmsServis } from '../renderMarkupFilmoteka/getFilmsServis';
import { spinnerOn } from "../spiner/spiner";
import { spinnerOff } from "../spiner/spiner";
import { sStorage } from '../renderMarkupFilmoteka/renderMarkupFilmoteka';
import { markupCreating } from '../renderMarkupFilmoteka/renderMarkup';
import { renderMarkupList } from '../renderMarkupFilmoteka/renderMarkup';
import { makeNewArrProp } from '../renderMarkupFilmoteka/renderMarkupFilmoteka';

const refs = getRefs();

let userSettings = {};

export function tuiPagination(totalItems) {
    
    const options = {
        totalItems: totalItems,
        itemsPerPage: 20,
        visiblePages: 5,
        page: 1,
        centerAlign: false,
        firstItemClassName: 'tui-first-child',
        lastItemClassName: 'tui-last-child',
        template: {
            page: '<a href="#" class="tui-page-btn">{{page}}</a>',
            currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
            moveButton:
                '<a href="#" class="tui-page-btn tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</a>',
            disabledMoveButton:
                '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</span>',
            moreButton:
                '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                '<span class="tui-ico-ellip">...</span>' +
                '</a>'
        }
    }

    const pagination = new Pagination(refs.tuiContainer, options);
    const getFilmsServis = new GetFilmsServis();
    
    pagination.on('afterMove', getPage);

    function getPage(e) {
        const currentPage = e.page;
        getFilmsServis.currentPage = currentPage;
        getFilmsServis.nextPage = currentPage + 1;
        userSettings = sStorage.get('userSettings')
                
        if (userSettings.request === '') {
            refs.gallery.innerHTML = '';
            spinnerOn();
            getFilmsServis.getFilmsPopularPag().then((posterPropertiesPag) => {
        
                makeNewArrProp(posterPropertiesPag);
                spinnerOff();
                renderMarkupList(refs.gallery, posterPropertiesPag, markupCreating);
                userSettings.page = getFilmsServis.currentPage;
                userSettings.request = getFilmsServis.userRequest;
                sStorage.save('userSettings', userSettings);
            
            });
        };

        if (userSettings.request) {
            refs.gallery.innerHTML = '';
            spinnerOn();
            getFilmsServis.getFilmsPag(userSettings.request).then((posterPropertiesRecPag) => {
        
                makeNewArrProp(posterPropertiesRecPag);
                spinnerOff();
                renderMarkupList(refs.gallery, posterPropertiesRecPag, markupCreating);
                userSettings.page = getFilmsServis.currentPage;
                userSettings.request = userSettings.request;
                userSettings.newSerch = false;
                sStorage.save('userSettings', userSettings);
            
            });
        };
    };
    
    refs.search.addEventListener('submit', restartPag);

    function restartPag() {
        pagination.setItemsPerPage(1);
        userSettings.page = 1;
        sStorage.save('userSettings', userSettings);
    }

    userSettings = sStorage.get('userSettings');
    console.log(userSettings)
    
    const page = pagination.getCurrentPage();
    if (page !== userSettings.page) {
        pagination.movePageTo(userSettings.page);
        userSettings.request = userSettings.request;
        sStorage.save('userSettings', userSettings);
    };

};









