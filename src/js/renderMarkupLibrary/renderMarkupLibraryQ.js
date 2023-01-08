import { fbFilmsData, PLACE_Q, PLACE_W } from "../firebaseFilm/fbFilms";
import { fbFilmsAuth } from "../firebaseFilm/testAuth";
import { getRefs } from "../refs";
import { spinnerOn } from "../spiner/spiner";
import { spinnerOff } from "../spiner/spiner";
import { markupCreating } from "../renderMarkupFilmoteka/renderMarkup";
import { renderMarkupList } from "../renderMarkupFilmoteka/renderMarkup";
import { emptyLibraryHide } from "../errors/showAndHideErrors";
import { emptyLibraryShow } from "../errors/showAndHideErrors";



const refs = getRefs();

refs.libraryBtnQ.addEventListener('click', renderMarkupLibraryQ);


// загрузка по кнопке очередь
export function renderMarkupLibraryQ() {
    
  refs.libraryBtnW.classList.remove('current-btn');
  refs.libraryBtnQ.classList.add('current-btn');
  if (fbFilmsAuth.isLogin) {
    refs.library.classList.add('min-height');
    spinnerOn();
    emptyLibraryHide();
    refs.library.innerHTML = '';
    getFilmFromQU().then(({ films }) => {
      
      const filmsProperties = films.map(({ id, posters, title, genres, year, vote }) => (
        {
          id,
          posters,
          title,
          genres,
          year,
          vote,
        }
      ));
      return filmsProperties;
    }).then((filmsProperties) => {
      if (filmsProperties.length !== 0) {
        makeNewArrProp(filmsProperties);
        spinnerOff();
        renderMarkupList(refs.library, filmsProperties, markupCreating);
      };
      if (filmsProperties.length === 0) {
        refs.library.classList.remove('min-height');
        spinnerOff();
        emptyLibraryShow();
      };
    });
  };
};


async function getFilmFromQU() {
  if (fbFilmsAuth.isLogin) {
      try {
        const filmsQ = await fbFilmsData.getFilms(PLACE_Q);
      if (filmsQ) {
        return filmsQ;
        };
      } catch (err) {
        console.log(err);
    };
  };
};


// вспомогательные функции
export function makeNewArrProp(arr) {
  return arr.forEach(element => {
    if (element.genres.length === 1) {
      element.genres = [element.genres[0].name]
    };
    if (element.genres.length === 2) {
      element.genres = [element.genres[0].name, element.genres[1].name]
    };
    if (element.genres.length > 2) {
      element.genres = [element.genres[0].name, element.genres[1].name, 'Other']
    };
    }); 
};