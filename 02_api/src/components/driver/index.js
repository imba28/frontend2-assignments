import driverPage from './template.hbs';
import errorPage from '@/components/error';
import driver from '@/services/driver';
import results from '@/services/result';

export default function (slug) {
    Promise.all([driver({id : slug}), results({driver: slug})])
        .then(json => {
            let [driver, results] = json;
            const container = document.getElementById('container');

            if (driver.total == 1) {   
                container.innerHTML = driverPage({
                    driver: driver.data[0],
                    results: results.data
                });
            } else {
                errorPage('Pilot wurde nicht gefunden!');
            }
        });
}