import { async } from '@firebase/util';
import { fbFilmsAuth } from '../firebaseFilm/testAuth';
import { getRefs } from '../refs';
const refs = getRefs();
/**
 * Нужно дописать
 * @param {boolean} isLogin
 */
export function renderLogin(isLogin, user) {
  console.log('RenderLoginMainPage =', isLogin, 'user=', user);

  if (isLogin) {
    refs.signOut.classList.remove('visually-hidden');
    refs.userIcon.classList.remove('visually-hidden');
    refs.signUp.classList.add('visually-hidden');
    refs.signIn.classList.add('visually-hidden');
  } else if (!isLogin) {
    refs.signOut.classList.add('visually-hidden');
    refs.userIcon.classList.add('visually-hidden');
    refs.signUp.classList.remove('visually-hidden');
    refs.signIn.classList.remove('visually-hidden');
  };

  refs.signOut.addEventListener('click', logAut)

}
async function logAut() {
  const result = await fbFilmsAuth.logOut();
  console.log(result);
}