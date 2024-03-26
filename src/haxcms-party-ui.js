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
        background-color: var(--ddd-theme-default-slateMaxLight);
      }
      .frame {
        padding: var(-ddd-spacing-5);
        margin: var(--ddd-spacing-2) var(--ddd-spacing-0);
        text-align: center;
        /* color: var(--ddd-theme-default-keystoneYellow); */
      }

      .slot {
        /* width: var(--m-24); */
        border-bottom: 2px solid black;
      }

      .party-members {
        display: inline-flex;
        overflow: scroll;
        width: 90%;
        height: 20%;
      }

      .slot {
        margin: var(--ddd-spacing-2);
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .slot p {
        margin: 0;
        padding: 0;
        color: var(--ddd-theme-default-beaverBlue);
      }

      .slot .delete-user {
        width: 2em;
        position: relative;
        left: 80%;
        top: 10%;
      }
    `];
  }

    addUser() {
      const inputValue = this.shadowRoot.querySelector('.input-text').value;

      // Check if user already exists


      // If they dont exist, continue
      const user = {
        userid: inputValue,
      }

      this.partyMembers = [...this.partyMembers, user];
      console.log(this.partyMembers);
    }

    targetClicked(e) {
      // what item bubbled the event
      console.log(e.target);

      const user = e.target.closest('button').getAttribute('seed');

      const index = this.partyMembers.indexOf(user);
      this.partyMembers.splice(index)

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

    render() {
        return html`
            <confetti-container id="confetti">
              <div class="frame">
                  <h1 class="frame-title">Add Party Member</h1>

                  <div class="add-to-party-input">
                    <input class="input-text" type="text" placeholder="abc123">
                    <button @click="${this.addUser}">Add</button>
                  </div>

                  <div class="party-members">
                      <div class="slot">
                          <rpg-character seed="${this.ownerName}" walking></rpg-character>
                          <p>${this.ownerName}</p>
                      </div>
                      ${this.partyMembers.map((user) => html`
                        <div class="slot">
                          <button class="delete-user" @click="${this.targetClicked}" seed="${user.userid}">X</button>
                          <rpg-character seed=${user.userid} walking @click="${this.targetClicked}"></rpg-character>
                          <p>${user.userid}</p>
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