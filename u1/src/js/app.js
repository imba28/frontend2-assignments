import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.scss';

import {
    dateFormat
} from '@/js/helper';

import Handlebars from 'handlebars';
Handlebars.registerHelper('dateFormat', dateFormat);

import Home from '@/template/home.hbs';
import Player from '@/template/player.hbs';
import Players from '@/template/players.hbs';

import {route, goto} from './router';

import magnus from '@/public/static/magnus.json';
import giri from '@/public/static/giri.json';

const players = [magnus, giri];
const container = document.getElementById('container');

function render(template, ctx) {
    container.innerHTML = template(ctx);
}

route('/', function() {
    render(Home);
});

route('/players', function() {
    render(Players, {
        players
    });
});

route('/players/:slug', function (param) {
    render(Player, players.find((player) => player.slug == param.slug));
});

route('*', function() {
    container.innerHTML = '404 - Seite nicht gefunden!';
});

route();

goto(window.location.pathname);