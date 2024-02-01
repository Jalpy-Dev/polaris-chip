import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "My card";
    this.imageLink = "https://github.com/pennstate.png";
    this.cardText = "Default card text";
    this.buttonLink = "#";
    this.buttonText = "Default";
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .card-wrapper {
        display: flex;
      }

      .card {
        width: 400px;
        background-color: turquoise;
        border-style: dashed;
        border-radius: 10px;
        margin: 16px;
      }

      .card p {
        width: 90%;
        text-align: center;
        margin-left: 5%;
      }

      .card img {
        width: 350px;
        padding: 0px 25px;
      }

      .card h1 {
        width: 100%;
        text-align: center;
      }

      a {
        text-decoration: none;
      }

      .btn-wrapper {
        background-color: orange;
        padding: 10px;
        margin: 64px;
      }

      .btn {
        background-color: blue;
        color: white;
        font-size: 20px;
        border-radius: 10%;
        padding: 16px;
        margin: 2px 75px;
      }

      .btn:focus,
      .btn:hover {
        background-color: green;
      }

    `;
  }

  render() {
    return html`
    <div class="card-wrapper">
      <div class="card">
        <h1 class="card-title">${this.title}</h1>
        <img class="card-image" src=${this.imageLink} />
        <p>${this.cardText}</p>
        <div class="btn-wrapper">
          <a href=${this.buttonLink}>
            <button class="btn">
              <p>${this.buttonText}</p>
            </button>
          </a>
        </div>
      </div>
    </div>
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      imageLink: { type: String },
      cardText: { type: String },
      buttonLink: { type: String },
      buttonText: { type: String },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
