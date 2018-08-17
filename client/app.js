const form = document.querySelector('form');
const searchInput = document.querySelector('input');
const resultsList = document.querySelector("#results");
const resultsListing = document.querySelector("#lem");


const BASE_URL = 'https://book.cfapps.eu10.hana.ondemand.com/';


form.addEventListener('submit', formSubmitted);
form.addEventListener('#id', mlSubmitted);
const elem = document.getElementById('content').addEventListener("click", mlSubmitted);


function formSubmitted(event){
    event.preventDefault();
    const searchTerm = searchInput.value;
    getSearchResults(searchTerm)
    .then(showResults);

}
function mlSubmitted(event){
    event.preventDefault();
    const searchTerm = searchInput.value;
    getMLcomponent()
    .then(showMLResults);

}


function getSearchResults(searchTerm) {
    return fetch(`${BASE_URL}search/${searchTerm}`)
    .then(res => res.json());

}
function getMLcomponent() {
    return fetch(`${BASE_URL}recomend`)
    .then(res => res.json());

}



function showResults(results) {
    console.log(results);
    results.forEach(book => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = book.title;
        a.href = book.refer;
        li.appendChild(a);
        resultsList.appendChild(li);


        
    });
}

function showMLResults(lem) {
    console.log(lem);
    lem.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = item;
        
        li.appendChild(a);
        resultsListing.appendChild(li);


        
    });
}