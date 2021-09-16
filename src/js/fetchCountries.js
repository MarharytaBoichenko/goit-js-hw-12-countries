const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}/name/${searchQuery}`).then(response => {
        if (!response.ok) {
            throw new Error(`error`) 
        } return response.json();
            console.log(response);
    });
    
}
export default { fetchCountries }