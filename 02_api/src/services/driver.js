let driverCache = [];

export default function (slug = null) {
    const url = slug ?
        `http://ergast.com/api/f1/drivers/${slug}.json` :
        'http://ergast.com/api/f1/drivers.json';

    return new Promise((resolve, reject) => {
        if (driverCache.length > 0) {
            if (slug) {
                resolve(driverCache.find((item) => item.driverId === slug));
            } else {
                resolve(driverCache);
            }
        } else {
            fetch(url)
                .then(response => response.json())
                .then(json => json.MRData.DriverTable.Drivers)
                .then((drivers) => {
                    if (slug) [drivers] = drivers;
                    else driverCache = drivers;

                    resolve(drivers);
                })
                .catch(err => reject(err));
        }
    });
}