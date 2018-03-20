import url from 'url';
import $ from 'jquery';

const routes = new Map();

function route(route, callback = () => {}) {
    if(route) {
        const opt = {
            callback,
            regex: [],
            params: []
        }

        const parts = route.split('/');
        let regex = '';
        for (let part of parts) {
            if (part[0] == ':') {
                opt.regex.push('([a-zA-Z0-9\-]+)');
                opt.params.push(part.substring(1, part.length));
            } else {
                if(part == '*') part = '.+';
                opt.regex.push(part);
            }
        }

        opt.regex = `^${opt.regex.join('\/')}$`;
        routes.set(route, opt);
    }
    else {
        init();
    }
}

function init() {
    window.addEventListener('popstate', e => {
        goto(e.state);
    });

    history.replaceState(document.location.pathname, '', document.location.href);

    // register click events
    attachClickHandler();
}

function attachClickHandler(elem = null) {
    let elems = $("a[href]");
    $(document).on("click", "a[href]", function(e) {
        const urlParsed = url.parse($(this).attr('href'));
        const rel = $(this).attr("rel") || false;
        const download = $(this).attr("download") || false;

        if (urlParsed) {
            let internal = true;

            if (urlParsed.hostname && urlParsed.hostname !== url.parse(window.location.href).hostname) {
                internal = false;
            }
            if (rel === 'external' || rel === 'download') {
                internal = false;
            }

            if (download !== false) {
                internal = false;
            }
            

            if (internal) {
                const route = url.parse($(this).attr("href")).path;
                
                history.pushState(route, '', route);
                goto(route);
                
                e.preventDefault();
            }
        }
        

    });
}

function goto(route) {
    for (let [name, opt] of routes.entries()) {
        const regex = new RegExp(opt.regex, 'i');
        const match = regex.exec(route);

        if (match !== null) {
            const params = {};
            match.shift(); // erster match ist route, also weg damit
            for (let i = 0; i < match.length; i++) { // dynamisches parameterobjekt mit namen => wert erzeugen
                params[opt.params[i]] = match[i];
            }

            opt.callback(params);
            return;
        }
    }

    throw `Route ${route} not defined!`;
}

function redirect(from, to) {
    if (routes.has(from) && routes.has(to)) {
        from = routes.get(from);
        to = routes.get(to);

        from.callback = function(params) {
            console.warn('Redirected!'); // TODO
            to.callback(params);
        }
    } else throw 'from and to must be valid routes!';
}

export {
    redirect,
    goto,
    route,
    attachClickHandler
};