import Home from '@/template/home.hbs';
import Player from '@/template/player.hbs';
import Players from '@/template/players.hbs';
import Contact from '@/template/contact.hbs';
import Invalid from '@/template/error.hbs';

import magnus from '@/public/static/magnus.json';
import giri from '@/public/static/giri.json';

const players = [magnus, giri];

const container = document.getElementById('container');

function render(template, ctx) {
    container.innerHTML = template(ctx);
}

export default {
    '/': () => render(Home),
    '/players': () => render(Players, {players}),
    '/players/:slug': (params) => render(Player, players.find((player) => player.slug == params.slug)),
    '/contact': () => render(Contact, {email: 'somemail@nothing.com'}),
    '*': () => render(Invalid, {error: '404 - Page not found'})
}