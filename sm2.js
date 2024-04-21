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


mapFirstPage();
/*
for ( [ k, v ] of m.entries()) {
    console.log(`k: ${k}, v: ${v}, loc.href: ${location.href.toLowerCase()}, ifr.contentWindow.location.href: ${ifr.contentWindow.location.href.toLowerCase()}`);
    
    if ( !v && k && k !== hr && !k.includes('#') ) {
        console.log(`Attempting to crawl... k: ${k}, v: ${v}, loc.href: ${location.href.toLowerCase()}, ifr.contentWindow.location.href: ${ifr.contentWindow.location.href.toLowerCase()}`);
        crawlNextPage(k);
    }
    console.log('finished crawling',k);
}
*/
for ( [ k, v ] of [ ...m.entries() ].filter( ([ k, v ]) => k && !v && k !== hr && !k.includes('#') ) ) crawlNextPage(k);

/* OR as forEach */
[...m].forEach( ( [ k, v ], i ) => console.log(`i: ${i}, k: ${k}, v: ${v}`));
/*
[Log] i: 0, k: https://austinsportsbehavioralhealth.com, v: 1
[Log] i: 1, k: https://austinsportsbehavioralhealth.com/consulting-services/, v: 0
[Log] i: 2, k: https://austinsportsbehavioralhealth.com/contact/, v: 0
[Log] i: 3, k: https://austinsportsbehavioralhealth.com/counseling-services/, v: 0
[Log] i: 4, k: https://austinsportsbehavioralhealth.com/our-team/, v: 0
[Log] i: 5, k: https://austinsportsbehavioralhealth.com/resources/, v: 0
*/
// Examples Section

/**
 * Callback-based approach: Version 1
 */
                /* srcarg *//* cbfarg */
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
                       /* cbf *//* cbearg *//* cbsarg */
    script.onload = () => callback(null, script);

                           /* cbf *//* cbearg */
    script.onerror = () => callback(new Error(`Script load error for ${src}`));
  
    document.head.append(script);
  }

            /* scriptarg *//* callbackarg-inlinefunction */
  loadScript('/my/script.js', function() {
    // the callback runs after the script is loaded
    newFunction(); // so now it works
    ...
  });


/**
 * Callback-based approach: Version 2
 */
  function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);
    document.head.append(script);
  }
  
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
    alert(`Cool, the script ${script.src} is loaded`);
    alert( _ ); // _ is a function declared in the loaded script
  });

  for page in list 
    loadPage(page, crawlPage)

/**
 * Callback-based approach: Version 3
 */
                    /* src *//* cbf */
  function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
  
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));
  
    document.head.append(script);
  }
                /* src */        /* cbf */   /* cbs */
  loadScript('/my/script.js', function(error, script) {
    if (error) {
      // handle error
    } else {
      // script loaded successfully
    }
  });


 /**
 * Callback-based approach: Version 4
 */
  function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
  
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));
  
    document.head.append(script);
  }
  loadScript('path/script.js', (err, script) => {...})


/**
 * Promise-based approach v1
 */
function loadScript(src) {
    return new Promise(function(resolve, reject) {
      let script = document.createElement('script');
      script.src = src;
  
      script.onload = () => resolve(script); // resolve(ifr)
      script.onerror = () => reject(new Error(`Script load error for ${src}`));
  
      document.head.append(script); 
    });
  }

let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"); // loadPage(page);

promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
); // promise.then( p => crawlPage(p) )

promise.then(script => alert('Another handler...'));
 // promise.then( mapOrArrayOfLinks => updateMap(mapOrArrayOfLinks) )




/**
 * Promise-based approach v2
 */
let loadScriptPromise = function(src) {
    return new Promise((resolve, reject) => {
      loadScript(src, (err, script) => {
        if (err) reject(err);
        else resolve(script);
      });
    });
  };

  // usage:
loadScriptPromise('path/script.js').then(...)



// Promise-factory type approach
let promiseFactory = [fn1, fn2, fn3]; // These dudes return a Promise
promiseFactory.reduce((prevPromise, nextFn) => prevPromise.then(nextFn), Promise.resolve()).then(result => console.log(`Executed in sequence. Feel like James Bond yet?`));

async function marchOneByOne(index, tasks) {
  if (index >= tasks.length) {
    return Promise.resolve(); // Hey, where did everyone go?
  }
  return tasks[index]().then(() => marchOneByOne(index + 1, tasks)); // Cool. Now, let's get the next one going.
}

// Let's begin the march!
marchOneByOne(0, promiseFactory)
  .then(() => console.log("Finished marching. Time for ice cream!"));

/* Example of "Promise Factory" with LoadPage */
let promiseFactory = [fn1, fn2, fn3]; // These dudes return a Promise


