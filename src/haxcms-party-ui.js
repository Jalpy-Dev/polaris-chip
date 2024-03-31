import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class haxcmsPartyUI extends DDD {
    static get tag() {
        return 'haxcms-party-ui';
    }

    constructor() {
        super();
        this.ownerName = "afg2837";
        this.partyMembers = [];
    }

  static get styles() {
    return [
      super.styles,
      css`
      :host {
        display: block;
        background-color: var(--ddd-theme-default-slateLight);
      }

      *, h1 {
        font-family: "Press Start 2P", system-ui;
      }
      
      .frame {
        padding: var(-ddd-spacing-5);
        margin: var(--ddd-spacing-2) var(--ddd-spacing-0);
        text-align: center;
        height: 100%;
        padding: 1%;
        /* color: var(--ddd-theme-default-keystoneYellow); */
      }

      .party-members {
        display: inline-flex;
        overflow-x: scroll;
        width: 90%;
        height: 50%;
      }

      .slot {
        margin: var(--ddd-spacing-2);
        display: flex;
        flex-direction: column;
        height: 75%;
        border-bottom: 2px solid black;
        margin: 0;
        margin-right: 5%;
        padding: 0;
        margin-top: 2%;
      }

      .slot p {
        margin: 0;
        color: var(--ddd-theme-default-beaverBlue);
        font-size: 15px;
      }

      .slot button {
        width: 1rem;
        height: 1rem;
        border: 0;
        border-radius: 50%;
        background-color: var(--ddd-theme-default-discoveryCoral);
        color: white;
        font-size: 10px;
        font-weight: bolder;
        align-self: flex-end;
        /* position: relative;
        left: 4em;
        top: 1em; */
      }

      .slot button:hover {
        background-color: red;
      }

      .save-cancel-buttons {
        margin-top: 2%;
      }
    `];
  }

    addUser() {
      const inputValue = this.shadowRoot.querySelector('.input-text').value;

      // Cleanup input and assign to new variable
      var userid = "";
      userid = inputValue.toLowerCase();
      userid = userid.trim();

      // Validate input / make sure there IS a input
      if (userid == "") {
        return;
      }

      // Check if user already exists
      if (this.partyMembers.indexOf(userid) != -1) {
        return;
      }

      // If they dont exist, continue
      this.partyMembers = [...this.partyMembers, userid];
      console.log(this.partyMembers);
    }

    targetClicked(e) {
      // what item bubbled the event
      console.log(e.target);

      const user = e.target.closest('button').getAttribute('seed');

      const index = this.partyMembers.indexOf(user);
      this.partyMembers.splice(index, 1)

      this.requestUpdate();
    }

    cancel() {
      // Do something eventually
      // But for now just reset party list to empty
      this.partyMembers = [];
    }

    save() {
      // fireworks
      this.makeItRain();
    }

    makeItRain() {
        import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
            (module) => {
                setTimeout(() => {
                    this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
                }, 0);
            }
        );
    }

    inputScrub(e) {
      const inputValue = e.target.value;
      const scrubValue = inputValue.replace(/[^a-zA-Z0-9]+$/g, "");
      e.target.value = scrubValue.slice(0, 10);
    }

    render() {
        return html`
            <confetti-container id="confetti">
              <div class="frame">
                  <h1 class="frame-title">Add Party Member</h1>

                  <div class="add-to-party-input">
                      <input class="input-text" type="text" placeholder="abc123" @input="${this.inputScrub}">
                      <button type="submit" @click="${this.addUser}">Add</button>
                  </div>

                  <div class="party-members">
                      <div class="slot">
                          <button style="visibility: hidden;" class="delete-user">X</button>
                          <rpg-character seed="${this.ownerName}"></rpg-character>
                          <p>${this.ownerName}</p>
                      </div>
                      ${this.partyMembers.map((userid) => html`
                        <div class="slot">
                          <button class="delete-user" @click="${this.targetClicked}" seed="${userid}">X</button>
                          <rpg-character seed=${userid} @click="${this.targetClicked}"></rpg-character>
                          <p>${userid}</p>
                        </div>
                    `)}
                  </div>
                  <div class="save-cancel-buttons">
                    <button @click="${this.save}">Save</button>
                    <button @click="${this.cancel}">Cancel</button>
                  </div>
                </div>
              </confetti-container>
        `;
    }

  static get properties() {
    return {
      ...super.properties,
      ownerName: { type: String },
      partyMembers: { type: Array, reflect: true }
    }
  }
}
globalThis.customElements.define(haxcmsPartyUI.tag, haxcmsPartyUI);