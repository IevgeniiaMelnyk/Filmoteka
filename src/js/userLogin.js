import { getRefs } from '../refs';

const refs = getRefs();

export function markupUserLogin(isLogin, userName) {
  if (!isLogin) {
    return;
  } else {
    refs.signOut.classList.remove('visually-hidden');
    refs.userIcon.classList.remove('visually-hidden');
    document.getElementById('user').innerHTML = 'userName';
    refs.signUp.classList.add('visually-hidden');
    refs.signIn.classList.add('visually-hidden');
  }
}
