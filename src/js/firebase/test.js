import { fbFilmsData, PLACE_Q, PLACE_W } from './fbFilms';
import { firebaseAuth } from './fbAuth';
import FilmsData from '../moviesAPI/filmsData';
/*
Ссылка на проект https://console.firebase.google.com/project/filmoteks-fs61/overview
Вкладки Authentication
RealTimeDatabase
Нужно добавить всех в проект ?  в Discord почта Google!!
Описание авторизации
экземпляр класса FirebaseAuth 
    константа firebaseAuth
Основные методы

Регистрация
firebaseAuth.singUp(
  email {String} email не проверяется!!!,
  password {String} пароль не проверяется!!!,
  user {String} имя пользователя)
  return Promise (String message error) Если строка пустая операция успешна 
  После успешной регистрации пользователь уже авторизирован

Вход  
 firebaseAuth.login(
  email {String}
  password {String}
  return Promise (String message error) Если строка пустая операция успешна 
   );

 Выход   
    firebaseAuth.logOut(); 
    return Promise (String message error) Если строка пустая операция успешна 

Возвращает имя авторизированного пользователя    
  firebaseAuth.getUserDisplayName()   

!!!!!Автоматически отслеживается  авторизация пользователя!!!!

Описание базы фильмов
экземпляр класса FbFilmsData 
    константа fbFilmsData

Список фильмов
   fbFilmsData.getFilms(
    place одно из PLACE_Q= 'QU' PLACE_W ='WA' проверяется);
    return Promise  {
      films:Array of FilmFromList ,
       message:String message error Если строка пустая операция успешна 
      }
    FilmFromList в файле moviesAPI/filmsData.js

Запись фильма в нужный список
 fbFilmsData.writeTo(
  film {SingleFilm} файле moviesAPI/filmsData.js 
  place одно из PLACE_Q = 'QU' PLACE_W ='WA' проверяется
  return Promise  {      
       message:String message error Если строка пустая операция успешна 
      }
);

*/
const refs = {
  header: document.querySelector('.header'),
  footer: document.querySelector('.footer'),
};

/* Примеры использования*/
const getFilms = new FilmsData();
/* Регистрация 
Пользователь с таким именем уже есть
*/
async function exampleRegistration() {
  const email = 'some9email@mail.com';
  const password = 'anypassword';
  const user = 'some';
  const result = await firebaseAuth.singUp(email, password, user);
  console.log(result);
  console.log(firebaseAuth.getUserDisplayName());
}

/* Вход */
async function exampleLogin() {
  const email = 'some9email@mail.com';
  const password = 'anypassword';
  const result = await firebaseAuth.login(email, password);
  console.log(result);
  console.log(firebaseAuth.getUserDisplayName());
}
/* Выход */
async function exampleLogOut() {
  const result = await firebaseAuth.logOut();
  console.log(result);
}

/* Получение списка фильмов */
async function exampleGetFilmFromQU() {
  if (firebaseAuth.isLogin) {
    const films = await fbFilmsData.getFilms(PLACE_Q);

    console.log('filmsQU', films);
    const films2 = await fbFilmsData.getFilms(PLACE_W);
    console.log('films WA= ', films2);
  }
}

/* Запись фильма в библиотеку */
async function exampleWriteToLibrary() {
  const film1 = await getFilms.getById(106541);
  console.log('film1 =', film1);
  result = await fbFilmsData.writeTo(film1, 'WA');
  console.log('result = ', result);
}

export function testFbDataBase() {
  console.log('login');
  const getFilms = new FilmsData();
  const email = 'some7email@mail.com';
  const password = 'anypassword';
  refs.header.addEventListener('click', () => {
    console.log('login');
    exampleLogin();
    // setTimeout(() => {
    //   exampleWriteToLibrary();
    // }, 4000);
    setTimeout(() => {
      exampleGetFilmFromQU();
    }, 3000);
  });
}

refs.footer.addEventListener('click', () => {
  exampleLogOut();
});
