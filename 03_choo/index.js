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
      if (state.pools.wagons.current.length > 0 && state.tracks[trackId].current.length <= state.tracks[trackId].size) {
        if (state.tracks[trackId].current.length === 0) {
          if (state.pools.trains.current.length <= 0) {
            return state;
          }
          state.pools.trains.current.pop();
          state.tracks[trackId].current.unshift(locomotive);
        }

        console.log(state.tracks)

        state.pools.wagons.current.pop();
        state.tracks[trackId].current.push(wagon);
      }

      return state;
    },
    schedule: (trackId, state) => {
        if (state.tracks[trackId] && state.tracks[trackId].current.length > 0) {
            state.tracks[trackId].current = [];
            state.pools.trains.current.push(locomotive)
        }
        return state;
    }
  }
});

const mainView = (state, prev, send) => html`
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
      send(
        "addWagon"
      )} class="btn btn-primary" ${state.pools.wagons.current.length == state.pools.wagons.size ? `disabled`: ``}>Wagen zu Pool hinzufügen</button>
    <button onclick=${() =>
        send("moveWagon", 0)} class="btn btn-primary" ${state.tracks[0].current.length == state.tracks[0].size ? `disabled` : ``}>Add to track 1</button>
    <button onclick=${() =>
        send("moveWagon", 1)} class="btn btn-primary" ${state.tracks[1].current.length == state.tracks[1].size ? `disabled` : ``}>Add to track 2</button>
    ${state.tracks.map((wagons, idx) => {
      return html`<div class="gleis">
            Track ${idx + 1}: 
            ${wagons.current.map(v => emoji.get(v))}
        </div>`;
    })}

    <div class="input-group mb-3">
        <select class="custom-select" id="selectedTrack">
            <option selected>Choose...</option>
            ${state.tracks.map((wagons, trackId) => html`<option value="${trackId}">Track ${trackId + 1}</option>`)}
        </select>
        <div class="input-group-append">
            <button class="btn btn-danger" onclick=${() => send(
              "schedule",
              document.getElementById("selectedTrack").value
            )}>Schedule Train</button>
        </div>
    </div>
  </main>
`;

app.router((route) => [route('/', mainView)]);

const tree = app.start();
document.body.appendChild(tree);