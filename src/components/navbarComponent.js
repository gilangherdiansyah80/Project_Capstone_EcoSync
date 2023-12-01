class navbarCustom extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid px-lg-5">
                <a href="#" class="navbar-brand">
                    <img class="w-75" src="./image/logo.png" alt="...">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse flex-grow-0" id="navbarNav">
                    <ul class="navbar-nav gap-4">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./cuaca.html">Cuaca</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Bencana alam</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">About Us</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        `;
    }
}

customElements.define('navbar-custom', navbarCustom);
