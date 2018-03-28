import constructorPage from './template.hbs';
import errorPage from '@/components/error';
import driver from '@/services/driver';
import constructor from '@/services/constructor';

export default function (slug) {
    Promise.all([driver({manufacturer: slug}), constructor({id: slug})])
        .then(json => {
            let [drivers, constructor] = json;
            const container = document.getElementById('container');

            if (constructor.total == 1) {
                container.innerHTML = constructorPage({
                    drivers: drivers.data,
                    constructor: constructor.data[0]
                });
            } else {
                errorPage('This constructor does not exist!');
            }
        });
}