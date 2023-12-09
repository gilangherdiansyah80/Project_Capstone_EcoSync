const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-loc");
const showApi = document.getElementById("show-api");
const searchResults = document.getElementById('search-results');

let locData = [];

// ini untuk mendapatkan id wilayah
async function getLocWeather() {
    const weatherLocation = "https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json";
    try {
        const response = await fetch(weatherLocation);
        const data = await response.json();
        console.log(data);

        
        for (let i = 0; i < data.length; i++) {
            let loc = data[i];
            const locSpecific = {id: `${loc.id}`, Wilayah: `${loc.kecamatan}, ${loc.kota}, ${loc.propinsi}`};
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

inputElement.addEventListener('input', function() {
    const searchTerm = inputElement.value.toLowerCase();
    const matchingSuggestions = locData.filter(locSpecificData =>
        locSpecificData.Wilayah.toLowerCase().includes(searchTerm)
    );

    displaySuggestions(matchingSuggestions.slice(0, 5));
})

document.addEventListener('click', function(event) {
    const isClickedInsideResults = searchResults.contains(event.target);

    if (!isClickedInsideResults) {
        searchResults.style.display = 'none';
    }
});

function displaySuggestions(locationsData) {
    if (locationsData.length > 0) {
        const locationsDataHTML = locationsData.map(locSpecificData =>
            // `<div class="result-item" onclick="selectSuggestion(${locSpecificData.id}, '${locSpecificData.Wilayah}')">${locSpecificData.Wilayah}</div>`
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



const divElement = document.createElement("div");
// menambahkan class untuk div
divElement.classList.add("card");
const cuaca = document.createElement("p");
const kodeCuaca = document.createElement("p");
const tempC = document.createElement("p");
const jamCuaca = document.createElement("p");
divElement.appendChild(cuaca);
divElement.appendChild(kodeCuaca);
divElement.appendChild(tempC);
divElement.appendChild(jamCuaca);
showApi.appendChild(divElement);

console.log(`Nilai ${cuaca.value}`);


// fungsi untuk mendapatkan kondisi wilayah secara spesifik
// async function getWeather(idWilayah, wilayah) {
async function getWeather(idWilayah, wilayah) {
    const spesficLocation = `https://ibnux.github.io/BMKG-importer/cuaca/${idWilayah}.json`;
    searchResults.style.display = 'none';
    inputElement.value = wilayah;
    try {
        const response = await fetch(spesficLocation);
        const data = await response.json();
        // showApi.innerText = data;
        console.log(data);

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            console.log(element);
            cuaca.innerText = `Cuaca : ${element.cuaca}`;
            kodeCuaca.innerText = `Kode Cuaca : ${element.kodeCuaca}`;
            tempC.innerText = `Temperature Celcius : ${element.tempC}`;
            jamCuaca.innerText = `Jam Cuaca : ${element.jamCuaca}`;
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// formElement.addEventListener("submit", (event) => {
//     event.preventDefault();
    // console.log(inputElement.value);
    // getWeather("501400");
//     getWeather(inputElement.value);

// });

