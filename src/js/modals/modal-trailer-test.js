import TrailerApiService from './modal-trailer';

const trailerApiService = new TrailerApiService();

let youTubeBtn;

// при открытии модального окна
// youTubeBtn = document.querySelector('.testplayer');
// youTubeBtn.addEventListener('click', onYouTubeBtnClick);

// при закрытии модального окна
// youTubeBtn.removeEventListener('click', onYouTubeBtnClick);

export function onYouTubeBtnClick(e) {
  //   trailerApiService.filmID = Number(e.currentTarget.dataset.id);
  trailerApiService.filmID = 593643; // временно
  trailerApiService.showTrailer();
}
