/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
import 'regenerator-runtime';
import '../scss/styles.scss';
import '../scss/responsive.scss';
import '../components/navbarComponent';
import '../components/footerComponent';
import '../components/head-custom';
import Pagination from './pagination';

const myPagination = new Pagination();
myPagination.init();
