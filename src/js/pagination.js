import dataDonation from '../data/dataDonation';

class Pagination {
  constructor() {
    this.cardsPerPage = 4;
    this.currentPage = 1;
    this.totalCards = 0;
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);

    this.createCards = this.createCards.bind(this);
    this.updatePaginationLinks = this.updatePaginationLinks.bind(this);
  }

  createCards() {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    const endIndex = Math.min(startIndex + this.cardsPerPage, this.totalCards);

    const cardContents = dataDonation.slice(startIndex, endIndex).map((data) => {
      if (data && data.links) {
        return `
          <a href="${data.links}" target="_blank" style="text-decoration: none;">
            <div class="card" style="width: 18rem;">
              <img src="${data.imageCard}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title fs-6">${data.title}</h5>
                <p class="card-text mt-4">${data.description}</p>
                <p class="fw-bold mb-0 mt-4">
                  <img src="${data.imageSmall}" class="rounded img-fluid" width="30px" alt="">
                  ${data.titleImageSmall} <i class="bi bi-patch-check-fill ms-2" style="color: #10a8e5;"></i>
                </p>
              </div>
            </div>
          </a>
        `;
      }
      return '';
    });

    cardContainer.innerHTML = cardContents.join('');
  }

  updatePaginationLinks() {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';

    const previousLi = document.createElement('li');
    previousLi.className = 'page-item';
    const previousLink = document.createElement('a');
    previousLink.className = 'page-link';
    previousLink.href = '#';
    previousLink.setAttribute('aria-label', 'Previous');
    const previousSpan = document.createElement('span');
    previousSpan.setAttribute('aria-hidden', 'true');
    previousSpan.innerText = '«';
    previousLink.appendChild(previousSpan);
    previousLi.appendChild(previousLink);
    paginationContainer.appendChild(previousLi);

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= this.totalPages; i++) {
      const li = document.createElement('li');
      li.className = `page-item${i === this.currentPage ? ' active' : ''}`;

      const a = document.createElement('a');
      a.className = 'page-link';
      a.href = '#';
      a.innerText = i;

      a.addEventListener('click', (e) => {
        e.preventDefault();
        this.currentPage = parseInt(a.innerText, 10);
        this.createCards();
        this.updatePaginationLinks();
      });

      li.appendChild(a);
      paginationContainer.appendChild(li);
    }

    // Tambahkan tombol "Next"
    const nextLi = document.createElement('li');
    nextLi.className = 'page-item';
    const nextLink = document.createElement('a');
    nextLink.className = 'page-link';
    nextLink.href = '#';
    nextLink.setAttribute('aria-label', 'Next');
    const nextSpan = document.createElement('span');
    nextSpan.setAttribute('aria-hidden', 'true');
    nextSpan.innerText = '»';
    nextLink.appendChild(nextSpan);
    nextLi.appendChild(nextLink);
    paginationContainer.appendChild(nextLi);
  }

  // Simulate fetching total number of cards (replace this with your logic)
  simulateFetchData() {
    setTimeout(() => {
      this.totalCards = 8; // Set the total number of cards
      this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
      this.createCards();
      this.updatePaginationLinks();
    }, 500);
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.simulateFetchData();
    });
  }
}

export default Pagination;
