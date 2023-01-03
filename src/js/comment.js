import { getRefs } from "./refs";
import { onSearch } from "./renderMarkupFilmoteka/renderMarkupFilmoteka";

const refs = getRefs();

export function toComment() {
    // refs.gallery.addEventListener('click', toggleModal);
    // refs.closeModalBtn.addEventListener('click', toggleModal);
    refs.search.addEventListener('submit', onSearch);
}
toComment();