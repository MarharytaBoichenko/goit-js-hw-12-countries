import './sass/main.scss';
import API from './js/fetchCountries.js';
import oneCountry from './templates/one-country.hbs'
import countries from './templates/countries-list.hbs'
import debounce from 'lodash.debounce';

// import '@pnotify/core/dist/BrightTheme.css';
// import '@pnotify/core/dist/PNotify.css';
// import { info, error } from '@pnotify/core';
import { infoNotice, errorNotice } from "./js/notifications";


const  inputEl = document.querySelector('.input-field')
const carContainerEl = document.querySelector('.card-container')

const infoText = 'Too many matches found. Please enter a more specific query.'
const errorText = "Sorry, there are no  countries  with  such  name."

inputEl.addEventListener('input', debounce(onInputChange, 500)) 
let countryName = ""

function renderCountryList(place, array){
    let countriesList = array.map((item) =>
         item.name)
    const countriesListMarkup = countries(countriesList)
    place.insertAdjacentHTML('beforeend', countriesListMarkup);
}

function showCountryData(place, array) {
    let countryData = array[0];
   const countryMarkup = oneCountry(countryData)
    place.insertAdjacentHTML('beforeend', countryMarkup);    
}

function onInputChange(e) {
    e.preventDefault();
    console.log(e.target.value);
   countryName = e.target.value;
    carContainerEl.innerHTML = "";
    
    console.log(countryName);
    API.fetchCountries(countryName).then((data) => {
         if (data.length >= 2 && data.length <= 10) {
            console.log(`будет список  стран`);
            renderCountryList(carContainerEl, data);
        }  else if  (data.length === 1) {
            console.log(`данные  страны `);
            showCountryData(carContainerEl, data);
            e.target.value = '';
        } else { console.log(` уточните Ваш  запрос -  нотификашка`);
             infoNotice(infoText)
         } 
    }).catch(onFetchError)
        .finally(()=> e.target.value = '');
}

function onFetchError() {
    console.log(`ERROR`);
    errorNotice(errorText)
};
