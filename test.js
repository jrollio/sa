const loc = document.location.host.toLowerCase().split('.');
const tld = loc[loc.length-1];
const hn = loc[loc.length-2] + '.' + loc[loc.length-1];

const origin = document.location.origin.toLowerCase();
const hr = document.location.href;
const pn = document.location.pathname;

const nl = document.querySelectorAll('[href],[src]');
const ifr = document.body.appendChild(document.createElement('iframe'));
// const m = new Map([[ origin, 1 ]]);
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

function crawlPage(){

    let currentPage = normalizeUrl(ifr.contentWindow.location).href;

    [...ifr.contentDocument?.querySelectorAll(`a[href*='${hn}' i],a:not([href*='://'],[href*='tel:' i],[href*='mailto:' i])`)].flat(Infinity).map( x => { if ( x.href ) return normalizeUrl(x.href).href } ).filter( p => p && p.includes('/') && p !== currentPage );
    m.set(currentPage, 1);
}

async function crawlNextPage(targetPage){
    if ( targetPage === ifr.src ) return;
    let currentPage = ifr.src;
    ifr.src = targetPage;
/*
    let p = new Promise((resolve, reject) => {
        setTimeout(() => )
    })
*/
    ifr.onload = () => { 
        console.log(`Attempting to crawl ${ifr.src}, loc.href: ${location.href.toLowerCase()}, ifr.contentWindow.location.href: ${ifr.contentWindow.location.href.toLowerCase()}`);
        try {
            crawlPage();
        } catch(e) {
            console.error(e, new Error(`Error encountered attempting to load: ${targetPage }`));
        }
    };
    ifr.onerror = () => {
        console.error(new Error(`Error encountered attempting to load: ${targetPage}`));
    }
    return;
}

function mapFirstPage(){
    [...document
        .querySelectorAll(
            `a[href*="${hn}" i]
            ,a:not([href*="://"],[href*="tel:" i],[href*="mailto:" i])`
        )
    ]
    .flat(Infinity)
    .map( x => { if ( x.href ) return normalizeUrl(x.href).href } )
    .filter( p => p && p.includes('/') && p !== hr && !p.includes('#') )
    .sort()
    .forEach(e => m.set( e, 0 ) );
}
/* ------------------------------------- */
let s = new Set();
/* ------------------------------------- */
function mapPage(doc){
    let mapLength = m.size;
    try {
        [...doc
            .querySelectorAll(
                `a[href*="${hn}" i]
                ,a:not([href*="://"],[href*="tel:" i],[href*="mailto:" i])`
            )
        ]
        .flat(Infinity)
        .map( x => { if ( x.href ) return normalizeUrl(x.href).href } )
        .filter( p => p && p.includes('/') && p !== hr && !p.includes('#') )
        .sort()
        .forEach(e => { if ( e && m.get(e) === undefined ) m.set(e, 0); } );
        /* .forEach(e => { if ( m.get(e) === undefined ) m.set(e, 0); if ( m.get(e) !== undefined && e === doc.location.href ) m.set(e, 1); */
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
        /* .forEach(e => { if ( m.get(e) === undefined ) m.set(e, 0); if ( m.get(e) !== undefined && e === doc.location.href ) m.set(e, 1); */
    } catch (e) {
        console.error( new Error(`Failure encountered during page mapping: ${e}`));
    }
}

let nlArr = [];
let pArr = [];
function loadPage(url) {
    return new Promise(function(resolve, reject) {
        let len = 0;
        ifr.src = url;
        ifr.onload = () => {
            nlArr.push(...[...ifr.contentDocument.querySelectorAll('a')].map(a=>a.href));
            len = mapPage(ifr.contentDocument);
            // resolve(nlArr.length);
            resolve(len);
        }
    });
  }
function returnNextTarget(m){
    for ( let [ x, y ] of m.entries() ) if ( y === 0 ) return x;
    return 0;
}

(async () => { 
    /*
    [...document.querySelectorAll(
        `a[href*="${hn}" i]
        ,a:not([href*="://"],[href*="tel:" i],[href*="mailto:" i])`
    )
]
.flat(Infinity)
.map( x => { if ( x.href ) return normalizeUrl(x.href).href } )
.filter( p => p && p.includes('/') && p !== hr && !p.includes('#') )
.sort().map( e => m.set(e, 0));
*/
    mapPage(document);
/*
for ( [ k, v ] of [ ...m.entries() ].filter( ([ k, v ]) => k && !v && k !== hr && !k.includes('#') ) ) pArr.push( await loadPage(k) );
*/
let u;
if ( !m.size ) m.set(hr, 0);
while ( (u = returnNextTarget(m)) && u ) pArr.push ( await loadPage(u) )

})();

// mapPage('anchors','all')
/*
    page = {
        url
        mapped
        [ linksFrom ]
        [ linksTo ]
    }
    ${page}.url.linksFrom.push(nl.filter(url => url === ${page} ).url);
*/

// 1 - scan list
    // let u;
    // if m.size === 0 m.set(hr, 0)
    // else
    // while ( (u = scanList(m)) && u ) pArr.push ( await loadPage(u) )


function listSize(m){

}


/* if list has no 0, then 
    return pArr
    else

    processlist(list){
    if list contains no keys = 0
        return
    
    if list contains a key = 0
        
    }

    loadPage(page){
        if page value = 1 return
        else l
    }
    */

