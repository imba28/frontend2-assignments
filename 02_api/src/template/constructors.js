import ConstructorsPage from '@/template/constructors.hbs';
import constructors from '@/services/constructor';

export default function () {
    constructors()
        .then(response => {
            const container = document.getElementById('container');
            container.innerHTML = ConstructorsPage({
                constructors: response.data
            });
        });

}