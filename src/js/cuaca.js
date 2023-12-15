const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-loc");
const searchResults = document.getElementById('search-results');


// edit
const weatherRelated = document.getElementById("weather-related");
console.log(weatherRelated);
const cuacaHourly = document.getElementById("cuaca-hourly");

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
            // `<div class="result-item" onclick="selectSuggestion(${locSpecificData.id}, '${locSpecificData.Wilayah}')">${locSpecificData.Wilayah}</div>`
            `<div class="result-item" onclick="getWeather(${locSpecificData.id}, '${locSpecificData.Wilayah}')">${locSpecificData.Wilayah}</div>`
        ).join('');
        searchResults.innerHTML = locationsDataHTML;
        searchResults.style.display = 'block';
        console.log(locationsDataHTML);

    }
}

function selectSuggestion(selectedId, selectedValue) {
    inputElement.value = selectedValue;
    searchResults.style.display = 'none';
    // You can use selectedId as needed (e.g., for further processing or fetching additional data).
    console.log('Selected Id:', selectedId);
}

// ini untuk menampilkan default wilayah dan idwilayah
getWeather(501212, 'Bandung, Kota Bandung, Indonesia');

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
        console.log("data");
        console.log(data);

        // Clear previous results
        // showApi.innerHTML = '';
        weatherRelated.innerHTML = '';
        cuacaHourly.innerHTML = '';

        // menampilkan data cuaca pada hari ini per 6 jam 



        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (i == 1) {
                weatherRelated.innerHTML = `
                    <h5 class="card-title text-black">${inputElement.value}</h5>
                    <p class="card-text">${formatTanggal(element.jamCuaca)} <br> Jam ${formatJam(element.jamCuaca)}</p>
                    <div class="row">
                        <div class="col-md-4">
                            <img src="https://ibnux.github.io/BMKG-importer/icon/${element.kodeCuaca}.png" alt="..." class="w-75" style="max-width: 100px;">
                            <p class="mt-4 ms-2">${element.cuaca}</p>
                        </div>
                        <div class="col-md-7 p-0">
                            <h1>${element.tempC}&deg;C</h1>
                            <p class="ms-4 mt-4 fs-5">60/80</p>
                        </div>
                    </div>
                `;
            }
            // menampilkan yang jika nilai i bernilai ganjil
            // ini untuk cuaca-hourly
            cuacaHourly.innerHTML += `
            <div class="col-md-2 item-hourly">
                <p>${formatHari(element.jamCuaca)} ${formatJam(element.jamCuaca)}</p>
                <img src="https://ibnux.github.io/BMKG-importer/icon/${element.kodeCuaca}.png" alt="" class="w-100">
                <p class="mt-2">${element.tempC}&deg;C</p>
            </div>
            `;

        }
        console.log(weatherRelated);
        console.log(cuacaHourly);
    } catch (error) {
        console.error("Error:", error);
    }
}


// let data = [
//     { jamCuaca: '2023-12-4 12:00:00' }
// ];

// Fungsi untuk memformat tanggal
function formatTanggal(tanggal) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(tanggal).toLocaleDateString('id-ID', options);
    return formattedDate;
}
// format tanggal yang hanya mengambil nama hari
function formatHari(tanggal) {
    const options = { weekday: 'long' };
    const formattedDate = new Date(tanggal).toLocaleDateString('id-ID', options);
    return formattedDate;
}
// Fungsi untuk memformat jam
function formatJam(tanggal) {
    const formattedTime = new Date(tanggal).toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' });
    return formattedTime;
}
