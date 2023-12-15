// getWeather.js
async function getWeather(idWilayah, wilayah) {
    const spesficLocation = `https://ibnux.github.io/BMKG-importer/cuaca/${idWilayah}.json`;
    const searchResults = document.getElementById('search-results');
    const showApi = document.getElementById('show-api');
    const inputElement = document.getElementById('search-loc');

    searchResults.style.display = 'none';
    inputElement.value = wilayah;

    try {
        const response = await fetch(spesficLocation);
        const data = await response.json();

        showApi.innerHTML = ''; // Clear previous results

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            // Display elements with odd indices
            if (i % 2 == 1) {
                showApi.innerHTML += `
            <div class="card-weather" style="border: 1px solid black; padding: 5px; max-width: 25%; display: flex; flex-direction: column; justify-content: center; flex-wrap: wrap; align-items: center;">
              <h3 class="time">${element.jamCuaca}</h3>
              <div class="detail" style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center;">
                <img class="weather-icon" src="https://ibnux.github.io/BMKG-importer/icon/${element.kodeCuaca}.png" alt="">
                <p class="tempCel">${element.tempC} derajat C</p>
                <p class="weather">${element.cuaca}</p>
              </div>
            </div>`;
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export { getWeather };
