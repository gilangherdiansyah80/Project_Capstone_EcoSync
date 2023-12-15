/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
import 'regenerator-runtime';
import '../scss/styles.scss';
import '../scss/responsive.scss';
import '../components/navbarComponent';
import '../components/footerComponent';
import '../components/head-custom';
import Pagination from './pagination';
import Bencana from './cardBencana';
import Cuaca from './cuacaLandingPage';
import WeatherApp from './cuaca';

const weatherApp = new WeatherApp();

const myPagination = new Pagination();
myPagination.init();

const myBencana = new Bencana();
myBencana.init();

const myCuaca = new Cuaca();
