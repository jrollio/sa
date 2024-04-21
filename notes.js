let ifrA = ifr.cloneNode();
let ifrB = ifr.cloneNode();
ifr.replaceWith(ifrA);
let fr;
for ( [ k, v ] of [ ...m.entries() ].filter( ([ k, v ]) => k && !v && k !== hr && !k.includes('#') ) ) (k => { ifr.src = k; ifr.replaceWith(ifr); ifr.onload = () => console.log(ifr.contentDocument.querySelectorAll('a')); })(k);

ifr[i].src = k;
ifri[i-1].replaceWith(ifr[i]);


for ( [ k, v ] of [ ...m.entries() ].filter( ([ k, v ]) => k && !v && k !== hr && !k.includes('#') ) ) (k => { ifrB.src = k; ifrB.replaceWith(ifrB); ifrB.onload = () => console.log(ifrB.contentDocument.querySelectorAll('a')); })(k);

for ( [ k, v ] of [ ...m.entries() ].filter( ([ k, v ]) => k && !v && k !== hr && !k.includes('#') ) ) (k => { ifrB.src = k; ifrB.replaceWith(ifrB); ifrB.onload = () => ifrB.contentDocument.querySelectorAll('a'); })(k);

m.forEach((v,k)=>console.log(k,v));

(async () => { m.forEach((v,k) => ({ ifrB.src = k; resArr.push(await ifrB.replaceWith(ifrB)); }) )})();



// Callback-based loadPage, manual singular input, 
// ------------------------------------------ //
function loadPage(url, cb) {
    ifr.src = url;
    ifr.replaceWith(ifr);
    ifr.onload = () => cb(ifr);
}

loadPage('https://austinsportsbehavioralhealth.com/counseling-services/', ifrm => { alert(ifrm.contentDocument.querySelectorAll('a').length)});
// ------------------------------------------ //



// Promise-based loadPage, manual singular input, 
// ------------------------------------------ //

function loadPage(url) {
    return new Promise(function(resolve, reject) {
        ifr.src = url;
        ifr.replaceWith(ifr);
        ifr.onload = () => resolve(ifr);
    });
  }


let p = loadPage('https://austinsportsbehavioralhealth.com/counseling-services/');

p.then(r=>alert(r.contentDocument.querySelectorAll('a').length));
// ------------------------------------------ //

// Promise-based loadPage, manual singular input, simplified 
// ------------------------------------------ //

function loadPage(url) {
    return new Promise(function(resolve, reject) {
        ifr.src = url;
        ifr.replaceWith(ifr);
        ifr.onload = () => resolve(ifr);
    });
  }


loadPage('https://austinsportsbehavioralhealth.com/counseling-services/')
    .then(r=>alert(r.contentDocument.querySelectorAll('a').length));
// ------------------------------------------ //

