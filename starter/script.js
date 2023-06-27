'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// 251. Our First AJAX Call: XMLHttpRequest
const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
              <img class="country__img" src="${data.flags.svg}" />
              <div class="country__data">
                <h3 class="country__name">${data.name.official}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${Object.values(
                  data.languages
                ).join(', ')}</p>
                <p class="country__row"><span>💰</span>${Object.keys(
                  data.currencies
                )}</p>
              </div>
            </article>
        `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
/*
const getCountryAndNeighbor = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send(); //we send the request and fetch the data in the background, once it's done, it will emit the 'load' event
  // console.log(request.responseText); //what we have here is just JSON (big string of text)

  request.addEventListener('load', function () {
    //FIRST Callback function
    //use the addEventListener, we are waiting for that event, as soon as arrive,  this callback function will be called
    //we have to convert the JSON string to object
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //Render country 1
    renderCountry(data);

    //Get neighbor countries (2)
    const neighbor = data.borders?.[0]; //this will get the first neighbor in the list of neighbors

    if (!neighbor) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      //SECOND Callback function
      const [data2] = JSON.parse(this.responseText); //convert JSON string to object
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbor('finland');
*/

// const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

// 251. Promises and Fetch API
// const request = fetch('https://restcountries.com/v3.1/name/finland') //this is Promise, stored in 'request' variable
// console.log(request);

// 252. Consume Promises
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json(); //json() is available on all the response objects that is coming from the fetch() function
//       //this response.json() also return a promise
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     }); //calling the fetch function like this will immediately return a Promise, as soon as we start request
// };
/////////////////////////////////////////////////////
// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => { // return => getJSON return a promise
//     if (!response.ok)
//       throw new Error(
//         `${errorMsg}, ${response.status}`
//       );
//     return response.json();
//   });
// };

// const getCountryData = country => {
//   //Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`) // this we fetched something ->
//     .then(
//       response => {
//         console.log(response);

//         if (!response.ok)
//           throw new Error(
//             `The country you look for (${response.status}) does not exist`
//           ); //if response.ok is false => we throw an error status for users

//         return response.json();
//       } //then we get a response which will be transformed to json -> you get data after that
//     )
//     .then(data => {
//       renderCountry(data[0]); //then we take that data and render the country to the DOM
//       // const neighbor = data[0].borders?.[0];
//       const neighbor = 'dasdas';

//       if (!neighbor) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(
//           `The country you look for (${response.status}) does not exist`
//         );

//       response.json();
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} ⛔⛔⛔⛔ error`); // catch the error globally, not locally after every fetch
//       renderError(`Something went wrong ⛔⛔⛔⛔ ${err.message}. Try again!`); //we only print the message of that error and not the whole object it  self
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// btn.addEventListener('click', function () {
//   getCountryData('korea');
// });
////////////////////////////////////////
// const getCountryData = country => {
//   //Country 1
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found').then(data => {
//     renderCountry(data[0]);
//     // const neighbor = 'dsadas';
//     const neighbor = data[0].borders?.[0];
//     // if(!neighbor) return;
//     //Country 2
//     return getJSON(`https://restcountries.com/v3.1/alpha/${neighbor}`, 'No neighbor found').then(data => renderCountry(data[0], 'neighbour')).catch(err => {
//       console.error(`${err} ⛔⛔⛔⛔ error`);
//       renderError(`Something went wrong ⛔⛔⛔⛔ ${err.message}. Try again!`)
//     }).finally(() => (countriesContainer.style.opacity = 1))
//   })
// }

// btn.addEventListener('click', function () {
//   getCountryData('ireland')
// })

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
TEST COORDINATES 2: 60.97172, 25.6592054

GOOD LUCK 😀


const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url)
    .then(response => {
      // return => getJSON return a promise
      return response.json();
    })
    .then(data => {
      if (!data.success) throw new Error(`${errorMsg}, ${data.error.message}`);
    });
};

const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  )
    .then(response => {
      if(!response.ok) throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
        console.log(data);
        console.log(`You are at ${data.city}, ${data.countryName}`);

        return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`)
    })
    .then(response => {
      if(!response.ok)
      throw new Error(`Country is not found (${response.status})`);

      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 😡😡😡😡`))
};

whereAmI(52.508, 13.381);
whereAmI(60.97172, 25.6592054);
whereAmI(20.9159639, 105.6427062);


// 259, Building a simple Promise
console.log('start');
const lotteryPromise = new Promise(function (resolve, reject) {

  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 🤑🫰💶💶'); //in order to set the promise as fulfilled we use the resolve() function, so calling the resolve function like this, will mark this promise as fulfilled promise = resolved promise. Whatever value we pass into the result function here is gonna be the result of the promise that will be available in the .then() handler
    } else {
      reject(new Error ('You LOST 😡💸💸')); //into the reject() we pass in the error message that we later want to be able in the .catch() handler
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));
console.log('end');


// Promisifying SetTimeout
const wait = function (seconds) {
  //inside of this function we will actually create and return a promise => encapsulate the asynchronous operation even further (this also what  .fetch() does)
  return new Promise(function(resolve) { //no need reject, it's impossible for the timer to fail and therefore we will never mark this as rejected
    setTimeout(resolve, seconds * 1000) // in this case we don't need to pass in any resolve value into the resolve function, NOT MANDATORY 
  })
} 

wait(1).then(() => {
  console.log('I have waited for 1 seconds');
  return wait(1)
}).then(() => {
  console.log('I have waited for 2 seconds');
  return wait(1)
}).then(() => {
  console.log('I have waited for 3 seconds');
  return wait(1)
}).then(() => {
  console.log('I have waited for 4 seconds');
  return wait(1)
}).then(() => console.log('I waited for 5 second'))

Promise.resolve('You WIN 🤑🫰💶💶').then(x => console.log(x))
Promise.reject(new Error('Problem!')).catch(x => console.log(x))
*/

// 260. Promisifying teh Geolocation API

const getPosition = function () {
  //We return a Promise then handle later on
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position), // this one here is the success callback function, when we success we want resolve the promise, mark it as fulfilled, so therefore we call the 'resolve' function and we pass in that position object, because that is actually the fulfilled value that we want to get from this promise in case that is successful
    //   // that is the whole reason of using this getPosition function in the first place, it is to get access to the current position (in the 'position' object and that is what we pass into resolve())
    //   err => reject(err)
    // );

    //to be simpler, we can do this
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(position => console.log(position));

const whereAmI = function () {
  getPosition()
    .then(position => {
      const { latitude: lat, longitude: lng } = position.coords;

      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are at ${data.city}, ${data.countryName}`);

      return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country is not found (${response.status})`);

      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 😡😡😡😡`));
};

btn.addEventListener('click', whereAmI);

// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

const createImage = function (imgPath) {
  return new Promise (function (resolve, reject) {
    document.createElement('img')
  })
}