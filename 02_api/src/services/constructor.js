import Result from '@/js/result';

export default function(options) {
    const {
        id = null,
        offset = 0
    } = options;

    let url;
    if (id) {
        url = `http://ergast.com/api/f1/constructors/${id}.json`;
    } else {
        url = `http://ergast.com/api/f1/constructors.json?offset=${offset}`;
    }

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(json => {
                return new Result(json.MRData.ConstructorTable.Constructors, json.MRData.offset, json.MRData.total);
            })
            .then((result) => {
                resolve(result);
            })
            .catch(err => reject(err));
    });
}