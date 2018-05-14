const choo = require('choo');
const html = require('choo/html');
const emoji = require('node-emoji');
const css = require('sheetify');
const app = choo();

/*function extend(target, ...sources) {
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
}*/

css('bootstrap');

const styles = css`
  h1 {
    color: blue;
  }

  .icons {
    font-size: 2em;
  }
`;

const wagon = 'railway_car';
const locomotive = 'steam_locomotive';

app.model({
    state: {
        pools: {
            trains: {
                size: 4,
                current: [locomotive, locomotive, locomotive, locomotive]
            },
            wagons: {
                size: 10,
                current: []
            }
        },
        tracks: [
            {
                size: 4,
                current: []
            },
            {
                size: 5,
                current: []
            }
        ],
        selectedTrack: null
    },
    effects: {
        schedule: (trackID, state, send, done) => {
            if (state.tracks[trackID]) {
                send('selectTrack', trackID, done);
                send('clearTrack', trackID, done);
                setTimeout(() => {
                    send('addTrain', null, done);
                }, 5000)
            }
        }
    },
    reducers: {
        selectTrack: (trackID, state) => {
            if (state.tracks[trackID]) {
                state.selectedTrack = parseInt(trackID);
            }
            return state;            
        },
        addWagon: (data, state) => {
            if (state.pools.wagons.current.length < 10) {
                state.pools.wagons.current.push(1);
            }
            return state;
        },
        moveWagon: (trackId, state) => {
            if (state.pools.wagons.current.length > 0 && state.tracks[trackId].current.length <= state.tracks[trackId].size) {
                if (state.tracks[trackId].current.length === 0) {
                    if (state.pools.trains.current.length <= 0) {
                        return state;
                    }
                    state.pools.trains.current.pop();
                    state.tracks[trackId].current.unshift(locomotive);
                }

                state.pools.wagons.current.pop();
                state.tracks[trackId].current.push(wagon);
            }

            return state;
        },
        addTrain: (data, state) => {
            state.pools.trains.current.push(locomotive)
            return state;
        },
        clearTrack: (trackID, state) => {
            if (state.tracks[trackID]) {
                state.tracks[trackID].current = [];
            }
            return state;
        }
    }
});

function canSchedule(state, trackID) {
    return state.tracks[trackID] && state.tracks[trackID].current.length > 0;
}

const mainView = (state, prev, send) => html`
  <main class=${styles}>
    <h1>Rangierbahnhof</h1>
    <hr>
    <h3>
        Pools
    </h3>
    <p>
        Wagons: <span class="icons">${state.pools.wagons.current.map(() => emoji.get(wagon))}</span>
    </p>
    <p>
        Trains: <span class="icons">${state.pools.trains.current.map(() => emoji.get(locomotive))}</span>
    </p>
    <div class="input-group mb-3 w-50">
        <select class="custom-select" id="selectedTrack" onchange=${ (e) => send('selectTrack', e.target.value) }>
            <option ${state.selectedTrack == null ? 'selected' : ''}>Choose...</option>
            ${state.tracks.map((wagons, trackId) => html`
            <option ${trackId == state.selectedTrack ? 'selected' : ''} value="${trackId}">
                Track ${trackId + 1}
            </option>`
            )}
        </select>
        <div class="input-group-append">
            <button class="btn btn-danger" onclick=${() => send(
        "schedule",
        document.getElementById("selectedTrack").value
    )} ${ 
        !canSchedule(state, state.selectedTrack) ? 
        'disabled' : ''
        }>Schedule Train</button>
        </div>
    </div>

    <button onclick=${() =>
        send(
            "addWagon"
        )} class="btn btn-primary" ${state.pools.wagons.current.length == state.pools.wagons.size ? `disabled` : ``}>Wagen zu Pool hinzufügen</button>
    
    <button 
        onclick=${() => send("moveWagon", state.selectedTrack)}
        class="btn btn-primary" 
        ${
            state.pools.wagons.current.length > 0 &&
            state.tracks[state.selectedTrack] && 
            state.tracks[state.selectedTrack].current.length != state.tracks[state.selectedTrack].size + 1 
            ? `` : `disabled`
        }>Add to track ${state.selectedTrack != null ? `(${state.selectedTrack + 1})` : ''}</button>

    ${state.tracks.map((wagons, idx) => html`
        <div class="gleis">
            Track ${idx + 1}: 
            <span class="icons">
            ${wagons.current.map(v => emoji.get(v))}
            </span>
        </div>`
    )}
  </main>
`;

app.router((route) => [route('/', mainView)]);

const tree = app.start();
document.body.appendChild(tree);