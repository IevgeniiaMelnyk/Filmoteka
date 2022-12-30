import { getRefs } from '../refs';

const refs = getRefs();

const buttonUp = {
  el: refs.buttonUp,
  show() {
    this.el.classList.remove('up-button_hiden');
  },
  hide() {
    this.el.classList.add('up-button_hiden');
  },

  addEventListener() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      scrollY > 700 ? this.show() : this.hide();
    });
    document.querySelector('.up-button').onclick = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    };
  },
};

buttonUp.addEventListener();