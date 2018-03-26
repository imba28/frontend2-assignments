import DriverPage from '@/template/driver.hbs';
import driver from '@/services/driver';

export default function (slug) {
    driver(slug)
        .then(driver => {
            const container = document.getElementById('container');
            container.innerHTML = DriverPage({
                driver
            });
        });
}