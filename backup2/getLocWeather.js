// getLocWeather.js
let locData = [];

async function getLocWeather() {
  const weatherLocation = "https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json";
  try {
    const response = await fetch(weatherLocation);
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      let loc = data[i];
      const locSpecific = { id: `${loc.id}`, Wilayah: `${loc.kecamatan}, ${loc.kota}, ${loc.propinsi}` };
      if (loc.id != '0') {
        locData.push(locSpecific);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export { getLocWeather, locData };
