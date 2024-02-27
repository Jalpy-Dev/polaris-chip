import { LitElement, html, css } from 'lit';

export class CampusAlert extends LitElement {

    static get tag() {
        return 'campus-alert';
    }

    constructor() {
        super();
        this.alertType = "status";
        this.message = "Default alert message";
        this.alertClosed = false;
        this.title = "Default Title";
        this.date = "January 1, 2024";
        this.time = "12:01 AM"
    }

    static get styles() {
        return css`
            :host {
                /* display: flex; */
                width: 100%;
                
            }

            .status {
                padding: 4%;
                display: inline-flex;
                align-items: center;
                justify-content: space-between;
                width: 92%;
                background-color: #d0eceb;
                font-weight: bolder;
            }

            .alert-collapsed {
                padding: 4%;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 97%;
                background-color: #d0eceb;
                font-weight: bolder;
                height: 30px;
                padding: 15px;
            }

            .alert-collapsed .expand-arrow {
                height: 35px;
                margin-left: 2%;
            }

            .alert-collapsed h1 {
                margin-left: 2%;
                font-size: 1rem;
            }

            .alert-collapsed .alert-icon {
                margin: 0;
                height: 35px;
            }

            .alert-text {
                display: inline-flex;
                width: 50%;
            }

            .alert-icon {
                height: 60px;
                border: 5px solid black;
                border-radius: 50%;
                margin-right: 5%;
            }

            .alert-text {
                height: 200px;
                width: 60%;
                position: relative;
                color: black;
                display: flex;
                align-items: center;
            }

            .alert-text p, .alert-text .alert-icon {
                z-index: 1;
                margin-left: 8%;
            }

            .alert-text p {
                width: 70%;
                margin-left: 1%;
                font-weight: normal;
            }

            .triangle {
                border-color: transparent transparent white;
                bottom: 50px;
                left: -15px;
                position: absolute;
                border-style: solid;
                border-width: 0 50px 50px;
            }

            .alert-text .polygon {
                background-color: white;
                position: absolute;
                top: 0px;
                /* right: 20px; */
                /* bottom: 0; */
                /* left: -100; */
                transform: skew(21deg,0);
                left: 0px;
                width: 105%;
                height: 200px;
            }

            button.toggle-alert {
                height: 40px;
                font-size: 20px;
                border-style: none;
                background-color: transparent;
            }

            .hide-alert {
                display: none;
            }
        `;
    }

    toggleAlert() {
        if (this.alertClosed) {
            this.alertClosed = false;
        } else {
            this.alertClosed = true;
        }
    }

    render() {
        return html`
        <div class="status ${this.alertClosed ? css`hide-alert` : css}">
            <div class="date-time">
                <p>${this.date}</p>
                <p>${this.time}</p>
            </div>
            <div class="alert-text">
                <svg class="alert-icon" viewBox="0 0 82 82">
                    <g fill="#000321" data-name="Group 3036">
                        <path d="M35.232 54.188h10.381v7.786H35.232z" data-name="Rectangle 3589"></path>
                        <path d="M43.378 48.203h-5.854l-3.21-23.669v-4.685h11.81v4.681z" data-name="Path 2763"></path>
                    </g>
                </svg>
                <p><slot>${this.message}</slot></p>
                <div class="triangle"></div>
                <div class="polygon"></div>
            </div>
            <button class="toggle-alert" @click="${this.toggleAlert}">X <b>Close</b></button>
        </div>

        <div class="alert-collapsed ${this.alertClosed ? css : css`hide-alert`}">
            <svg class="alert-icon" viewBox="0 0 82 82">
                <g fill="#000321" data-name="Group 3036">
                    <path d="M35.232 54.188h10.381v7.786H35.232z" data-name="Rectangle 3589"></path>
                    <path d="M43.378 48.203h-5.854l-3.21-23.669v-4.685h11.81v4.681z" data-name="Path 2763"></path>
                </g>
            </svg>
            <h1>${this.title}</h1>
            <button class="toggle-alert" @click="${this.toggleAlert}"><svg class="expand-arrow" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg></button>
        </div>
        `;
    }

    static get properties() {
        return {
            alertType: { type: String, reflect: true, attribute: "alert-type" },
            title: { type: String },
            message: { type: String },
            date: { type: String },
            time: { type: String },
            alertClosed: { type: Boolean, reflect: true }
        };
    }
}

globalThis.customElements.define(CampusAlert.tag, CampusAlert);
