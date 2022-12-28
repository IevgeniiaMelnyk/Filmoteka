import FilmsData from './filmsData';

async function testFilms() {
  const getFilms = new FilmsData();
  try {
    const newLocal = await getFilms.getDayPopular(1, 'en');
    const films = newLocal;
    console.log('======================');
    console.log(films);
    const films2 = await getFilms.getById(569094, 'ua');
    console.log('======================');
    console.log(films2);
    const films3 = await getFilms.getSearchQuery('new', 2, 'en');
    console.log('======================');
    console.log(films3);
  } catch (e) {
    console.log('Error', e);
  }
}

export default testFilms;
