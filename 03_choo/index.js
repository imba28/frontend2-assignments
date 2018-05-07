const choo = require('choo');
const html = require('choo/html');
const emoji = require('node-emoji');
const css = require('sheetify');
const app = choo();

function extend(target, ...sources) {
    sources.forEach(from => {
        if (typeof from !== 'object') return;
        for (var j in from) {
            if (from.hasOwnProperty(j)) {
                target[j] = typeof from[j] === 'object' ?
                    extend({}, target[j], from[j]) :
                    from[j];
            }
        }
    })

    return target;
}

css('bootstrap');

const styles = css `
  h1 {
    color: blue;
  }
`;

const wagon = 'railway_car';
const locomotive = 'steam_locomotive';

// steam_locomotive
app.model({
    state: {
        pools: {
            trains: {
                size: 4,
                current: [4]
            },
            wagons: {
                size: 10,
                current: []
            }
        },
        tracks: [
            [locomotive, wagon, wagon, wagon],
            [locomotive, wagon]
        ]
    },
    reducers: {
        addWagon: (data, state) => {
            if (state.pools.wagons.current.length < 10) {
                state.pools.wagons.current.push(1);
            }
            return state;
        },
        moveWagon: (data, state) => {
            const add = [];

            if (state.wagons.length > 1) {
                state.wagons.pop();
                add.push(wagon);
            }

            if (state.gleis.length === 0) {
                add.push(locomotive);
            }

            return Object.assign(state, {
                wagons: state.wagons,
                gleis: [...state.gleis, ...add]
            });
        }
    }
});

const mainView = (state, prev, send) => html `
  <main class=${styles}>
    <h1>Rangierbahnhof</h1>
    <hr>
    <h3>
        Pools
    </h3>
    <p>
        Wagons: ${state.pools.wagons.current.map(() => emoji.get(wagon))}
    </p>
    <p>
        Trains: ${state.pools.trains.current.map(() => emoji.get(locomotive))}
    </p>
    <button onclick=${() =>
      send('addWagon')} class="btn btn-primary">Wagen zu Pool hinzufügen</button>
    <button onclick=${() =>
      send('moveWagon')} class="btn btn-danger">Rangieren</button>
    
    ${state.tracks.map((wagons, idx)=> {
        return html`<div class="gleis">
            Gleis ${idx+1}: 
            ${wagons.map((v) => emoji.get(v))}
        </div>`
    })}
  </main>
`;

app.router((route) => [route('/', mainView)]);

const tree = app.start();
document.body.appendChild(tree);