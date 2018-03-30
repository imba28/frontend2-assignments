import Service from '@/js/service';

export default function (options = {}) {
    let url;
    const {
        id,
        manufacturer,
        offset = 0
    } = options;

    if (manufacturer) {
        url = `http://ergast.com/api/f1/constructors/${manufacturer}/drivers.json`
    } else if (id) {
        url = `http://ergast.com/api/f1/drivers/${id}.json`;
    } else {
        url = `http://ergast.com/api/f1/drivers.json?offset=${offset}`;
    }

    const service = new Service('Driver');
    return service.get(url);
}