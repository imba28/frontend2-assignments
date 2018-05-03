import constructorPage from './template.hbs';
import errorPage from '@/components/error';
import Service from '@/js/service';

const constructor = new Service('Constructor');

export default function (slug) {
    constructor.get({
        id: slug,
        include: 'Driver'
    })
        .then(json => {
            let [constructor, drivers] = json;
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