import driverPage from './template.hbs';
import errorPage from '@/components/error';
import Service from '@/js/service';

const driver = new Service('Driver');

export default function (slug) {
    driver.get({
        id: slug,
        include: 'Result', 
        map: {
            Result: 'Race'
        }
    })
        .then(response => {
            let [driver, results] = response;
            const container = document.getElementById('container');

            if (driver.total == 1) {
                // convert race results to object. each object key represents a year
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