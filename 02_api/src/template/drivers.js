import DriversPage from '@/template/drivers.hbs';
import paginationWrapper from '@/js/pagination';
import drivers from '@/services/driver';

export default function (page = 1) {
    drivers(null, (page-1) * 30)
        .then(response => {
            const container = document.getElementById('container');
            container.innerHTML = DriversPage({
                drivers: response.data,
                pagination: paginationWrapper(page, response.total, '/drivers/')
            });
        });

}