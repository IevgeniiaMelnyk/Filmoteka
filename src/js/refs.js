export function getRefs() {
    return {
        gallery: document.querySelector('.gallery'),
        search: document.getElementById('search-form'),
        mBtnToQueue: document.querySelector('.add-to-queue-btn'),
        nBtnToWatched: document.querySelector('.add-to-watched-btn'),
    }
};