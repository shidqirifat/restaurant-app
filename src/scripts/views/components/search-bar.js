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
            display: grid;
            grid-template-columns: 0.8fr 0.2fr;
            justify-content: center;
            width: 90%;
            margin-left: auto;
            margin-right: auto;
            text-align: center;
            margin-top: 40px;
            margin-bottom: 3rem;
            height: 36px;
          }
          .search-container input,
            .search-container button {
              width: auto;
            }
          .search-container input {
            height: 100%;
            margin-right: 1rem;
            
            border: 1px solid #343a40;
            border-radius: 4px;
            padding: 0.3rem 0.5rem;
          }
          .search-container button {
            height: 100%;
            width: 100px;
            border: 1px solid #343a40;
            background: #fdefef;
            color: #343a40;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s;
          }
          .search-container button:hover {
            background: #d8d8d8;
          }
          @media screen and (min-width: 320px) {
            .search-container {
              display: block;
            }
            .search-container input {
              width: 300px;
            }
            .search-container button {
              width: 100px;
            }
          }
        </style>

        <form class="search-container">
          <input type="search" id="search-input" name="search" autocomplete="off" />
          <button type="submit" id="search-button">Cari</button>
        </form>
      `;

    this.shadowDOM.getElementById("search-button").addEventListener("click", this._clickEvent);
  }
}

customElements.define("search-bar", SearchBar);