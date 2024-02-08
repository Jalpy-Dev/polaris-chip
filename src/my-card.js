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
    this.fancy = false;
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }

      :host([fancy]) {
        display: block;
        background-color: pink;
        border: 2px solid fuchsia;
        box-shadow: 10px 5px 5px red;
      }

      details summary {
        text-align: left;
        font-size: 20px;
        padding: 8px 0;
      }

      details[open] summary {
        font-weight: bold;
      }
      
      details div {
        border: 2px solid black;
        text-align: left;
        padding: 8px;
        height: 70px;
        overflow: auto;
      }

      .card {
        width: 400px;
        height: 700px;
        background-color: turquoise;
        border-style: dashed;
        border-radius: 10px;
        margin: 16px;
        padding: 16px;
      }

      .card p {
        width: 90%;
        text-align: center;
        margin-left: 5%;
      }

      .card img {
        width: 350px;
        padding: 0px 2%;
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
        width: 50%;
        padding: 2%;
        margin: 5% 20%;
      }

      .btn {
        background-color: blue;
        color: white;
        font-size: 20px;
        border-radius: 10%;
        margin: 0px 25%;
        width: 50%;
      }

      .btn:focus,
      .btn:hover {
        background-color: green;
      }

      .change-color {
        background-color: cornflowerblue;
      }
    `;
  }

  // put this anywhere on the MyCard class; just above render() is probably good
  openChanged(e) {
    console.log(e.newState);
    if (e.newState === "open") {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }

  render() {
    return html`
      <div class="card">
        <h1 class="card-title">${this.title}</h1>
        <img class="card-image" src=${this.imageLink} />
        <!-- put this in your render method where you had details -->
        <details ?open="${this.fancy}" @toggle="${this.openChanged}">
          <summary>Details</summary>
          <div>
            <slot><p>${this.cardText}</p></slot>
          </div> 
        </details>
        <div class="btn-wrapper">
          <a href=${this.buttonLink}>
            <button class="btn">
              <p>${this.buttonText}</p>
            </button>
          </a>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      title: { type: String, reflect: true, attribute: "card-title" },
      imageLink: { type: String, reflect: true },
      cardText: { type: String },
      buttonLink: { type: String },
      buttonText: { type: String },
      fancy: { type: Boolean, reflect: true },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
