import DriversPage from '@/template/drivers.hbs';
import drivers from '@/services/driver';

export default function () {
    drivers()
        .then(drivers => {
            const container = document.getElementById('container');
            container.innerHTML = DriversPage({
                drivers
            });
        });

}