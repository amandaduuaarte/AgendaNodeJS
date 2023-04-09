/* eslint-disable no-undef */
import validator from 'validator';

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');
    const emailSpan = el.querySelector('#email-error');
    const passwordSpan = el.querySelector('#password-error');
    let error = false;

    if (!validator.isEmail(emailInput.value)) {
      emailSpan.innerHTML = 'E-mail inválido';
      error = true;
    }

    if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
      passwordSpan.innerHTML = 'Senha precisa ter entre 4 e 50 caracteres';
      error = true;
    }

    if (!error) el.submit();
  }
}
