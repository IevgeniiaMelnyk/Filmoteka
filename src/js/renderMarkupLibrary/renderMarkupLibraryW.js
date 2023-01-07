import { fbFilmsData, PLACE_Q, PLACE_W } from "../firebaseFilm/fbFilms";
import { fbFilmsAuth } from "../firebaseFilm/testAuth";
import { getRefs } from "../refs";
import { spinnerOn } from "../spiner/spiner";
import { spinnerOff } from "../spiner/spiner";
import { markupCreating } from "../renderMarkupFilmoteka/renderMarkup";
import { renderMarkupList } from "../renderMarkupFilmoteka/renderMarkup";
import { emptyLibraryHide } from "../errors/showAndHideErrors";
import { emptyLibraryShow } from "../errors/showAndHideErrors";
import { renderLogin } from "../renderLogin/renderLogin";
import { authMy } from "../firebaseFilm/fbInit";
import { renderLogin } from "../renderLogin/renderLogin";

const refs = getRefs();


// setTimeout(libraryFirstOpen, 1000);

// первая загрузка библиотеки
export function libraryFirstOpen() {
    
    if (fbFilmsAuth.isLogin) {
        spinnerOn();
        emptyLibraryHide();
        refs.library.innerHTML = '';
        getFilmFromW().then(({ films }) => {
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
            makeNewArrProp(filmsProperties);
            spinnerOff();
            renderMarkupList(refs.library, filmsProperties, markupCreating);
        })
    }
    
};


// загрузка по кнопке смотреть

refs.libraryBtnW.addEventListener('click', renderMarkupLibraryW);

export function renderMarkupLibraryW() {
    
  refs.libraryBtnW.classList.add('current-btn');
  refs.libraryBtnQ.classList.remove('current-btn');
  if (fbFilmsAuth.isLogin) {
    spinnerOn();
    emptyLibraryHide();
    refs.library.innerHTML = '';
    getFilmFromW().then(({ films }) => {
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
      makeNewArrProp(filmsProperties);
      spinnerOff();
      renderMarkupList(refs.library, filmsProperties, markupCreating);
    })
  }
};


async function getFilmFromW() {
  if (fbFilmsAuth.isLogin) {
      try {
        const filmsW = await fbFilmsData.getFilms(PLACE_W);
      if (filmsW) {
        return filmsW;
      }
      } catch (err) {
        console.log(err);
      }
      
  }
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

