import FilmsData from "../moviesAPI/filmsData"

const filmsData = new FilmsData();

const gallery = document.querySelector('.gallery');

export async function renderMarkup() {
    
    try {
        const postersArr = await filmsData.getSearchQuery('new', 100, language = 'ru');
        const posterProperties = postersArr.films.map(({  id, posters, title, genres, year }) => (
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
    };
};

renderMarkup().then((posterProperties) => {
    gallery.innerHTML = '';

    gallery.insertAdjacentHTML('beforeend', posterProperties.map(markupCreating).join(''));
});

String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function markupCreating({ posters, title, genres, year }) {
        
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
            loading="lazy"
          />
    </div>
    <h2 class="gallery-poster-title">${title}</h2>
      <p class="gallery-poster-text">${genr}<span class="date-befor">${year}</span></p>
    </div>
    `
}
};