import Result from '@/js/result';

const baseUrl = "http://ergast.com/api/f1";

class Service {
    constructor(name) {
        this.name = name;
    }

    get(opt = {}) {
        let {
            offset = 0,
                id = null,
                limit = 30,
                include = [],
                map = {}
        } = opt;

        if (!Array.isArray(include)) {
            include = [include]
        }

        const url = `${baseUrl}/${this.name.toLowerCase()}s${id ? `/${id.toLowerCase()}` : ``}.json?offset=${offset}&limit=${limit}`;
        console.log(url);

        const p = new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    // map object key names of json response. 
                    const table = map[this.name] ? map[this.name] : this.name;

                    return new Result(
                        json.MRData[`${table}Table`][`${table}s`],
                        json.MRData.offset,
                        json.MRData.total
                    );
                })
                .then(result => resolve(result))
                .catch(err => reject(new Error(err)));
        });

        if (include.length > 0) {
            const a = include.map(resource => {
                const options = {
                    id: `${id}/${resource}s`,
                    map: {}
                }   
                // if mapping name for resource is defined map root table name (this.name) to resource
                options.map[this.name] = map[resource] ? map[resource] : resource;

                return this.get(options);
            });

            a.unshift(p)

            return new Promise((resolve) => {
                Promise.all(a).then(data => resolve(data));
            });
        }

        return p;
    }
}

export default Service;