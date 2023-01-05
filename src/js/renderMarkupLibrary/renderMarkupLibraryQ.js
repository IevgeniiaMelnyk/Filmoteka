import { fbFilmsData, PLACE_Q, PLACE_W } from "../firebaseFilm/fbFilms";
import { fbFilmsAuth } from "../firebaseFilm/testAuth";

export async function getFilmFromQU() {
    if (fbFilmsAuth.isLogin) {
      console.log(fbFilmsAuth.isLogin)
    const films = await fbFilmsData.getFilms(PLACE_Q);
      console.log('filmsQU', films);
  }
}


