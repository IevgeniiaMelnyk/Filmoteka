import { fbFilmsData, PLACE_Q, PLACE_W } from "../firebaseFilm/fbFilms";
import { fbFilmsAuth } from "../firebaseFilm/testAuth";
import { getRefs } from "../refs";
import { spinnerOn } from "../spiner/spiner";
import { spinnerOff } from "../spiner/spiner";


const refs = getRefs();

refs.libraryBtnQ.addEventListener('click', renderMarkupLibraryQ);

export function renderMarkupLibraryQ() {
    // refs.library.innerHTML = '';
    refs.libraryBtnW.classList.remove('current-btn');
    refs.libraryBtnQ.classList.add('current-btn')
    getFilmFromQU().then((postersQ) => {
        console.log(postersQ)
    })
}

async function getFilmFromQU() {
    if (fbFilmsAuth.isLogin) {
      console.log(fbFilmsAuth.isLogin)
    const films = await fbFilmsData.getFilms(PLACE_Q);
      console.log('filmsQU', films);
  }
}


