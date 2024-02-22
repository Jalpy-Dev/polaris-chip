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
        this.hitExtreme = false;
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

    checkExtreme() {
        if (this.counter == this.min || this.counter == this.max) {
            this.hitExtreme = true;
        } else {
            this.hitExtreme = false;
        }
    }


    updated(changedProperties) {
        if (changedProperties.has('counter')) {
            if (this.counter == 21) {
                this.makeItRain();
            }
        }
    }

    makeItRain() {
        // this is called a dynamic import. It means it won't import the code for confetti until this method is called
        // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
        // will only run AFTER the code is imported and available to us
        import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
            (module) => {
                // This is a minor timing 'hack'. We know the code library above will import prior to this running
                // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
                // this "hack" ensures the element has had time to process in the DOM so that when we set popped
                // it's listening for changes so it can react
                setTimeout(() => {
                    // forcibly set the poppped attribute on something with id confetti
                    // while I've said in general NOT to do this, the confetti container element will reset this
                    // after the animation runs so it's a simple way to generate the effect over and over again
                    this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
                }, 0);
            }
        );
    }


    render() {
        this.checkExtreme();
        return html`
            <confetti-container id="confetti">
                <div class="counter">
                    <h1 class="current-count ${this.hitExtreme ? css`hit-extreme` : css}">${this.counter}</h1>
                <div class="buttons">
                    <button ?disabled="${this.min == this.counter}" @click="${this.decrease}">-1</button >
                        <button ?disabled="${this.max == this.counter}" @click="${this.increase}">+1</button >
                    </div >
                </div >
            </confetti-container>
        `;
    }

    static get properties() {
        return {
            counter: { type: Number, reflect: true, attribute: "counter" },
            min: { type: String, reflect: true, attribute: "min" },
            max: { type: String, reflect: true, attribute: "max" },
            hitExtreme: { type: Boolean, reflect: true, attribute: "hit-extreme" }
        };
    }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);
