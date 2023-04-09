import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';

import SingIn from './modules/SingIn';
import SingUp from './modules/SingUp';

const singIn = new SingIn('.form-login');
const singUp = new SingUp('.form-register');

singIn.init();
singUp.init();
