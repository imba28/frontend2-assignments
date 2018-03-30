import Service from '@/js/service';

let cache = {};

export default function (options = {}) {
    const {driver = null} = options;

    if (cache[driver]) return Promise.resolve(cache[driver]);

    const url = `http://ergast.com/api/f1/drivers/${driver}/results.json?limit=1000`;
    const service = new Service('Race');

    return service.get(url).then(result => {
        cache[driver] = result;
        return result;
    });
}