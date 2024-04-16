```js
a = document.querySelector('button.correct p').textContent;
s = document.querySelector('button.correct ~ div.answer-solution p').textContent;
```
```js
console.log(document.querySelector('button.correct p').textContent);
console.log(document.querySelector('button.correct ~ div.answer-solution p').textContent);

console.log(document.querySelector('section.question-content').textContent);
```


```js
// Extract text content to local file
window.showSaveFilePicker().then(h=>h.createWritable().then(w=>{document.querySelectorAll('.fr-view p').forEach(e=>w.write(e.textContent + '\n')); w.close();}));
```
```js
/*
const fh = async () => await window.showSaveFilePicker();
const w = async () => await fh.createWritable();
*/
let c;
let fh = await window.showSaveFilePicker();
let w = await fh.createWritable();

// repeat for each question / page
c = document.querySelectorAll('section.question-content');
c.forEach(e => w.write(e.textContent + '\n'));

//finally, after last question / page...
w.close();
```
### Sitemap - Site map recursion
#### Select the target elements
```js
let anchors = document.querySelectorAll('a[href*="austinsportsbehavioralhealth.com/"]');

document.querySelectorAll('a[href*="austinsportsbehavioralhealth.com/"]').forEach(e=>s.add(e.href));
```
1. Get the root
2. Select the children
3. find all anchor
4. for unique url in Set, open each URL, queryselectorall links, add to set
5. Relevant properties of anchor element NodeList items include all the key pieces of the URL itself, including: .host, .hostname, .href, .protocol, .pathname
nl = document.querySelectorAll('[href],[src]') //.forEach((e,i)=>console.log(i, e ));//, e.href, e.protocol, e.host, e.hostname, e.pathname));
also need to flatten returned array
nl.forEach(e=>console.log(e.nodeName));
for each where nodeName is type 'A' and hostname and .origin === href
    add pathname to Set 
    for each pathname in set
    visit
    mark not visited, visited or failed
    select all links
    add to Set
    repeat

    visit
    mark not visited, visited or failed
    repeat

    for each path

    for each 0 entry in current root of Set not equal to root and not equal to '#';:
        visit entry
        mark as visited or failed
        select all links
        add to set
        repeat

function(root = X)
    add X to Set
    mark X visited
    add all paths from X to Set
    function(nextUnvisitedPathInSet) else return;
    this.location.replace('newPathName');
// consider arr.flat(Infinity) if flatMap does not support a depth parameter

[...document.querySelectorAll('a[href*="austinsportsbehavioralhealth.com"],a:not([href="://"])')].flat(Infinity).filter( (x) => x.toString().includes('/') );

[...document.querySelectorAll('a[href*="austinsportsbehavioralhealth.com"],a:not([href="://"])')].filter( (x) => x.toString().includes('/') ).flat(Infinity).map( a => a.href).sort((a,b)=>b-a);

se = new Set([...document.querySelectorAll('a[href*="austinsportsbehavioralhealth.com"],a:not([href="://"])')].filter( (x) => x.toString().includes('/') ).flat(Infinity).map( a => a.href).sort((a,b)=>b-a));

me = new Map([...document.querySelectorAll('a[href*="austinsportsbehavioralhealth.com"],a:not([href="://"])')].filter( (x) => x.toString().includes('/') ).flat(Infinity).map( a => a.href).sort((a,b)=>b-a).map(e=>[e,0]));

for ( k of me.keys()) console.log(new URL(k).pathname);

m = new Map([...document.querySelectorAll('a[href*="austinsportsbehavioralhealth.com"],a:not([href="://"])')].flat(Infinity).map( x => x.pathname ).filter( p => p.includes('/')).sort((a,b)=>b-a).map( p => [ p, 0 ] ));

for ( k of nm.keys()) { this.location.replace(k); add to map noting visits }

Keep the map in the main thread

Launch the pages into web workers that run the querySelector and return the map elements back to the main thread

Add to the map using the messages returned by the workers

Worker(location.pathname){
    open 
    query selector
    return result
}

can a webworker open a page and access it's own dom or be passed a dom?

```js
var myWorker = new Worker("my_task.js"); //  The URI passed as parameter of the Worker constructor must obey the same-origin policy . There is currently disagreement among browsers vendors on what URIs are of the same-origin.

myWorker.addEventListener("message", function (event) {
  // This event handler will be called when the worker calls its own Worker.postMessage() function.
  
  // Data passed between the main page and workers are copied, not shared. Objects are serialized as they're handed to the worker, and subsequently, de-serialized on the other end.
  
  // The data is available in event.data.
}, false);

myWorker.addEventListener('error', function(event) {
  // When a runtime error occurs in worker, its onerror event handler is called. It receives an event named error which implements the ErrorEvent interface. The event doesn't bubble and is cancelable; to prevent the default action from taking place, the 
});

myWorker.postMessage(""); // Start the worker. Data passed between the main page and workers are copied, not shared. Objects are serialized as they're handed to the worker, and subsequently, de-serialized on the other end.

// Workers may spawn more workers if they wish.  So-called subworkers must be hosted within the same origin as the parent page.  Also, the URIs for subworkers are resolved relative to the parent worker's location rather than that of the owning page.  Thi

// Terminating a worker.
myWorker.terminate();

// Helper code to create a worker.
function createWorker(listener) {
  function worker_code() {    
    postMessage(data); // Sends data to the main task. 
    addEventListener('message', function(e) { // Receiveds data from the main task.
      // Data available in e.data.
    }, false);
    importScripts(); // Worker threads have access to a global function, importScripts() , which lets them import scripts or libraries into their scope.  It accepts as parameters zero or more URIs to resources to import; all of the following examples are
    close(); // Terminates the worker.
  }
  
  var code = worker_code.toString();
  code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));
  var blob = new Blob([code], {type: "application/javascript"});
  var worker = new Worker(URL.createObjectURL(blob));
  if (listener) {
    worker.onmessage = function(e) {
      listener(e.data);
    }
  }
  return worker;
}
```

```js
let wt = () => {
    var s;
    this.addEventListener('message', e => {
        s = 'worker thread';
        s += e.data.toString();
        postMessage(s);
    });
};

const worker = new Worker(function () {
    var s;
    this.addEventListener('message', e => {
        s = 'worker thread';
        s += e.data.toString();
        postMessage(s);
    });
});

worker.postMessage('/contact/');
worker.addEventListener('message', e => {
    console.log('main thread:', e.data);
});
```

for each pathname
if pathname is not '/' and pathname is not in map, then...
create an iframe with src set to that pathname
append the iframe to the document
then assign the appended document to a new variable 
then new variable . contentDocument . queryselectorAll ('a');


let ifr = document.createElement('iframe');
ifr.src = '/';
document.body.appendChild(ifr);

m = new Map([...document.querySelectorAll('a[href*="austinsportsbehavioralhealth.com"],a:not([href="://"])')].flat(Infinity).map( x => x.pathname ).filter( p => p.includes('/')).sort((a,b)=>b-a).map( p => [ p, 0 ] ));

for ( k of nm.keys()) { if pathname is not '/' and pathname is not in map, then... 
    ifr.src = k;
    if document.readystate 
    queryselectorall for more links
    add those that are not in map
    }


let ifr = document.createElement('iframe');


function waitForDocumentReadyState(targetState) {
    return new Promise((resolve) => {
        const intervalId = setInterval(() => {
            if (document.readyState === targetState) {
                clearInterval(intervalId);
                resolve();
            }
        }, 100); // Check every 100 milliseconds
    });
}


// Usage
waitForDocumentReadyState('complete').then(() => {
    new Map([...document.querySelectorAll('a[href*="austinsportsbehavioralhealth.com"],a:not([href="://"])')].flat(Infinity).map( x => x.pathname ).filter( p => p.includes('/')).sort((a,b)=>b-a).map( p => [ p, 0 ] ))
});
```js
function waitForDocumentStateChange(doc, nextState) {
    return new Promise((resolve) => {
        const intervalId = setInterval(() => {
            if (doc.readyState === nextState) {
                clearInterval(intervalId);
                resolve();
            }
        }, 10); // Check every 10 milliseconds
    });
}

let arr = [];
for ( sk of s.keys() ) { ifr.src = sk; [...ifr.contentDocument.querySelectorAll('a')].forEach(e=> /* arr.push([sk, e.pathname]) */ s.add(e.pathname)  ) }

formerTitle
ifr.src = nextSrc
ifr.contentDocument.title
if formerTitle !== title then querySelectorAll


```
waitForStateChange(doc = ifr.contentDocument, 'complete').then(() => {
    new Map([...document.querySelectorAll('a[href*="austinsportsbehavioralhealth.com"],a:not([href="://"])')].flat(Infinity).map( x => x.pathname ).filter( p => p.includes('/')).sort((a,b)=>b-a).map( p => [ p, 0 ] ))
});

    if (iframe.contentWindow && iframe.contentWindow.document.readyState === 'complete') {
        // If the iframe content has loaded, reattach the event listener
        iframe.removeEventListener('load', checkIframeContent); // Remove the listener to avoid multiple calls
        addLoadListener(); // Reattach the event listener
    } else {
        // If content is not loaded yet, continue checking recursively
        setTimeout(checkIframeContent, 100); // Check every 100 milliseconds
    }
}
function checkIframeContent() {
    if (iframe.contentWindow && iframe.contentWindow.document.readyState === 'complete') {
        // If the iframe content has loaded, reattach the event listener
        iframe.removeEventListener('load', checkIframeContent); // Remove the listener to avoid multiple calls
        addLoadListener(); // Reattach the event listener
    } else {
        // If content is not loaded yet, continue checking recursively
        setTimeout(checkIframeContent, 100); // Check every 100 milliseconds
    }
}
let s;
s = new Set([...document.querySelectorAll('a[href*="austinsportsbehavioralhealth.com"],a:not([href="://"])')].flat(Infinity).map( x => x.pathname ).filter( p => p.includes('/') && p !== '/' ).sort());

s = new Set([...ifr.contentDocument.querySelectorAll('a[href*="austinsportsbehavioralhealth.com"],a:not([href="://"])')].flat(Infinity).map( x => x.pathname ).filter( p => p.includes('/') && p !== '/' ).sort());




<!-- import {openDB} from 'idb'; -->

async function updateItemsInStore () {
  const db = await indexedDB.open('test-db4', 1);
  
  // Create a transaction on the 'foods' store in read/write mode:
  const tx = db.transaction('foods', 'readwrite');

  // Update multiple items in the 'foods' store in a single transaction:
  await Promise.all([
    tx.store.put({
      name: 'Sandwich',
      price: 5.99,
      description: 'A MORE tasty sandwich!',
      updated: new Date().getTime() // This creates a new field
    }),
    tx.store.put({
      name: 'Eggs',
      price: 3.99,
      description: 'Some even NICER eggs you can cook up!',
      updated: new Date().getTime() // This creates a new field
    }),
    tx.done
  ]);
}

updateItemsInStore();




<!-- const DBOpenRequest = window.indexedDB.open('links'); -->
```js
const DBOpenRequest = indexedDB.open('links');
// these two event handlers act on the database being opened
// successfully, or not
DBOpenRequest.onerror = (err) => {
  console.error(err);
};

DBOpenRequest.onsuccess = (event) => {
  console.log('database opened',event);

  // store the result of opening the database in the db
  // variable. This is used a lot later on, for opening
  // transactions and suchlike.
  db = DBOpenRequest.result;
};

 DBOpenRequest.onupgradeneeded = (event) => {
    db = event.target.result;

    db.onerror = (event) => {
        console.error(event);
    };

    // Create an objectStore for this database
    const objectStore = db.createObjectStore('links', { keyPath: 'link' });

    // Define what data items the objectStore will contain
    objectStore.createIndex('visited', 'visited', { unique: false });

    console.log('Object store created.');
  };

{ ...sessionStorage }


[...document.querySelectorAll('a[href*="austinsportsbehavioralhealth.com"],a:not([href="://"])')].flat(Infinity).map( x => x.pathname ).filter( p => p.includes('/') && p !== location.pathname ).sort().forEach(e=>m.set([e,0]))


```
### Draft of Main Program
```js
/**
 *
 **/
// TODO: normalize 'hn' by 
/*
let loc = document.location.host.toLowerCase().split('.');
let hn = loc[loc.length-2] + '.' + loc[loc.length-1];
let nl = document.querySelectorAll('[href],[src]');
let ifr = document.body.appendChild(document.createElement('iframe'));
let origin = (document.location.href).toLowerCase();
*/
// let s = new Set([...document.querySelectorAll('a[href*="austinsportsbehavioralhealth.com"],a:not([href="://"])')].flat(Infinity).map( x => x.pathname ).filter( p => p.includes('/') && p !== '/' ).sort());

// create map and mark landing page as visited
// let m = new Map([[ document.location.pathname, 1]]);
// let m = new Map([[ document.location.href, 1]]);
let m = new Map([[ origin, 1 ]]);



function docStateChange(doc, targetPage, nextState) {
    // return new Promise((resolve) => {
        const intervalId = setInterval(() => {
            if (doc.readyState === nextState && doc.location.href.toLowerCase() === targetPage) {
                clearInterval(intervalId);
                console.log('Promise resolved, next state', nextState, 'doc ready state:', doc.readyState, ' at ', doc.location.href);
                // resolve(doc.location.href);
                return doc.location.href;
            }
        }, 1000); // Check every 10 milliseconds
    // });
                return doc.location.href;

}

async function navigateNext(targetPage){
    // if ( targetPage === ifr.src ) return;
    let currentPage = ifr.src;
    ifr.src = targetPage;
    while ( ifr.src !== await docStateChange(ifr.contentDocument, targetPage, 'complete')) {
        console.log('Current State:', 'ifr.src', ifr.src, 'targetPage', targetPage, 'Ready state:', ifr.contentDocument.readyState);
        continue;
    };
    return ifr;
}

const loc = document.location.host.toLowerCase().split('.');
const tld = loc[loc.length-1];
const hn = loc[loc.length-2] + '.' + loc[loc.length-1];
// const origin = (document.location.href).endsWith('/') ? (document.location.href).toLowerCase() : (document.location.href).toLowerCase() + '/';
const origin = document.location.origin.toLowerCase();
const hr = document.location.href;
const pn = document.location.pathname;

const nl = document.querySelectorAll('[href],[src]');
const ifr = document.body.appendChild(document.createElement('iframe'));
const m = new Map([[ origin, 1 ]]);
/*
const lch = if ( url.includes( '://' ) ) return url.endsWith('/') ? url.toLowerCase() : ( origin + ( url.startsWith('/') ? url.replace('/','') : url ).toLowerCase()) };
*/
// const lch = url => { let u; try { u = new URL(url) } catch (e) { console.error('Sorry, did not work', e)} return  };
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

/**
 * 
    input.includes('://') 
    ?
    input.endsWidth('/')
        ?

 * **/

// function crawlPage(ifr){
function crawlPage(){

    // let href = ifr.contentWindow.location.href.toLowerCase();
    let currentPage = normalizeUrl(ifr.contentWindow.location).href;
/*
    (document.location.href).endsWith('/') ? (document.location.href).toLowerCase() : (document.location.href).toLowerCase() + '/';
*/
/*
    [...ifr.contentDocument?.querySelectorAll(`a[href*='${hn}' i],a:not([href*='://'],[href*='tel:' i],[href*='mailto:' i])`)].flat(Infinity).map( x => x.href.toLowerCase().includes('://') ? x.href.toLowerCase() : (origin + x.href).toLowerCase().replaceA
*/
    [...ifr.contentDocument?.querySelectorAll(`a[href*='${hn}' i],a:not([href*='://'],[href*='tel:' i],[href*='mailto:' i])`)].flat(Infinity).map( x => { if ( x.href ) return normalizeUrl(x.href).href } ).filter( p => p && p.includes('/') && p !== curren
    m.set(currentPage, 1);
}

/*
function crawlNextPage(targetPage, cb){
    if ( targetPage === ifr.src ) return;
    let currentPage = ifr.src;
    ifr.src = targetPage;

    ifr.onload = () => cb(null, crawlPage);
    ifr.onerror = () => cb(new Error(`Error encountered attempting to load: ${targetPage}`));
}
*/
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
// start iterating through hrefs to recurse process for each page
// for ( [ k, v ] of m.entries()) { if( !v && k !== location.href.toLowerCase() ) if (k) crawlPage(navigateNext(k)) }
mapFirstPage();

for ( [ k, v ] of m.entries()) {
    console.log(`k: ${k}, v: ${v}, loc.href: ${location.href.toLowerCase()}, ifr.contentWindow.location.href: ${ifr.contentWindow.location.href.toLowerCase()}`);
    
    if ( !v && k && k !== hr && !k.includes('#') ) {
        console.log(`Attempting to crawl... k: ${k}, v: ${v}, loc.href: ${location.href.toLowerCase()}, ifr.contentWindow.location.href: ${ifr.contentWindow.location.href.toLowerCase()}`);
        crawlNextPage(k);
    }
    console.log('finished crawling',k);
}

```

```js



funciton queryPage(page, map){
    if page.location = page the mark page as visited in map
    add to map all hrefs on page except current page
    ifr.contentWindow.location.pathname

    [...document.querySelectorAll('a[href*="austinsportsbehavioralhealth.com"],a:not([href="://"])')].flat(Infinity).map( x => x.pathname ).filter( p => p.includes('/') && p !== location.pathname  && !p.includes('#') ).sort().forEach(e=>m.set(e,0));
}



let m = new Map([...document.querySelectorAll('a[href*="austinsportsbehavioralhealth.com"],a:not([href="://"])')].flat(Infinity).map( x => x.pathname ).filter( p => p.includes('/') && p !== location.pathname ).sort());

ifr.src='/';
document.body.appendChild(ifr);
s = new Set([...ifr.contentDocument.querySelectorAll('a[href*="austinsportsbehavioralhealth.com"],a:not([href="://"])')].flat(Infinity).map( x => x.pathname ).filter( p => p.includes('/') && p !== '/' ).sort());
```
