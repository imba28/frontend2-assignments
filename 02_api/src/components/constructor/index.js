import ConstructorPage from './template.hbs';
import ErrorPage from '@/components/error';
import driver from '@/services/driver';
import constructor from '@/services/constructor';

export default function (slug) {
    Promise.all([driver({manufacturer: slug}), constructor({id: slug})])
        .then(json => {
            let [drivers, constructor] = json;
            const container = document.getElementById('container');

            if (constructor.total == 1) {
                container.innerHTML = ConstructorPage({
                    drivers: drivers.data,
                    constructor: constructor.data[0]
                });
            } else {
                container.innerHTML = ErrorPage({
                    error: 'Konstrukteur wurde nicht gefunden!'
                });
            }
        });
}