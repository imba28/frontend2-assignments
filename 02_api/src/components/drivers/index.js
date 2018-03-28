import driversPage from './template.hbs';
import paginationWrapper from '@/js/pagination';
import drivers from '@/services/driver';

export default function (page = 1) {
    drivers({offset: (page-1) * 30})
        .then(response => {
            const container = document.getElementById('container');
            container.innerHTML = driversPage({
                drivers: response.data,
                pagination: paginationWrapper(page, response.total, '/drivers/'),
                current: parseInt(response.offset, 10) + response.data.length,
                total: response.total
            });
        });
}