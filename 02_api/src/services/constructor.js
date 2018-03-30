import Service from '@/js/service';

export default function (options) {
    const {
        id = null,
        offset = 0
    } = options;

    let url = id ?
        `http://ergast.com/api/f1/constructors/${id}.json` :
        `http://ergast.com/api/f1/constructors.json?offset=${offset}`;

    const service = new Service('Constructor');
    return service.get(url);
}