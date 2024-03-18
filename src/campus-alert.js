import { LitElement, html, css } from 'lit';

export class CampusAlert extends LitElement {

    static get tag() {
        return 'campus-alert';
    }

    constructor() {
        super();
        this.alertType = "status";
        this.message = "Default alert message";
        this.title = "Default Title";
        this.date = "January 1, 2024";
        this.time = "12:01 AM";
        this.sticky = false;

        if (localStorage.getItem("campus-alert-closed") == 'true') {
            this.alertClosed = true;
        } else {
            this.alertClosed = false;
        }
    }
    static get styles() {
        return css`
            /* :host {
                
            } */

            :host([alert-type="notice"]) .open-alert, :host([alert-type="notice"]) .alert-collapsed {
                --shape-bg-color: white;
                --outside-bg-color: #d0eceb;
                --collapsed-bg-color: #d0eceb;
                --alert-text-color: black;
            }

            :host([alert-type="warning"]) .open-alert, :host([alert-type="warning"]) .alert-collapsed {
                --shape-bg-color: #ffd100;
                --outside-bg-color: #bf8226;
                --collapsed-bg-color: #bf8226;
                --alert-text-color: black;
            }

            :host([alert-type="alert"]) .open-alert, :host([alert-type="alert"]) .alert-collapsed {
                --shape-bg-color: crimson;
                --outside-bg-color: white;
                --collapsed-bg-color: crimson;
                --alert-text-color: white;
            }

            .open-alert {
                padding: 4%;
                display: inline-flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                font-weight: bolder;
                height: 150px;
                background-color: var(--outside-bg-color);
                margin: 0;
                padding: 0;
            }

            .date-time {
                padding-left: 1%;
            }

            .alert-collapsed {
                padding: 4%;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                font-weight: bolder;
                height: 30px;
                padding: 15px;
                background-color: var(--collapsed-bg-color);
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
                height: 25%;
                border: 5px solid black;
                border-radius: 50%;
                margin-right: 5%;
            }

            .alert-text {
                height: 100%;
                width: 60%;
                position: relative;
                color: var(--alert-text-color);
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
                border-color: transparent transparent var(--shape-bg-color);
                bottom: 50px;
                left: -15px;
                position: absolute;
                border-style: solid;
                border-width: 0 50px 50px;
            }

            .alert-text .polygon {
                background-color: var(--shape-bg-color);
                position: absolute;
                top: 0px;
                transform: skew(21deg,0);
                left: 0px;
                width: 105%;
                height: 100%;
            }

            @media screen and (max-width: 900px) {
                .alert-text .polygon {
                    background-color: var(--shape-bg-color);
                }
            }

            button.toggle-alert {
                height: 40px;
                font-size: 20px;
                border-style: none;
                background-color: transparent;
                padding-right: 1%;
            }

            @media screen and (max-width: 900px) {
                :host([alert-type="alert"]) .open-alert, :host([alert-type="alert"]) .alert-collapsed {
                --shape-bg-color: crimson;
                --outside-bg-color: white;
                --collapsed-bg-color: crimson;
                --alert-text-color: black;
            }

                .open-alert {
                    padding: 4%;
                    display: flex;
                    align-items: center;
                    flex-direction: inline;
                    justify-content: space-between;
                    width: 100%;
                    font-weight: bolder;
                    height: 200px;
                    background-color: var(--outside-bg-color);
                    margin: 0;
                    padding: 0;
                }

                .alert-text .polygon {
                    display: none;
                }

                .alert-text .triangle {
                    display: none;
                }
            }

            .hide-alert {
                display: none;
            }

            .sticky-alert {
                position: sticky;
                top: 0;
            }
        `;
    }

    toggleAlert() {
        if (this.alertClosed) {
            this.alertClosed = false;
            localStorage.removeItem("campus-alert-closed");
        } else {
            this.alertClosed = true;
            localStorage.setItem("campus-alert-closed", true);
        }
    }

    render() {
        return html`
        <div class="open-alert ${this.alertClosed ? `hide-alert` : ``} ${this.sticky ? css`sticky-alert` : css}">
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

        <div class="alert-collapsed ${this.alertClosed ? `` : `hide-alert`} ${this.sticky ? css`sticky-alert` : css}">
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
            alertClosed: { type: Boolean, reflect: true },
            sticky: { type: Boolean, reflect: true }
        };
    }
}

globalThis.customElements.define(CampusAlert.tag, CampusAlert);
