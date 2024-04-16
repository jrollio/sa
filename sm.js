const loc = document.location.host.toLowerCase().split('.');
const tld = loc[loc.length-1];
const hn = loc[loc.length-2] + '.' + loc[loc.length-1];

const origin = document.location.origin.toLowerCase();
const hr = document.location.href;
const pn = document.location.pathname;

const nl = document.querySelectorAll('[href],[src]');
const ifr = document.body.appendChild(document.createElement('iframe'));
const m = new Map([[ origin, 1 ]]);


function normalizeUrl(url){
    console.info('normalizeUrl: evaluating',url);
    if ( typeof url === 'object' && url.href ) return url;
    // if ( !url.toLowerCase().match(/\s*(href)\s*=\s*/i) ) return undefined;
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

    [...ifr.contentDocument?.querySelectorAll(`a[href*='${hn}' i],a:not([href*='://'],[href*='tel:' i],[href*='mailto:' i])`)].flat(Infinity).map( x => { if ( x.href ) return normalizeUrl(x.href).href } ).filter( p => p && p.includes('/') && p !== curren
    m.set(currentPage, 1);
}

function crawlNextPage(targetPage){
    if ( targetPage === ifr.src ) return;
    let currentPage = ifr.src;
    ifr.src = targetPage;

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


mapFirstPage();

for ( [ k, v ] of m.entries()) {
    console.log(`k: ${k}, v: ${v}, loc.href: ${location.href.toLowerCase()}, ifr.contentWindow.location.href: ${ifr.contentWindow.location.href.toLowerCase()}`);
    
    if ( !v && k && k !== hr && !k.includes('#') ) {
        console.log(`Attempting to crawl... k: ${k}, v: ${v}, loc.href: ${location.href.toLowerCase()}, ifr.contentWindow.location.href: ${ifr.contentWindow.location.href.toLowerCase()}`);
        crawlNextPage(k);
    }
    console.log('finished crawling',k);
}