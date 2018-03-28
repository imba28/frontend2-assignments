import Result from '@/js/result';

let cache = {};

export default function (driver) {
    if (cache[driver]) return Promise.resolve(cache[driver]);

    return new Promise((resolve, reject) => {
        const url = `http://ergast.com/api/f1/drivers/${driver}/results.json`;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                return new Result(json.MRData.RaceTable.Races, json.MRData.offset, json.MRData.total);
            })
            .then((result) => {
                cache[driver] = result;
                resolve(result);
            })
            .catch(err => reject(err));
    });
}