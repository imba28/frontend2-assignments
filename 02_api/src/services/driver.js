import DriversPage from '@/template/drivers.hbs';

export default function () {
    fetch('http://ergast.com/api/f1/drivers.json')
        .then(response => response.json())
        .then(json => json.MRData.DriverTable.Drivers)
        .then((drivers) => {
            const container = document.getElementById('container');
            container.innerHTML = DriversPage({
                drivers
            });
        });
}