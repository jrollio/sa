function loadPage(url) {
    return new Promise(function(resolve, reject) {
        ifr.src = url;
        // ifr.onload = () => resolve(ifr.contentWindow.location);
        // ifr.onload = () => resolve(ifr.contentDocument.querySelectorAll('a').length);
        ifr.onload = () => {
            // len = bldArr(ifr);
            // [...ifr.contentDocument.querySelectorAll('a')].map(e=>e.href);

            nlArr.push(...[...ifr.contentDocument.querySelectorAll('a')].map(a=>a.href));

            resolve(nlArr.length);
        }
    });
  }

  const nlArr = [];
  function bldArr(ifr){
    [...ifr.contentDocument.querySelectorAll('a')].forEach(v=>nlArr.push(nl.href));
    return nl.length;
  }
  
loadPage('https://austinsportsbehavioralhealth.com/counseling-services/')
.then(r=>alert(r.contentDocument.querySelectorAll('a').length));


let ids = [...m].map( ([ k, v ],i) => k);
const loadPageForUrl = async id => { loadPage(id) };


const pArr = [];
(async (ids) => { for (const id of ids) pArr.push( await loadPage(id) ); })(ids);
// or...
const pArr = [];
(async () => { for (const id of ids) pArr.push( await loadPage(id) ); })();



