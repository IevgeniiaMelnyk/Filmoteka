import { refs } from '../refs';
export function spinnerOn() {
  refs.spinner.classList.remove('visually-hidden');
}
export function spinnerOff() {
  refs.spinner.classList.add('visually-hidden');
}
