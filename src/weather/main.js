// Menggunakan id Wilayah default yaitu bandung 501212
// Location Bandung, Kota Bandung, Jawa Barat
const cuaca = document.getElementById('weather-detail');
console.log(cuaca);

async function getLocation(idWilayah) {
    const spesficLocation = `https://ibnux.github.io/BMKG-importer/cuaca/${idWilayah}.json`;
    try {
        const response = await fetch(spesficLocation);
        const data = await response.json();
        console.log(data);

        for (let i = 0; i < data.length; i++) {
            let dataCuaca = data[i];
            // const locSpecific = { id: `${loc.id}`, Wilayah: `${loc.kecamatan}, ${loc.kota}, ${loc.propinsi}` };
            if (i % 2 == 1) {
                cuaca.innerHTML += `
                <div class="cuaca-item card border-0 bg-transparent text-white" style="min-width: 250px;">
                    <div class="card-header bg-transparent border-0">
                        <h5 class="text-dark">${formatHari(dataCuaca.jamCuaca)} - ${formatJam(dataCuaca.jamCuaca)}</h5>
                    </div>
                    <div class="card-body border-none bg-info d-flex flex-column justify-content-around rounded px-4"
                        style="min-height: 170px;">
                        <div class="d-flex justify-content-around">
                            <img src="https://ibnux.github.io/BMKG-importer/icon/${dataCuaca.kodeCuaca}.png" alt="" style="max-width: 60px;">
                            <p class="fs-3">${dataCuaca.tempC}&deg;C</p>
                        </div>
                        <p>Bandung, Indonesia</p>
                    </div>
                </div>
                `;
            }

        }
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}
console.log(cuaca);

getLocation('501212');


// memformat tanggal 
function formatTanggal(tanggal) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(tanggal).toLocaleDateString('id-ID', options);
    return formattedDate;
  }
  
// format 
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
