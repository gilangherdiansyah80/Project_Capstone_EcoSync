// main.js
import { getLocWeather, locData } from './getLocWeather.js';
import { displaySuggestions } from './displaySuggestions.js';
import { getWeather } from './getWeather.js';

let inputElement;

function init() {
    inputElement = document.getElementById('search-loc');
    const searchResults = document.getElementById('search-results');

    inputElement.addEventListener('input', function () {
        const searchTerm = inputElement.value.toLowerCase();
        const matchingSuggestions = locData.filter(locSpecificData =>
            locSpecificData.Wilayah.toLowerCase().includes(searchTerm)
        );

        displaySuggestions(matchingSuggestions.slice(0, 5));
    });

    document.addEventListener('click', function (event) {
        const isClickedInsideResults = searchResults.contains(event.target);

        if (!isClickedInsideResults) {
            searchResults.style.display = 'none';
        }
    });
}

// Call the init function to start your application
init();

// Continue with the rest of your code
