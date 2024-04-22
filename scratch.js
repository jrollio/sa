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


// child / callee / worker.js
onmessage = async function(e) { let result = await this.fetch(e.data); postMessage(result); }

// parent / main caller
if (window.Worker) {
  const scriptWorker = new Worker("worker.js");

  ['https://www.austinfitmagazine.com/January-2024/injured-but-not-broken/', 'https://people.com/tennis-champion-nick-kyrgios-self-harm-suicidal-thoughts-8414307'].forEach(i => { i.onchange = function(i) { scriptWorker.postMessage(i);      console.log(i,'Message posted to worker');   }  })

  scriptWorker.onmessage = function(e) { result.textContent = e.data; console.log('Message received from worker',e);  }




  ifrs.contentWindow.eval(fetch('https://people.com/tennis-champion-nick-kyrgios-self-harm-suicidal-thoughts-8414307', { method: OPTIONS }).then(r=>r));

  result = await fetch('https://people.com/tennis-champion-nick-kyrgios-self-harm-suicidal-thoughts-8414307').then(r=>r).then(r=>console.log(r, r.headers, r.statusText, r.status));

  