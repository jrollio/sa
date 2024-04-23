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


  // nodejs:
  result = await fetch('https://people.com/tennis-champion-nick-kyrgios-self-harm-suicidal-thoughts-8414307').then(r=>r).then(r=>console.log(r, r.headers, r.statusText, r.status));

at = document.querySelectorAll('a');
  at.forEach(e=>console.log(e.closest('*:lang(EN)').textContent,e.textContent))

// HTMLAnchorElement.prototype:
  Index	Value
ATTRIBUTE_NODE	2
CDATA_SECTION_NODE	4
COMMENT_NODE	8
DOCUMENT_FRAGMENT_NODE	11
DOCUMENT_NODE	9
DOCUMENT_POSITION_CONTAINED_BY	16
DOCUMENT_POSITION_CONTAINS	8
DOCUMENT_POSITION_DISCONNECTED	1
DOCUMENT_POSITION_FOLLOWING	4
DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC	32
DOCUMENT_POSITION_PRECEDING	2
DOCUMENT_TYPE_NODE	10
ELEMENT_NODE	1
ENTITY_NODE	6
ENTITY_REFERENCE_NODE	5
NOTATION_NODE	12
PROCESSING_INSTRUCTION_NODE	7
Symbol(Symbol.toStringTag)	"HTMLAnchorElement"
TEXT_NODE	3
addEventListener	function
after	function
animate	function
append	function
appendChild	function
attachInternals	function
attachShadow	function
before	function
blur	function
checkVisibility	function
click	function
cloneNode	function
closest	function
compareDocumentPosition	function
computedStyleMap	function
contains	function
dispatchEvent	function
focus	function
getAnimations	function
getAttribute	function
getAttributeNS	function
getAttributeNames	function
getAttributeNode	function
getAttributeNodeNS	function
getBoundingClientRect	function
getClientRects	function
getElementsByClassName	function
getElementsByTagName	function
getElementsByTagNameNS	function
getRootNode	function
hasAttribute	function
hasAttributeNS	function
hasAttributes	function
hasChildNodes	function
hasPointerCapture	function
hidePopover	function
insertAdjacentElement	function
insertAdjacentHTML	function
insertAdjacentText	function
insertBefore	function
isDefaultNamespace	function
isEqualNode	function
isSameNode	function
lookupNamespaceURI	function
lookupPrefix	function
matches	function
normalize	function
onmouseenter	undefined
onmouseleave	undefined
prepend	function
querySelector	function
querySelectorAll	function
releasePointerCapture	function
remove	function
removeAttribute	function
removeAttributeNS	function
removeAttributeNode	function
removeChild	function
removeEventListener	function
replaceChild	function
replaceChildren	function
replaceWith	function
requestFullscreen	function
requestPointerLock	function
scroll	function
scrollBy	function
scrollIntoView	function
scrollIntoViewIfNeeded	function
scrollTo	function
setAttribute	function
setAttributeNS	function
setAttributeNode	function
setAttributeNodeNS	function
setHTMLUnsafe	function
setPointerCapture	function
showPopover	function
toString	function
toggleAttribute	function
togglePopover	function
webkitMatchesSelector	function
webkitRequestFullScreen	function
webkitRequestFullscreen	function