let cache = {};

export default function (driver) {
    if (cache[driver]) return Promise.resolve(cache[driver]);

    return new Promise((resolve, reject) => {
        const url = `http://ergast.com/api/f1/drivers/${driver}/results.json`;
        fetch(url)
            .then(response => response.json())
            .then(json => json.MRData.RaceTable.Races)
            .then((results) => {
                cache[driver] = results;
                resolve(results);
            })
            .catch(err => reject(err));
    });
}