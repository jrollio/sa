/**
 * Purpose: produce site map for given website and identify dead links referenced in each page of sitemap
 * Run by loading into browser through line 137, then run lines 138 - 142 and process output urls as input links in powershell:
 * c:\> foreach ($link in $(get-content -path .\links.txt)) { Write-Host $(invoke-webrequest $link | Select-object StatusCode, StatusDescription) $link }

foreach ($link in $(get-content -path .\links.txt)) { Write-Host $(invoke-webrequest -method HEAD $link | Select-object StatusCode, StatusDescription) $link }
 background usage / details in invoke-webrequest and invoke-restmethod:
https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-restmethod?view=powershell-7.4
https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest?view=powershell-5.1&WT.mc_id=ps-gethelp


 */
const loc = document.location.host.toLowerCase().split('.');
const tld = loc[loc.length-1];
const hn = loc[loc.length-2] + '.' + tld;

const origin = document.location.origin.toLowerCase();
const hr = document.location.href;
const pn = document.location.pathname;

const nl = document.querySelectorAll('[href],[src]');
const ifr = document.body.appendChild(document.createElement('iframe'));
const ifrs = document.body.appendChild(document.createElement('iframe'));
const m = new Map().set(document.location.href, 0);
// const largeMap = new Map().set(document.location.href);
const largeMap = new Map();

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
    let linksFrom = [];
    let linksTo = [];
    let refs = [];
    
    try {
        [...doc.querySelectorAll(`[href],[src]`)]
        .flat(Infinity)
        .map( x => {
            if ( x.href ) return { url: normalizeUrl(x.href).href, rec: x }
            if ( x.src ) return { url: normalizeUrl(x.src).src, rec: x }
        } )
        .sort()
        .forEach( e => { if (e) refs.push({
                            ref: e.rec?.href ?? e.rec?.src ?? e.rec?.rel ?? undefined
                            , reftyp: e.rec?.href ? 'href' : e.rec?.src ? 'src' : e.rec?.rel ? 'rel' : undefined
                            , nodeName: e.rec?.nodeName
                            , type: e.rec?.type
                            , nodeType: e.rec?.nodeType
                            , nodeText: e.rec?.textContent
                            , attributes: e.rec?.attributes
                            , title: e.rec?.title
                            , rel: e.rec?.rel
                            })
                        }
        )
        largeMap.set(doc.location.href, refs);
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

// function saveFile(refStr){
//     try {
//         const fh = await window.
//     }
// }

(async () => { 
    let u;
    mapPage(document);
    if ( !m.size ) m.set(hr, 0);
    while ( (u = returnNextTarget(m)) && u ) pArr.push ( await loadPage(u) )
})();


let linkSet = new Set();
[...largeMap.entries()].forEach(e=>e[1].forEach(a=>linkSet.add(a.ref)));


[...largeMap.entries()].forEach(e=>e[1].forEach(a=>console.log(e[0],a.reftyp, a.ref)));


// finally read linkSet into nodejs, fetch all, and report refs not returning with 200 OK


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