import Pagination from 'tui-pagination';
import '/node_modules/tui-pagination/dist/tui-pagination.css';
import { SStorage } from '../storage/sessionStorage';
import { userSettings } from '../renderMarkupFilmoteka/renderMarkupFilmoteka';


const container = document.getElementById('tui-pagination-container');
const options = {
     totalItems: 500,
     itemsPerPage: 20,
     visiblePages: 3,
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

export const pagination = new Pagination(container, options);









