// рендерит разметку в галлерею
export function renderMarkupList(element, imgArr, markupCreating) {
  element.insertAdjacentHTML('beforeend', imgArr.map(markupCreating).join(''));
}

// изменяет первую букву строки на заглавную
String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substr(0, index) +
    replacement +
    this.substr(index + replacement.length)
  );
};

// принимает объект возвращает разметку одной карточки
export function markupCreating({ id, posters, title, genres, year }) {
  if (
    posters[4].path !== 'https://image.tmdb.org/t/p/w500/null' &&
    genres.length > 0
  ) {
    const str = genres.join(', ');
    const letter = str[0].toUpperCase();
    const genr = str.replaceAt(0, letter);

    return `
    <div class="gallery-poster-box" data-id=${id}>
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
    `;
  }
}
