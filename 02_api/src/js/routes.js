import DriversPage from '@/template/drivers';
import DriverPage from '@/template/driver';
import ErrorPage from '@/template/error.hbs';
import ConstructorsPage from '@/template/constructors';

const container = document.getElementById('container');

function render(template, ctx) {
    container.innerHTML = template(ctx);
}

export default {
    '/drivers': () => DriversPage(),
    '/drivers/page/:page': (page) => DriversPage(page),
    '/driver/:slug': (driverID) => DriverPage(driverID),
    '/constructors': () => ConstructorsPage(),
    '/constructors/page/:page': (page) => ConstructorsPage(page),
    '*': () => render(ErrorPage, {error: '404 - Page not found'})
}