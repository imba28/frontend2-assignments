import Result from '@/js/result';

export default function (options = {}) {
    let url;
    const {
        id,
        manufacturer,
        offset = 0
    } = options;

    if (manufacturer) {
        url = `http://ergast.com/api/f1/constructors/${manufacturer}/drivers.json`
    } else if(id) {
        url = `http://ergast.com/api/f1/drivers/${id}.json`;
    } else {
        url = `http://ergast.com/api/f1/drivers.json?offset=${offset}`;
    }

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