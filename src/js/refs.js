export function getRefs() {
  return {
    gallery: document.querySelector('.gallery'),
    search: document.getElementById('search-form'),
    mBtnToQueue: document.querySelector('.add-to-queue-btn'),
    nBtnToWatched: document.querySelector('.add-to-watched-btn'),
    filmoteka: document.querySelector('.header__logo'),
    home: document.querySelector('.home'),
    library: document.querySelector('.library'),
    modal: document.querySelector('[data-modal-film]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    spinner: document.querySelector('.loader'),
    buttonUp: document.querySelector(`.up-button`),
    message: document.querySelector('.failure-message'),
    searchError: document.querySelector('.search-error'),
    emptyLibraryError: document.querySelector('.empty-library-error'),
    autofocusBtn: document.querySelector('.input-autofocus-btn'),
    autofocusInput: document.querySelector('.header__input'),
  };
}
