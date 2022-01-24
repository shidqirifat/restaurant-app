class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    let searchValue = this.shadowDOM.getElementById("search-input").value;
    this.shadowDOM.getElementById("search-input").value = ""
    return searchValue;
  }

  render() {
    this.shadowDOM.innerHTML = `
        <style>
          .search-container {
            text-align: center;
            margin-top: 40px;
            margin-bottom: 3rem;
          }
          .search-container input {
            height: 2.2rem;
            margin-right: 1rem;
            width: 300px;
            border: 1px solid #343a40;
            border-radius: 4px;
          }
          .search-container button {
            height: 2.2rem;
            width: 100px;
            border: 1px solid #343a40;
            background: #fdefef;
            color: #343a40;
            border-radius: 4px;
          }
        </style>

        <form class="search-container">
          <input type="search" id="search-input" name="search" />
          <button type="submit" id="search-button">Cari</button>
        </form>
      `;

    this.shadowDOM.getElementById("search-button").addEventListener("click", this._clickEvent);
  }
}

customElements.define("search-bar", SearchBar);