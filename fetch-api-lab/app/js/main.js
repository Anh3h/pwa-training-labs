/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// helper functions ----------

function logResult(result) {
  console.log(result);
}

function logError(error) {
  console.log('Looks like there was a problem:', error);
}

function validateResponse(response) {
  if(!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function readResponseAsText(response) {
  return response.text();
}

function readResponseAsJSON(response) {
  return response.json();
}

function showText(responseAsText) {
  const message = document.getElementById('message');
  message.textContent = responseAsText;
}

// Fetch JSON ----------

function fetchJSON() {
  fetch("examples/animals.json")
    .then(validateResponse)
    .then(readResponseAsJSON)
    .then(logResult)
    .catch(logError);
}
const jsonButton = document.getElementById('json-btn');
jsonButton.addEventListener('click', fetchJSON);


// Fetch Image ----------

function fetchImage() {
  fetch("examples/fetching.jpg")
    .then(validateResponse)
    .then(readResponseAsBlob)
    .then(showImage)
    .catch(logError)
}
const imgButton = document.getElementById('img-btn');
imgButton.addEventListener('click', fetchImage);


// Fetch text ----------

function fetchText() {
  fetch("/examples/words.txt")
    .then(validateResponse)
    .then(response => response.text())
    .then(showText)
}
const textButton = document.getElementById('text-btn');
textButton.addEventListener('click', fetchText);


// HEAD request ----------

function headRequest() {
  fetch("examples/words.txt", {
    method: 'HEAD'
  })
    .then(validateResponse)
    // .then(readResponseAsText)
    // .then(logResult)
    .then((response) => console.log(response.headers.get("content-length")))
    .catch(logError);
}
const headButton = document.getElementById('head-btn');
headButton.addEventListener('click', headRequest);


// POST request ----------

/* NOTE: Never send unencrypted user credentials in production! */
function postRequest() {
  let formData = new FormData(document.querySelector('#msg-form'))
  let messageHeaders = new Headers({
    'Content-Type': 'application/json',
    'Y-Custom': 'Hello World'
  })

  // fetch request to a server not configured for CORS request
  // fetch("http://localhost:5001/", {
  fetch("http://localhost:5000/", {
    headers: messageHeaders,
    method: 'POST',
    body: JSON.stringify({ lab: 'fetch', status: 'fun' }),
    // mode: 'no-cors' allows fetching opaque response (i.e response from a non-cors server. such response can't be accessed using JS)
  })
    .then(validateResponse)
    .then(readResponseAsText)
    .then(showText)
    // .then(logResult)
    .catch(logError);
}
const postButton = document.getElementById('post-btn');
postButton.addEventListener('click', postRequest);


function showImage(responseAsBlob) {
  const container = document.getElementById("img-container");
  const imgElm = document.createElement('img');
  container.appendChild(imgElm);
  console.log(readResponseAsBlob)
  const imgUrl = URL.createObjectURL(responseAsBlob);
  imgElm.src = imgUrl;
}

function readResponseAsBlob(response) {
  return response.blob();
}