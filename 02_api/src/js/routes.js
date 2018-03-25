import DriversPage from '@/template/drivers';
import DriverPage from '@/template/driver';
import ErrorPage from '@/template/error.hbs';

const container = document.getElementById('container');

function render(template, ctx) {
    container.innerHTML = template(ctx);
}

export default {
    '/drivers': () => DriversPage(),
    '/driver/:slug': (params) => DriverPage(params['slug']),
    '*': () => render(ErrorPage, {error: '404 - Page not found'})
}