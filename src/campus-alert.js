import { LitElement, html, css } from 'lit';

export class CampusAlert extends LitElement {

    static get tag() {
        return 'campus-alert';
    }

    constructor() {
        super();
        this.alertType = "status";
        this.message = "Default alert message";
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
            }

            .alert-text {
                display: inline-flex;
                width: 50%;
            }

            .alert-icon {
                height: 50px;
                border: 5px solid black;
                border-radius: 50%;
                margin-right: 5%;
            }

            button.close-alert {
                height: 40px;
                font-size: 20px;
                border-style: none;
                background-color: transparent;
            }
        `;
    }

    render() {
        return html`
        <div class="status">
            <div class="date-time">
                <p>January 1, 2024</p>
                <p>12:01 AM</p>
            </div>
            <div class="alert-text">
                <svg class="alert-icon" viewBox="0 0 82 82">
                    <g fill="#000321" data-name="Group 3036">
                        <path d="M35.232 54.188h10.381v7.786H35.232z" data-name="Rectangle 3589"></path>
                        <path d="M43.378 48.203h-5.854l-3.21-23.669v-4.685h11.81v4.681z" data-name="Path 2763"></path>
                    </g>
                </svg>
                <p><slot>${this.message}</slot></p>
            </div>
            <button class="close-alert">X <b>Close</b></button>
        </div>
        `;
    }

    static get properties() {
        return {
            alertType: { type: String, reflect: true, attribute: "alert-type" },
            message: { type: String },
        };
    }
}

globalThis.customElements.define(CampusAlert.tag, CampusAlert);
