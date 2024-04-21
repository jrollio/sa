APR 2, 2024
# Is Node.js native Promise.all processing in parallel or sequentially?
Indeed, **`Promise.all`** in Node.js launches tasks **concurrently**—not sequentially. It activates all promises concurrently, wrapping up when all of them are **fulfilled** or a single one is **rejected**. That's your **lightning answer**.

Now, let's imagine a database-query scenario:

```javascript
let promiseArray = [User.findById(1), User.findById(2), User.findById(3)]; 
Promise.all(promiseArray).then(users => console.log(`Users downloaded faster than you can say 'Sweater Weather'!`));
```

In this example, each `findById` kicks off **without patiently waiting** for its pals, hence performing the database searches in unison. The `console.log`, however, takes a nap until all users are located.

## For Loop — traditional but still hip
Need to execute promises sequentially? Don't fret! Either deploy the Array.reduce() method or bring async/await into the equation contained within a loop. Here's reduce() in its full glory:
```js
let promiseFactory = [fn1, fn2, fn3]; // These dudes return a Promise
promiseFactory.reduce((prevPromise, nextFn) => prevPromise.then(nextFn), Promise.resolve()).then(result => console.log(`Executed in sequence. Feel like James Bond yet?`));
```
Got that? Perfect! Each promise cordially waits its turn and only gets initiated after the one before has wrapped up. Now, let's leap into the exciting world of async/await:

```js
async function keepInLine(tasks) {
  for (const task of tasks) {
    await task(); // Politely making sure each task finishes its job before the next one comes into the picture.
  }
}
```

The use of await within this loop guarantees a structured, orderly execution of tasks in a wonderfully asynchronous fashion.

## Know thy Promise
### Promises — born ready
Respect a new Promise! It doesn't dilly-dally. As soon as it steps into the world, it gets its executor function rolling. So, remember, by the moment you pass your promises to Promise.all, the tasks are already in full swing.

### Promise.allSettled — the patient friend
Ever had one of those situations where you need to nail all results but don't want a single botched attempt to abort the entire mission? Say hello Promise.allSettled. This smooth opera sits tight, waiting for all promises to settle down (either fulfilled or rejected).

### Concurrent vs. parallel processing
Here's the tea: despite its massive talent, Node.js can't boast of actual parallelism due to being single-threaded. However, it makes a brilliant show of handling "concurrent" tasks seamlessly, all thanks to the dynamic event loop that cleverly utilizes non-blocking I/O operations.

## Diving deeper
### Sequential processing with shared resources
In those instances when you need to share resources across your operations, a good old for loop synergizing with async/await could be your best companion:
```js
let sharedResources = {};

async function danceInSequence(tasks, resources) {
  for (const task of tasks) {
    Object.assign(resources, await task(resources)); // Sharing is caring!
  }
}
```

Using this code, each task gets a share of the resources and is even allowed to alter it before the next task steps in.

### The art of promise chaining
Are you chaining with .then? Cool. Now remember to return a new Promise:

```js
promise.then(result => {
  return new Promise((resolve, reject) => {
    // Some magical async operation happens here!
  });
});
```

Forgetting to return a promise could cause a commotion, disturbing the promise chain and resulting in a rather unruly error or unexpected behavior.

## Extra finesse
### Using recursion for sequential execution
Got a dynamic list of promises? Recursion can be a compact solution to make them march in sequence:

```js
async function marchOneByOne(index, tasks) {
  if (index >= tasks.length) {
    return Promise.resolve(); // Hey, where did everyone go?
  }
  return tasks[index]().then(() => marchOneByOne(index + 1, tasks)); // Cool. Now, let's get the next one going.
}

// Let's begin the march!
marchOneByOne(0, promiseFactories)
  .then(() => console.log("Finished marching. Time for ice cream!"));
```

### Simulating async operations
setTimeout can act as a wonderful asynchronous operation stand-in for simulation purposes:

```js
function pretendPromise(result, delay) {
  return new Promise(resolve => setTimeout(() => resolve(result), delay))
  .then(() => console.log("This promise got fulfilled faster than a catfish on a hot tin roof!"));
}
```
Now, you can test your promise logic without reliance on actual I/O tasks. How cool is that?

### A stitch in time: error handling
It's crucial to incorporate error handling for your noble promise chains to prevent them from catching unhandled rejections:

```js
Promise.all(promises)
  .then(results => console.log(results))
  .catch(error => console.error("Houston, we have a problem!", error));
```
This intelligent measure can ensure your concurrent processing remains robust, even when the going gets tough.

# Any difference between await Promise.all() and multiple await?
**`await Promise.all()`** processes promises **in parallel**, thus effective for independent tasks. **Multiple awaits** handle tasks **sequentially**, which can introduce delays.

```javascript
// Parallel execution: Like running a 100m sprint, fast and furious.
const [result1, result2] = await Promise.all([asyncTask1(), asyncTask2()]);

// Sequential execution: More like a relay race, one runner at a time.
const result1 = await asyncTask1();
const result2 = await asyncTask2();
```


## Detailed rundown
In today's JavaScript asynchronous landscape, knowing when to use Promise.all() and multiple await could make a difference in your app’s performance and readability.

## Execution dynamics
Promise.all() triggers all given promises to execute simultaneously. You only await once for all to return. This resembles a multi-threading scenario, which leads to accelerated execution since tasks run concurrently.
Conversely, sequential await operates in a single-threaded fashion. It completes one task before initiating the next one. This can be necessary when the subsequent task depends on the preceding one's result. However, it might introduce unnecessary latency for independent tasks.

## Error handling mechanism
Error handling is pivotal when working with promises. Promise.all() employs the "fail-fast" principle. It instantly returns an error if any provided Promise fails:

```js
try {
  const results = await Promise.all([asyncTask1(), asyncTask2()]);
} catch (error) {
  // One fails, all fail. "All for one, one for all!" - The Three Musketeers
}
```
For sequential await, you have granular control over error handling. However, unmanaged waiting times might lead to cascading delays if each await is in a try-catch block.

## Performance factors
Promise.all() could significantly reduce wait times for multiple I/O-bound operations, such as API calls or multiple database queries, thereby improving user experience and system throughput.
Keep in mind that JavaScript is single-threaded, and so for CPU-bound operations, Promise.all() will not achieve true parallel computation, though it still offers efficiency by overlapping I/O-bound tasks.

## Real-world context
### Sequential awaits are ideal when:
1. Data dependency: A task relies on results from another.
2. Error granularity: Errors must be handled differently for each task.
3. Progress tracking: Progress of individual tasks needs to be reported.

### Promise.all() is preferred when:
1.  Performance is a concern: Numerous non-dependent operations need to be completed quickly.
2.  Error handling: A single try-catch suffices to handle all potential exceptions.
3.  Resource fetching: Fetching multiple resources simultaneously from a network.

## Code-level comparison
In programming, time and resources are precious commodities. That's where Promise.all() shines by executing tasks faster than multiple await statements. Here's a demonstration:
```js
// Sequential Operation - Like waiting for Domino pieces to fall one by one.
const sequentialStart = performance.now();
const result1 = await asyncTask1();
const result2 = await asyncTask2();
const sequentialDuration = performance.now() - sequentialStart;
// "Finally, the last Domino falls!" - Some Ingenious Puzzler

// Parallel Execution Using Promise.all() - Like knocking down all Domino pieces at once.
const concurrentStart = performance.now();
const results = await Promise.all([asyncTask1(), asyncTask2()]);
const concurrentDuration = performance.now() - concurrentStart;
// "Down they all go!" - Intrigued Onlooker
```


A word of caution: Always test these patterns within the context of your specific use case since performance results will vary based on the nature of the tasks.

## Integrating Promise.all()
Leveraging Promise.all() lets you efficiently handle multiple asynchronous tasks concurrently, thereby reducing the blunt impact of sequential promise resolution and augmenting app responsiveness. This optimizes the event loop efficiency, an integral component of Node.js and browsers.

## Embrace best practices
Employing Promise.all() appropriately aligns with the asynchronous programming best practices in JavaScript by offering a non-blocking operation for handling multiple tasks effectively.

# Use async await with Array.map
```javascript
// Always-on-time function to handle multiple async requests
async function asyncMap(array, asyncFn) {
  return Promise.all(array.map(item => asyncFn(item)));
}

// Example (Quick maths) 🧮:
const results = await asyncMap([1, 2, 3], async num => {
  return num * 2; // Our async operation just doubles the numbers
});
console.log(results); // Logs [2, 4, 6] to the console
```
By using `Array.map`, you dispatch the **async operations** concurrently. You then **await** completion of all calls with **`Promise.all`**. The `asyncMap` function is a sweet bit of sugar. Our example just **multiplies numbers** for demonstration purposes.


## Understanding Promise Combinators: The Fantastic Four
When juggling with multiple promises (not recommended IRL), familiarise yourself with following Promise combinators:
1.  Promise.all: Waits until all its promises are kept—no exceptions.
2.  Promise.allSettled: Puts all its promise-debts on a payment plan, no matter how those plans end.
3.  Promise.any: Celebrates the successful resolution of a single promise. Quite optimistic!
4.  Promise.race: Here, every promise for itself. First to resolve (or reject) wins the race.

In most scenarios, Promise.all will be your go-to. But Promise.allSettled can be your best pal if you need to know the fate of all operations, success or fail.

## Error handling: Anticipating Promise broken (sad face)
When performing asynchronous mapping, you must contain any chaos. This is where error handling comes in:

```js
async function safeAsyncMap(array, asyncFn) {
  try {
    return await Promise.all(array.map(item => asyncFn(item)));
  } catch (error) {
    console.error("A wild error appeared:", error);
    // Gotta catch 'em all (errors)
  }
}
```
Wrapping the await Promise.all within a try/catch block lets you catch errors and handle them with grace and dignity, ensuring your app doesn't go caput.

## Enhancing Readability: Bullet Speed.
Arrow functions within Array.map can make your async mappings look as clean as your room (presumably):
```js
const asyncOperation = async item => {
  /* Secret async sauce, mmm. */
};

const results = await Promise.all(items.map(asyncOperation));
```
Pairing arrow functions & async/await can significantly reduce boilerplate and turbocharge the clarity of your code.

## TypeScript: The Butcher's scale of Javascript
With TypeScript, you're assured of type safety while using Array.map. This increases the likelihood that your code behaves as expected, avoiding sudden heating of your machine.

### Testing Corners in Async Iterations
For testing async/await mappings, simulate async operations. The randomDelay function is great for network latency simulation or file I/O tests:

```js
function randomDelay(val) {
  return new Promise(resolve => setTimeout(() => {
    console.log(`Waited long? Enjoy your ${val}.`);
    resolve(val);
    }, Math.random() * 1000));
}

let testResults = await Promise.all(arr.map(async n => await randomDelay(n)));
```

Testing with induced delays helps ensure your code's behavior under asynchronous conditions.

# Keeping Result Order: First In, First Out

When using Array.map and await on an array of promises, the resolution order is the same as the triggering order:

```js
const ids = [1, 2, 3]; // The order of the fellowship
const fetchDataForId = async id => { /* Fetch data using the Ring's power */ };

const dataInOrder = await Promise.all(ids.map(fetchDataForId));
```
Regardless of promise resolution times, dataInOrder maintains the order of ids, preventing any "unexpected" occurrences.

# Wait until all promises complete even if some rejected
When dealing with **multiple promises** in JavaScript and you need to wait for all of them to complete, irrespective of whether they passed or failed, we use **`Promise.allSettled()`**. This function bundles all your promises into a single one that resolves with an array showing the outcome of each promise.

```javascript
// An array of our promises simulating calls to a couple of APIs
const promises = [fetch('/api/one'), fetch('/api/two')];

Promise.allSettled(promises).then((results) =>
  results.forEach(({status, value, reason}) =>
    console.log(status, value || reason))); // Log 'em all!
```

The response for each outcome includes the `status` ('fulfilled' or 'rejected'), the `value` (if fulfilled), or `reason` (if rejected).

## Diving deep with Promise.allSettled()
In this section, we extend beyond just using Promise.allSettled, dive deeper into handling the outcomes, and cater to environments where it might not be available yet.

### Postprocessing the results of allSettled
Arguably, after you've received the results from Promise.allSettled(), you will want to separate the successful operations from the faltered. You can achieve this by filtering the outcomes based on the status property.

```js
// That's how you separate the adults from the kids.
Promise.allSettled(promises).then((results) => {
  const successfulPromises = results.filter(result => result.status === 'fulfilled');
  const failedPromises = results.filter(result => result.status === 'rejected');
  // Now, you can separately handle successful and failed promises.
});
```

### Fulfilling promises in ES5
Promise.allSettled may not exist in environments that don't support ES2020 or later. However, you can circumvent this by using a polyfill or create a custom settle method to mimic Promise.allSettled behavior.

```js
// Who needs external promise libraries when you can do this in vanilla JavaScript?! 🍦
if (!Promise.allSettled) {
  Promise.allSettled = promises =>
    Promise.all(
      promises.map(promise =>
        promise.then(value => ({ status: 'fulfilled', value }))
               .catch(reason => ({ status: 'rejected', reason }))));
}
```

With this polyfill, older environments can also use Promise.allSettled to ensure all promises are awaited.

#### Nailing error handling
Another pattern beyond Promise.allSettled is to catch errors for each promise individually using a reflect function. This way, you ensure no promise is left unattended and each can resolve or reject gracefully to aggregate the results.

```js
// Caught you, error! Trying to sneak through, eh?
function reflect(promise) {
  return promise.then(
    value => ({ status: 'fulfilled', value }),
    reason => ({ status: 'rejected', reason })
  );
}

// Wrangle all those promises together
Promise.all(promises.map(reflect)).then(results => {
  // All errors are belong to us
});
```

## Beyond waiting - handling outcomes
Just waiting for all promises to settle won't cut it. We need to adequately manage the outcomes for each promise. So, let's dig a bit deeper and learn how we can harness the detailed information provided by Promise.allSettled.

### Enforcing a uniform promise interface
By insisting that each promise conforms to a consistent interface (i.e., an object with a status and either value or reason), we can conveniently abstract the error handling and process the results predictably.

```js
// Here, we make all promises promise to behave the same way.
adjustPromises(promises) {
  return promises.map(promise => reflect(promise));
}

// All promises are equal, but some promises are more equal than others.
const adjustedPromises = adjustPromises([fetch(url1), fetch(url2)]);
Promise.allSettled(adjustedPromises).then(results => { /* Process results */ });
```


### Keeping out external libraries
The promise management features in modern JavaScript environments have considerably reduced the reliance on external promise libraries. Since Promise.allSettled is natively available, it often negates the need for additional dependencies for promise management in your projects.

### Simple over complex error handling
Sometimes, simpler is better, aligning nicely with the KISS (Keep It Simple, Stupid) principle. Instead of developing complex error handlers, defaulting to a base case for errors can often suffice. In essence, if something ain't broke, don't complicate it.


```js
// The code might fail, but our humor won't.
Promise.allSettled(promises).then(results => {
  results.forEach(result => {
    const data = result.status === 'fulfilled' ? result.value : undefined; // Undefined is our new black.
    // Do magic with data, but remember, error cases are treated as undefined.
  });
});
```

### Handling network failures elegantly
When dealing with network requests being graceful in failure management is vital. Possible scenarios you need to factor in may include slow network connections, request timeouts, and server issues - all unpredictable and fun parts of any developer's life.
```js
// No more waiting for snail-paced APIs
function fetchWithTimeout(url, timeout = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('timeout')), timeout); // Remember, patience is a virtue.
    fetch(url).then(resolve, reject);
  });
}

// Let's tackle all these promises together, shall we?
Promise.allSettled(promises.map(fetchWithTimeout)).then(handleAllPromises);
```

# Call async/await functions in parallel
To execute **async/await** functions in parallel, we make use of `Promise.all`. It handles an array of promises and resolves when all of them are resolved. Here's how you do it:

```javascript
async function fetchData() { /* ... */ }
async function fetchMoreData() { /* ... */ }

const [data, moreData] = await Promise.all([fetchData(), fetchMoreData()]);
```
Upon completing their execution concurrently, the variables `data` and `moreData` will hold the results of the functions


## Handling errors and understanding alternatives
Error handling is made more flexible with individual try...catch blocks than with Promise.all, which rejects immediately if any promise rejects. To get a detailed description of failures, you may want to use Promise.allSettled. Be aware though, this is a relatively new method and won't work with Internet Explorer. Here's an alternative using try...catch:
```js
async function processInParallel() {
  try {
    const [data, moreData] = await Promise.all([fetchData(), fetchMoreData()]);
    // Have your way with the results
  } catch (error) {
    // Handle any of those pesky rejections
  }
}
```

## Handling errors and understanding alternatives
Error handling is made more flexible with individual try...catch blocks than with Promise.all, which rejects immediately if any promise rejects. To get a detailed description of failures, you may want to use Promise.allSettled. Be aware though, this is a relatively new method and won't work with Internet Explorer. Here's an alternative using try...catch:

```js
async function processInParallel() {
  try {
    const [data, moreData] = await Promise.all([fetchData(), fetchMoreData()]);
    // Have your way with the results
  } catch (error) {
    // Handle any of those pesky rejections
  }
}
```

Bear in mind, handling errors for each promise and using Promise.allSettled can be a game-changer when an early stop isn't an option:

```js
async function fetchAllData() {
  const results = await Promise.allSettled([fetchData(), fetchMoreData()]);
  
  for (const result of results) {
    if (result.status === 'fulfilled') {
      // Yay! Everything went according to plan
    } else {
      // Uh oh, something went south! Handle the error
    }
  }
}
```
## Performance metrics and rollback strategy
You're likely to notice a significant performance improvement when using parallel execution. You can measure this using console.time and console.timeEnd:
```js
console.time('fetching data in parallel');
const [data, moreData] = await Promise.all([fetchData(), fetchMoreData()]);
console.timeEnd('fetching data in parallel'); // Spits out the time taken
```
In case of using Promise.all, there's no stopping once the wheel gets rolling. If one operation relies on the result of another and might need a rollback in case of failure, you'll have to manage that manually.

## Unleash the power of parallel execution
Parallel execution is not just about API calls. Sometimes, you'd want to parallelize file operations or server requests. For Node.js developers, the async library packs some punch for parallel operations, with utilities like eachLimit.
Conditional logic or dependent tasks may require unique Promise instances for each async function:
```js
const timerPromise = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));

const runConcurrently = async () => {
  const promises = [
    timerPromise(500, 'First'), // It's the slowest, but no one' going to wait for it.
    timerPromise(1000, 'Second'),
    timerPromise(1500, 'Third') // "I came, I saw, I... finished last. But they did wait for me!"
  ];
  return await Promise.all(promises);
}

runConcurrently().then(console.log); // Logs ["First", "Second", "Third"] after ~1500ms
```

## Sequential vs parallel: The showdown
Discerning between sequential and parallel execution is vital. async/await in a loop gives sequential execution, whereas Promise.all provides parallel execution. Compare the below:
#### Sequential (Waiting in line):
```js
for (const asyncFunc of [fetchData, fetchMoreData]) {
  await asyncFunc(); // "After you... No, I insist, after you..."
}
```
#### Parallel (Rush hour):
```js
await Promise.all([fetchData(), fetchMoreData()]); // "Get outta my way!"
```

### Make friends with failures
Be friendly with promise rejections when using Promise.all. If one promise rejects, all fall down. Promise.allSettled may come in handy when you want all promises to settle down before moving forward.

# Callback after all asynchronous forEach callbacks are completed
Execute your callback after your sequence of asynchronous tasks by adopting the Promise approach and aggregating them. Promise.all could then help ensure that your final callback only runs after all promises get resolved.
Here is a simple example:
```js
const asyncTasks = [/* "Async tasks? More like 'a sync task', right?" */];
const promises = asyncTasks.map(task => new Promise((resolve) => task().then(result => { 
  console.log("Task completed. I'm resolving, therefore I exist. 🤔");
  resolve(result);
})));

Promise.all(promises).then(() => {
  console.log('Looks like all tasks are done.;');
  // Place your logic for final callback here
});
```
#### Focus:
- Ensure Promise.all that all promises have been covered
- Ensure every async task has been mapped to a promise
- Only execute callback after Promise.all is resolved

## Sync & Async: the duality of tasks

Working with asynchronous operations nested within synchronous loops like Array.forEach could be confusing. The solution lies in control flow devices like Promise.all. Beware of the ancient tribal scriptures, they speak of race conditions when dealing with async operations and counters, Promises are immune to this elusive evil.

### Async task execution order: the unruly child
Promises can be a tough cookie. The completion order is not guaranteed, quite similar to sibling rivalries. If sequential execution is important, make sure the state for each async function's completion callback can stand independently.

### Async/Await: the saviors
The holy grail of asynchronous logic lies in the serenity brought by async/await. With this, your code becomes more readable, and handling life’s unpleasant surprises, aka exceptions, becomes a breeze with try/catch blocks.

### Async library: the best friend you didn't know you had
When the going gets tough, the async library gets going. It comes with handy tools like async.each, async.parallel, and async.series which take on the burdens of boilerplate logic, leaving room for strategizing your business logic.

### ES2018's for await...of: the unsung hero
With ES2018 came yet another helper in handling async code, the for await...of loop. It allows smooth iteration over async iterable objects simplifying control flow significantly.

### Async Iterators: The new kids on the block
Want to control the async execution flow? Say hello to async iterators. When combined with for await...of it will listen to your commands about when an async operation should stop and continue.

### Item done callbacks: the individual cheerleaders
Sometimes, each async task needs its own cheerleader – the itemDone callback. If that’s on your wishlist, design every async function to enact the itemDone callback on task completion keeping in mind the freedom of the callback to enforce rules in any order.

### No-utility async forEach handling: the diy task
When Promise.all or async libraries are unavailable, revert to "good ol' basics". Manage async forEach execution with a counter, but keep your wits about you while handling errors and updating counters.

### Analyzing the enemy: async/await pitfalls
Async/await is not a universal solution. If it’s unsupported in an environment or incompatible with a library, you’ve to use an alternative tool. Recognizing the right tool is sometimes the most challenging task of all.

# Javascript sleep/wait before continuing
Achieve a delay or pause in your JavaScript code execution by leveraging the async/await pattern in combination with our bespoke sleep function:
```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function delayedLog() {
  console.log('Waiting is the hardest part...');
  await sleep(2000); // 2-second pause, like waiting in line for coffee ☕
  console.log('Finally, my turn!');
}

delayedLog();
```

Executing console.log('Waiting is the hardest part...') initiates the process. After a patient wait of 2 seconds, our script bustles and confidently states console.log('Finally, my turn!').

## A peek under the hood: Understanding async/await
An async function yields a Promise. That's cool, but when coupled with an await expression, it delivers extra oomph by pausing the execution of asynchronous functions. It feels like calling 'timeout' in a board game until the Promise resolution or rejection.
However, it doesn't keep you waiting long. Once the promise comes through, it briskly resumes the function's execution and dutifully returns the resolved value. Like waiting for a very punctual but important email.

## Potential pitfalls with sleep calls
When working with sleep functions, like too much of a good thing, timing can become that slowly loading GIF. Dealing with sleep times needs balance, like coffee consumption. Excessive waiting is like a YouTube ad with no skip button - it's a bad user experience.

## Practical applications for sleep/wait
### Temporary user notifications
Wait times = read times. A delay before updating a notification gives your users a moment to soak it in.

### Smoother animation sequences
A bit of a nap between animation stages ensures they're observed individually, providing a more natural user interaction.

### API calls and throttling
Gentle pacing of operations such as API calls or intense calculations ensures neither you nor the system has a meltdown due to overload.

## Common gotchas and their solutions

### Misunderstanding setTimeout
Remember, setTimeout isn't an espresso shot - it won't pause code execution. This isn't an Italian café!

### Callback inception
Beware of the callback inception (aka callback hell). Maintain your code readability by avoiding deep nesting of setTimeout callbacks.

### Blocking the main thread
Avoid synchronous for loop sleeps. It's like an internet troll, it will make things unresponsive and create havoc.

## Out-of-the-box solutions

### Promise-based timing
You can be a hipster and avoid async/await - use chained Promises with .then instead:
```js
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

console.log('Sit tight...');
sleep(2000).then(() => {
  console.log('Surprise! 🎉');
});
```

### Generators
For complex control flows, JavaScript Generators can juggle sleep functionality to pause and resume execution:
```js
function* generatorSleepWorkflow() {
  console.log('Step 1: Draw two circles ⚫⚫');
  yield sleep(2000);
  console.log('Step 2: Draw the rest of the owl 🦉');
  yield sleep(2000);
  console.log('Art!');
}

const iterator = generatorSleepWorkflow();
iterator.next().value.then(() => iterator.next());
```

### setInterval: Use with caution!
setInterval is like setting your own alarm - wake up every X period unless stopped. Ran without control, it can turn into a Groundhog Day nightmare scenario. Always remember to call clearInterval.