// displaySuggestions.js
function displaySuggestions(locationsData) {
    const searchResults = document.getElementById('search-results');

    if (locationsData.length > 0) {
        const locationsDataHTML = locationsData.map(locSpecificData =>
            `<div class="result-item" onclick="getWeather(${locSpecificData.id}, '${locSpecificData.Wilayah}')">${locSpecificData.Wilayah}</div>`
        ).join('');
        searchResults.innerHTML = locationsDataHTML;
        searchResults.style.display = 'block';
    }
}

export { displaySuggestions };
