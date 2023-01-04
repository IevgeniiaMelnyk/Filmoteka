import Pagination from 'tui-pagination';
// import '/node_modules/tui-pagination/dist/tui-pagination.css';
import { getRefs } from '../refs';
import { getFilmsServis } from '../renderMarkupFilmoteka/getFilmsServis';
import { GetFilmsServis } from '../renderMarkupFilmoteka/getFilmsServis';
import { spinnerOn } from "../spiner/spiner";
import { spinnerOff } from "../spiner/spiner";
import { sStorage } from '../renderMarkupFilmoteka/renderMarkupFilmoteka';
import { userSettings } from '../renderMarkupFilmoteka/renderMarkupFilmoteka';
import { markupCreating } from '../renderMarkupFilmoteka/renderMarkup';
import { renderMarkupList } from '../renderMarkupFilmoteka/renderMarkup';
import { makeNewArrProp } from '../renderMarkupFilmoteka/renderMarkupFilmoteka';

const refs = getRefs();
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
        getFilmsServis.nextPage = currentPage;
        console.log(getFilmsServis.nextPage)
        refs.gallery.innerHTML = '';
        spinnerOn();
        getFilmsServis.getFilmsPopular().then((posterPropertiesFirst) => {
        
            makeNewArrProp(posterPropertiesFirst);
            spinnerOff();
            renderMarkupList(refs.gallery, posterPropertiesFirst, markupCreating);
            userSettings.page = getFilmsServis.nextPage;
            userSettings.request = getFilmsServis.userRequest;
            sStorage.save('userSettings', userSettings);
            // pagination.movePageTo(getFilmsServis.nextPage);
    });
    };
    // pagination.movePageTo(getFilmsServis.nextPage)
}










