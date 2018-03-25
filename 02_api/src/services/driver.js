export default function (slug = null) {
    const url = slug ?
        `http://ergast.com/api/f1/drivers/${slug}.json` :
        'http://ergast.com/api/f1/drivers.json';
    
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(json => json.MRData.DriverTable.Drivers)
            .then((drivers) => {
                resolve(drivers);
            })
            .catch(err => reject(err));
    })
}