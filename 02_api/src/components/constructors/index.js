import ConstructorsPage from './template.hbs';
import constructors from '@/services/constructor';
import paginationWrapper from '@/js/pagination';

export default function (page = 1) {
    constructors({offset: (page - 1) * 30})
        .then(response => {
            const container = document.getElementById('container');
            container.innerHTML = ConstructorsPage({
                constructors: response.data,
                pagination: paginationWrapper(page, response.total, '/constructors/') 
            });
        });
}