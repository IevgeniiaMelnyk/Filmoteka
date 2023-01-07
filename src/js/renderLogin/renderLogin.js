import { async } from '@firebase/util';
import { login } from './isLogin';
import { showMessage } from './isLogin';

/**
 * Нужно дописать
 * @param {boolean} isLogin
 */
export function renderLogin(isLogin, user) {
  console.log('RenderLoginMainPage =', isLogin, 'user=', user);
  if (document.location.pathname === '/index.html' || document.location.pathname === '/Filmoteka/index.html') {
    login(isLogin);
  };
  if (document.location.pathname === '/library.html' || document.location.pathname === '/Filmoteka/library.html') {
    showMessage(isLogin);
  };
};
