import Result from '@/js/result';

let cache = [];

export default function() {
    const url = 'http://ergast.com/api/f1/constructors.json';

    return new Promise((resolve, reject) => {
        if (cache.length > 0) {
            resolve(cache);
        } else {
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    return new Result(json.MRData.ConstructorTable.Constructors, json.MRData.offset, json.MRData.total);
                })
                .then((result) => {
                    cache = result;
                    resolve(result);
                })
                .catch(err => reject(err));
        }
    });
}