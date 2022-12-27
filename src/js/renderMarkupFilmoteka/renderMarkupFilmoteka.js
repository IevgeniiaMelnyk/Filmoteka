import FilmsData from "../moviesAPI/filmsData"
import { getRefs } from "../refs";


const refs = getRefs();
const filmsData = new FilmsData();

refs.search.addEventListener('submit', onSearch);
class GetFilmsServis {
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
}

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


// рендерит разметку в галлерею
function renderMarkupList(element, imgArr, markupCreating) {
    element.insertAdjacentHTML('beforeend', imgArr.map(markupCreating).join('')) ; 
};

// изменяет первую букву строки на заглавную
String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

// принимает объект возвращает разметку одной карточки
function markupCreating({ id, posters, title, genres, year }) {
        
    if (posters[4].path !== 'https://image.tmdb.org/t/p/w500/null' && genres.length > 0) { 
    
        const str = genres.join(', '); 
        const letter = str[0].toUpperCase();
        const genr = str.replaceAt(0, letter);

    return `
    <div class="gallery-poster-box">
    <div class="gallery-poster">
    <img
            class="gallery-poster-img"
            src="${posters[4].path}"
            alt="${title}"
            data-id=${id}
            loading="lazy"
          />
    </div>
    <h2 class="gallery-poster-title">${title}</h2>
      <p class="gallery-poster-text">${genr}<span class="date-befor">${year}</span></p>
    </div>
    `
}
};

