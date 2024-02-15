import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement {

    static get tag() {
        return 'counter-app';
    }

    constructor() {
        super();
        this.counter = 10;
        this.min = 0;
        this.max = 20;
        this.hitExtreme = "";
    }

    static get styles() {
        return css`
            :host {
                display: inline-flex;
                margin: 25px;
            }

            .counter {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 600px;
                height: 400px;
                background-color: white;
            }

            .current-count {
                font-size: 125px;
                align-self: center;
                margin: 10%;
            }

            .buttons {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }

            .buttons button {
                width: 25%;
                margin-left: 4%;
                margin-right: 4%;
                padding: 25px;
                background-color: darkgoldenrod;
                font-size: 25px;
            }

            :host([counter="18"]) .counter {
                color: lightsalmon;
            }

            :host([counter="21"]) .counter {
                color: green;
            }

            .hit-extreme {
                color: red;
            }

            .buttons button:hover, .buttons button:focus {
                background-color: darkorange;
            }
        `;
    }

    increase() {
        if (this.counter < this.max) {
            this.counter++;
        }
    }

    decrease() {
        if (this.counter > this.min) {
            this.counter--;
        }
    }



    render() {
        return html`
            <div class="counter">
                <h1 class="current-count ${this.hitExtreme}">${this.counter}</h1>
                <div class="buttons">
                    <button @click="${this.decrease}">-1</button>
                    <button @click="${this.increase}">+1</button>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            counter: { type: Number, reflect: true, attribute: "counter" },
            min: { type: String, reflect: true, attribute: "min" },
            max: { type: String, reflect: true, attribute: "max" },
        };
    }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);
