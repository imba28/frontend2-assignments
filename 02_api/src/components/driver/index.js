import DriverPage from './template.hbs';
import ErrorPage from '@/components/error';
import driver from '@/services/driver';
import results from '@/services/result';

export default function (slug) {
    Promise.all([driver({id : slug}), results({driver: slug})])
        .then(json => {
            let [driver, results] = json;
            const container = document.getElementById('container');

            if (driver.total == 1) {   
                container.innerHTML = DriverPage({
                    driver: driver.data[0],
                    results: results.data
                });
            } else {
                ErrorPage('Pilot wurde nicht gefunden!');
            }
        });
}