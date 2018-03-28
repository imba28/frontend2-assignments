import errorPage from './template.hbs';

export default function (error) {
    return new Promise((resolve) => {
        const container = document.getElementById('container');
        container.innerHTML = errorPage({error});

        resolve();
    });
}