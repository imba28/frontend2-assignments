let cache = [];

export default function() {
    const url = 'http://ergast.com/api/f1/constructors.json';

    return new Promise((resolve, reject) => {
        if (cache.length > 0) {
            resolve(cache);
        } else {
            fetch(url)
                .then(response => response.json())
                .then(json => json.MRData.ConstructorTable.Constructors)
                .then((constructors) => {
                    cache = constructors;
                    resolve(constructors);
                })
                .catch(err => reject(err));
        }
    });
}