import constructorsPage from './template.hbs';
import Service from '@/js/service';
import paginationWrapper from '@/js/pagination';

const constructors = new Service('Constructor');

export default function (page = 1) {
    constructors.get({
        offset: (page - 1) * 30
    })
        .then(response => {
            const container = document.getElementById('container');
            container.innerHTML = constructorsPage({
                constructors: response.data,
                pagination: paginationWrapper(page, response.total, '/constructors/'),
                current: parseInt(response.offset, 10) + response.data.length,
                total: response.total
            });
        });
}