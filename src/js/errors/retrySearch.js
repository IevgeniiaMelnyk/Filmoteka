import { getRefs } from '../refs';

const refs = getRefs();

export default function retrySearch() {
  onInputFocus();
  onInputClear();
}

function onInputFocus() {
  refs.input.focus();
}
function onInputClear() {
  refs.input.value = '';
}
if (refs.autofocusBtn) refs.autofocusBtn.addEventListener('click', retrySearch);
