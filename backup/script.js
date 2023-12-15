const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-loc");
const showApi = document.getElementById("show-api");
const searchResults = document.getElementById('search-results');
let locData = [];
async function getLocWeather() {
    const weatherLocation = "https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json";
    try {
        const response = await fetch(weatherLocation);
        const data = await response.json();
        console.log(data);


        for (let i = 0; i < data.length; i++) {
            let loc = data[i];
            const locSpecific = { id: `${loc.id}`, Wilayah: `${loc.kecamatan}, ${loc.kota}, ${loc.propinsi}` };
            if (loc.id != '0') {
                locData.push(locSpecific);
            }
        }
        console.log(locData);
    } catch (error) {
        console.error("Error:", error);
    }
}

getLocWeather();

inputElement.addEventListener('input', function () {
    const searchTerm = inputElement.value.toLowerCase();
    const matchingSuggestions = locData.filter(locSpecificData =>
        locSpecificData.Wilayah.toLowerCase().includes(searchTerm)
    );

    displaySuggestions(matchingSuggestions.slice(0, 5));
})

document.addEventListener('click', function (event) {
    const isClickedInsideResults = searchResults.contains(event.target);

    if (!isClickedInsideResults) {
        searchResults.style.display = 'none';
    }
});

function displaySuggestions(locationsData) {
    if (locationsData.length > 0) {
        const locationsDataHTML = locationsData.map(locSpecificData =>
            `<div class="result-item" onclick="getWeather(${locSpecificData.id}, '${locSpecificData.Wilayah}')">${locSpecificData.Wilayah}</div>`
        ).join('');
        searchResults.innerHTML = locationsDataHTML;
        searchResults.style.display = 'block';

    }
}

function selectSuggestion(selectedId, selectedValue) {
    inputElement.value = selectedValue;
    searchResults.style.display = 'none';
    // You can use selectedId as needed (e.g., for further processing or fetching additional data).
    console.log('Selected Id:', selectedId);
}

// fungsi untuk mendapatkan kondisi wilayah secara spesifik
// async function getWeather(idWilayah, wilayah) {
async function getWeather(idWilayah, wilayah) {
    const spesficLocation = `https://ibnux.github.io/BMKG-importer/cuaca/${idWilayah}.json`;
    searchResults.style.display = 'none';
    inputElement.value = wilayah;
    console.log(`ID Wilayah: ${idWilayah}`);
    try {
        const response = await fetch(spesficLocation);
        const data = await response.json();
        // showApi.innerText = data;
        console.log("data");
        console.log(data);

        // menghapus hasil sebelumnya
        showApi.innerHTML = '';

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            // menampilkan yang jika nilai i bernilai ganjil
            if (i % 2 == 1) {
                showApi.innerHTML += `
                <div class="card-weather" style="border: 1px solid black; padding: 5px; max-width: 25%; display: flex; flex-direction: column; justify-content: center; flex-wrap: wrap; align-items: center;">
                    <h3 class="time">${element.jamCuaca}</h3>
                    <div class="detail" style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center;">
                        <img class="weather-icon" src="https://ibnux.github.io/BMKG-importer/icon/${element.kodeCuaca}.png" alt="">
                    <p class="tempCel">${element.tempC} derajat C</p>
                    <p class="weather">${element.cuaca}</p>
                    </div>
                </div>`
            }
            
            
        }
    } catch (error) {
        console.error("Error:", error);
    }
}