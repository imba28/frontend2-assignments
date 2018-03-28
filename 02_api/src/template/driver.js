import DriverPage from '@/template/driver.hbs';
import ErrorPage from '@/template/error.hbs';
import driver from '@/services/driver';
import results from '@/services/result';

export default function (slug) {
    Promise.all([driver(slug), results(slug)])
        .then(json => {
            let [driver, results] = json;
            const container = document.getElementById('container');

            if (driver.total == 1) {   
                container.innerHTML = DriverPage({
                    driver: driver.data[0],
                    results: results.data
                });
            } else {
                container.innerHTML = ErrorPage({
                    error: 'Pilot wurde nicht gefunden!'
                });
            }
        });
}