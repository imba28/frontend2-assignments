import DriverPage from '@/template/driver.hbs';

import driver from '@/services/driver';
import results from '@/services/result';

export default function (slug) {
    Promise.all([driver(slug), results(slug)])
        .then(json => {
            let [driver, results] = json;

            const container = document.getElementById('container');
            container.innerHTML = DriverPage({
                driver,
                results
            });
        });
}