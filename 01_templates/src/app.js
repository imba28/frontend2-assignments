import 'bootstrap/dist/css/bootstrap.css';
import '@/css/style.scss';

import Handlebars from 'handlebars';
import {dateFormat, getAge} from '@/js/helper';
Handlebars.registerHelper('dateFormat', dateFormat);
Handlebars.registerHelper('getAge', getAge);

import {route, goto} from '@/js/router';
import routes from '@/js/routes';

Object.entries(routes).forEach((routeInfo) => {
    const [uri, fn] = routeInfo;
    route(uri, fn);
});


route();
goto(window.location.pathname);