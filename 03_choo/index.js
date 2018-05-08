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
            [],
            []
        ]
    },
    reducers: {
        addWagon: (data, state) => {
            if (state.pools.wagons.current.length < 10) {
                state.pools.wagons.current.push(1);
            }
            return state;
        },
        moveWagon: (trackId, state) => {
            if (state.pools.wagons.current.length > 0) {
                if (state.tracks[trackId].length === 0) {
                    if (state.pools.trains.current.length <= 0) {
                        return state;
                    }
                    state.pools.trains.current.pop();
                    state.tracks[trackId].unshift(locomotive);
                }
                
                state.pools.wagons.current.pop();
                state.tracks[trackId].push(wagon);
            }

            return state;
        },
        abfahrt: (trackId, state) => {
            if (state.tracks[trackId] && state.tracks[trackId].length > 0) {
                state.tracks[trackId] = [];
            }
            
            return state
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
    <br>
    <button onclick=${() =>
        send('moveWagon', 0)} class="btn btn-primary">Add to track 1</button>
    <button onclick=${() =>
        send('moveWagon', 1)} class="btn btn-primary">Add to track 2</button>
    ${state.tracks.map((wagons, idx)=> {
        return html`<div class="gleis">
            Gleis ${idx+1}: 
            ${wagons.map((v) => emoji.get(v))}
        </div>`
    })}

    <div class="input-group mb-3">
        <select class="custom-select" id="selectTrack">
            <option selected>Gleis wählen...</option>
            <option value="0">Gleis 1</option>
            <option value="1">Gleis 2</option>
        </select>
        <div class="input-group-append"
        onclick = "${() => send('abfahrt', document.getElementById('selectTrack').value)}" >
            <label class="input-group-text">Abfahrt!</label>
        </div>
    </div>
  </main>
`;

app.router((route) => [route('/', mainView)]);

const tree = app.start();
document.body.appendChild(tree);