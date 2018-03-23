import DriverPage from '@/services/driver';
import ErrorPage from '@/template/error.hbs';

const container = document.getElementById('container');

function render(template, ctx) {
    container.innerHTML = template(ctx);
}

export default {
    '/drivers': () => DriverPage(),
    '*': () => render(ErrorPage, {error: '404 - Page not found'})
}