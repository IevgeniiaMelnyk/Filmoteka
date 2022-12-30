import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  deleteUser,
  updateProfile,
} from 'firebase/auth';

import { renderLogin } from '../renderLogin/renderLogin';
import { auth } from './fbInit';
import { fbFilmsData } from './fbFilms';
import { returnMessage } from '../dataStorage/errorsMessage';

class FirebaseAuth {
  constructor(user, language = 'en') {
    this.user = user;
    this.isLogin = !!user;
    this.language = language;
  }

  /**
   * @returns {String} имя авторизированного пользователя
   */
  getUserDisplayName() {
    if (this.isLogin) {
      return this.user.displayName
        ? this.user.displayName.length > 0
          ? this.user.displayName
          : this.user.email
        : this.user.email;
    }
    return '';
  }

  getUserUid() {
    if (this.isLogin) {
      return this.user?.uid;
    }
    return null;
  }
  /**
   * Вход
   * @param {String} email  не проверяет
   * @param {password} password
   * @returns {Promise} String  сообщение об ошибке
   */
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      this.user = userCredential.user;
      return '';
    } catch (e) {
      return returnMessage(e.code, this.language);
    }
  }
  // Исключение
  /**
   *
   * @returns {Prommise} String сообщение об ошибке
   */
  async logOut() {
    //auth/user-not-found
    if (!this.isLogin) return '';
    try {
      await auth.signOut();
      return '';
    } catch (e) {
      return returnMessage(e.code, this.language);
    }
  }
  /**
   *
   * @param {String} email не проверяет
   * @param {String} password
   * @param {String} userName
   * @returns {Promise} String сообщение об ошибке
   */
  async singUp(email, password, userName = '') {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      this.user = userCredential.user;
      if (userName.length > 0) {
      }
      await updateProfile(this.user, {
        displayName: userName,
        //photoURL: 'https://example.com/jane-q-user/profile.jpg',
      });
      return '';
    } catch (e) {
      return returnMessage(e.code, this.language);
    }
  }
}

export const firebaseAuth = new FirebaseAuth(null);
// Прослушивает авторизацию
auth.onAuthStateChanged(user => {
  if (user) {
    firebaseAuth.user = user;
    firebaseAuth.isLogin = true;
    fbFilmsData.setUid(user.uid);
  } else {
    firebaseAuth.user = null;
    firebaseAuth.isLogin = false;
    fbFilmsData.setUid(null);
  }
  renderLogin(firebaseAuth.isLogin, firebaseAuth.getUserDisplayName());
});
