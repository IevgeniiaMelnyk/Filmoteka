const modeText = document.querySelector('.change');

modeText.addEventListener('click', function () {
   if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark');
      localStorage.setItem('mode', !'dark');
      modeText.innerHTML = 'mode';
   } else {
      document.body.classList.add('dark');
      localStorage.setItem('mode', 'dark');
      modeText.innerHTML = 'mode';
   }
});

if (localStorage.getItem('mode') === 'dark') {
   document.body.classList.add('dark');
   modeText.innerHTML = 'mode';
}
