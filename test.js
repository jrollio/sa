const loc = document.location.host.toLowerCase().split('.');
const tld = loc[loc.length-1];
const hn = loc[loc.length-2] + '.' + tld;

const origin = document.location.origin.toLowerCase();
const hr = document.location.href;
const pn = document.location.pathname;

const nl = document.querySelectorAll('[href],[src]');
const ifr = document.body.appendChild(document.createElement('iframe'));
const ifrs = document.body.appendChild(document.createElement('iframe'));
const m = new Map();
const allLinksSet = new Set().add(document.location.href);


function normalizeUrl(url){
    if ( typeof url === 'object' && url.href ) return url;
    if ( url.includes('://') )
        try {
            return new URL(url);
        } catch(e) {
            console.error(e, new Error('function requires valid url input string'));
            return undefined;
        }
    
    if ( url.startsWith( '/' ) )
        try {
            return new URL( origin + url );
        } catch(e) {
            console.error(e, new Error('function requires valid url input string'));
            return undefined;
        }


    try {
        return new URL( hr + url );
    } catch(e) {
        console.error(e, new Error('function requires valid url input string'));
        return undefined;
    }
}


function mapPage(doc){
    let mapLength = m.size;
    try {
        [...doc
            .querySelectorAll(
                `a[href*="${hn}" i]
                ,a:not([href*="://"]
                ,[href*="tel:" i]
                ,[href*="mailto:" i])`
            )
        ]
        .flat(Infinity)
        .map( x => { if ( x.href ) return normalizeUrl(x.href).href } )
        .filter( p => p && p.includes('/') && p !== hr && !p.includes('#') )
        .sort()
        .forEach(e => { if ( e && m.get(e) === undefined ) m.set(e, 0); } );

        addAllLinks(doc);
    } catch (e) {
        console.error( new Error(`Failure encountered during page mapping: ${e}`));
    }
    
    m.get(doc.location.href) === 0
    ?
    m.set(doc.location.href, 1)
    :
    console.error( new Error(`Mapped page not found in map`));

    return m.size - mapLength;
}

function addAllLinks(doc){
    
    try {
        [...doc.querySelectorAll(`[href],[src]`)]
        .flat(Infinity)
        .map( x => {
            if ( x.href ) return normalizeUrl(x.href).href
            if ( x.src ) return normalizeUrl(x.src).src
        } )
        .sort()
        .forEach( e => { if (e) allLinksSet.add(e) } );
    } catch (e) {
        console.error( new Error(`Failure encountered during page mapping: ${e}`));
    }
}

let pArr = [];
function loadPage(url) {
    return new Promise(function(resolve, reject) {
        let len = 0;
        ifr.src = url;
        ifr.onload = () => {
            len = mapPage(ifr.contentDocument);
            resolve(len);
        }
    });
  }
function returnNextTarget(m){
    for ( let [ x, y ] of m.entries() ) if ( y === 0 ) return x;
    return 0;
}

(async () => { 
    let u;
    mapPage(document);
    if ( !m.size ) m.set(hr, 0);
    while ( (u = returnNextTarget(m)) && u ) pArr.push ( await loadPage(u) )
})();

// mapPage('anchors','all')
/*
    let nlArr = [];
    page = {
        url
        mapped
        linkAttribute : 'href' 'src'
        [ linksFrom ]
        [ linksTo ]
        title
        elementTextContent
        parentElement
        elementType
        nodeType
        nodeName
        nodeValue
        attributes
    }
    ${page}.url.linksFrom.push(nl.filter(url => url === ${page} ).url);
    nlArr.push(...[...doc.querySelectorAll('a')].map(a=>a.href));
    allLinks.set({doc.location, 1, . . . . })

*/