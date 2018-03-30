import Result from '@/js/result';

class Service {
    constructor(name) {
        this.name = name;
    }

    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(json => new Result(json.MRData[`${this.name}Table`][`${this.name}s`], json.MRData.offset, json.MRData.total))
                .then((response) => {
                    resolve(response);
                    return response;
                })
                .catch(err => reject(err));
        });
    }
}

export default Service;