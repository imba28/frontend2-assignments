import driverPage from './template.hbs';
import errorPage from '@/components/error';
import driver from '@/services/driver';
import results from '@/services/result';

export default function (slug) {
    Promise.all([driver({id: slug}), results({driver: slug})])
        .then(json => {
            let [driver, results] = json;
            const container = document.getElementById('container');

            if (driver.total == 1) {
                const races = results.data.reduce((obj, race) => {
                    if (!obj[race.season]) {
                        obj[race.season] = [];
                    }

                    obj[race.season].push({
                        name: race.raceName,
                        position: race.Results[0].position,
                        date: race.date
                    });

                    return obj;
                }, {});

                container.innerHTML = driverPage({
                    driver: driver.data[0],
                    races
                });
            } else {
                errorPage('Driver was not found!');
            }
        });
}