import Result from '@/js/result';

export default function (slug = null, offset = 0) {
    const url = slug ?
        `http://ergast.com/api/f1/drivers/${slug}.json` :
        `http://ergast.com/api/f1/drivers.json?offset=${offset}`;

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(json => {
                return new Result(json.MRData.DriverTable.Drivers, json.MRData.offset, json.MRData.total);
            })
            .then((response) => {
                resolve(response);
            })
            .catch(err => reject(err));
    });
}