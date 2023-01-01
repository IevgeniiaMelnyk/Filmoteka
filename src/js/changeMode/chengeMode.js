const modeButton = document.querySelector('.toggle-theme-btn');
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');

modeButton.addEventListener('click', function () {
   if (document.body.classList.contains('moon')) {
     document.body.classList.remove('moon');
     moon.classList.add('visually-hidden');
     sun.classList.remove('visually-hidden');
     localStorage.setItem('mode', !'moon');
   } else {
      document.body.classList.add('moon');
      localStorage.setItem('mode', 'moon');
       sun.classList.add('visually-hidden');
    moon.classList.remove('visually-hidden');
   }
});

if (localStorage.getItem('mode') === 'moon') {
  document.body.classList.add('moon');
  sun.classList.add('visually-hidden');
  moon.classList.remove('visually-hidden');
}