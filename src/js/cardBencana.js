import L from 'leaflet';
import dataBencana from '../data/dataBencana';

class Bencana {
  constructor() {
    this.createCards = this.createCards.bind(this);
    this.createMaps = this.createMaps.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  createCards() {
    const cardBencana = document.querySelector('#cardBencana');
    cardBencana.innerHTML = '';

    const content = dataBencana.map((data) => {
      if (data) {
        return `
    <div class="col" >
        <div class=" card mb-3 w-100 rounded-5 shadow-sm hover-card" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  src="${data.imageCard}"
                  class="img-fluid rounded-5 h-100 p-3  "
                  alt="kebakaran"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <a href="#" class=" text-decoration-none "><h5 class="card-title link-dark link-opacity-25-hover">${data.title}</h5></a>
                  <p class="card-text">
                    ${data.description}
                  </p>
                  <p class="card-text">
                    <p class="style= font-size: 13px;"><i class="fa fa-map-marker" aria-hidden="true"></i>  ${data.location}</p>
                  </p>
                </div>
              </div>
            </div>
          </div>
    </div>`;
      }
      return '';
    });

    cardBencana.innerHTML = content.join('');
  }

  // eslint-disable-next-line class-methods-use-this
  createMaps() {
    const cardMaps = document.querySelector('#map');
    cardMaps.innerHTML = '';

    // eslint-disable-next-line no-use-before-define
    getLocation();

    function getLocation() {
      if (navigator.geolocation) {
        // eslint-disable-next-line no-use-before-define
        navigator.geolocation.getCurrentPosition(showPosition);
      }
    }

    function showPosition(position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      const map = L.map('map').setView([lat, long], 10);

      L.marker([lat, long])
        .addTo(map)
        .bindPopup('your current location')
        .openPopup();

      dataBencana.forEach((data) => {
        const { latitude, longitude, location } = data;

        if (latitude && longitude) {
          L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(location);
        }
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
        foo: 'bar',
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    }
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.createCards();
      this.createMaps();
    });
  }
}

export default Bencana;
