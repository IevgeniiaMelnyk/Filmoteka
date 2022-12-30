import { getRefs } from '../refs';

const refs = getRefs();

export default function retrySearch() {
  onInputFocus();
  onInputClear();
}

function onInputFocus() {
  refs.autofocusInput.focus();
}
function onInputClear() {
  refs.autofocusInput.value = '';
}

refs.autofocusBtn.addEventListener('click', retrySearch);
