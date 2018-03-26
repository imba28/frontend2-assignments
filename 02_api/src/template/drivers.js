import DriversPage from '@/template/drivers.hbs';
import paginationWrapper from '@/js/pagination';
import drivers from '@/services/driver';

export default function (page = 1) {
    drivers(null, (page-1) * 30)
        .then(drivers => {
            const container = document.getElementById('container');
            container.innerHTML = DriversPage({
                drivers,
                pagination: paginationWrapper(page, 648, '/drivers/')
            });
        });

}