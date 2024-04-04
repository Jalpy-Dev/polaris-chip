import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class haxcmsPartyUI extends DDD {
    static get tag() {
        return 'haxcms-party-ui';
    }

    constructor() {
        super();
        this.ownerName = "you1234";
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
        font-family: var(--frame-font-family, "Press Start 2P"), system-ui;
      }
      
      .frame {
        padding: var(--ddd-spacing-2);
        text-align: center;
        height: 100%;
      }

      .frame-title {
        color: var(--ddd-theme-default-beaverBlue);
      }

      .add-to-party-input input, .add-to-party-input button {
        height: var(--ddd-spacing-10);
      }

      .party-members {
        display: inline-flex;
        align-items: center;
        overflow-x: scroll;
        width: 90%;
      }

      .slot {
        margin: var(--ddd-spacing-2);
        width: 140px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 2px solid black;
        margin-right: var(--ddd-spacing-5);
      }

      .slot p {
        margin: 0;
        color: var(--ddd-theme-default-beaverBlue);
        font-size: .7rem;
        overflow: scale;
      }

      .slot button {
        width: 1rem;
        height: 1rem;
        border: 0;
        padding: 2px;
        border-radius: 50%;
        background-color: var(--ddd-theme-default-discoveryCoral);
        color: white;
        font-size: 10px;
        font-weight: bolder;
        align-self: flex-end;
        text-align: center;
      }

      .slot button:hover, .slot button:focus {
        background-color: var(--slot-button-hover, red);
      }

      .save-cancel-buttons {
        margin-top: var(--ddd-spacing-4);
        height: var(--ddd-spacing-25);
      }

      .save-cancel-buttons button {
        width: 20%;
        height: 80%;
        font-size: 15px;
      }

      button {
        background-color: var(--ddd-theme-default-limestoneLight);
        border: 2px solid black;
        font-weight: bolder;
      }

      button:focus, button:hover {
        background-color: var(--ddd-theme-default-limestoneGray);
        transition: .4s;
      }

      rpg-character {
        width: 120px;
        padding-bottom: 10px;
      }
    `];
  }

    addUser() {
      // Get current user text input
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
        // If it does exist, prompt user and reset input field
        alert("User already in party");
        this.shadowRoot.querySelector('.input-text').value = "";
        return;
      }

      // If they don't exist, add user to party
      this.partyMembers = [...this.partyMembers, userid];

      // Reset input field once added
      this.shadowRoot.querySelector('.input-text').value = "";
    }

    deleteUser(e) {
      // Get clicked button's "seed" attribute (Deleted characters username)
      const user = e.target.closest('button').getAttribute('seed');

      // Find index of username
      const index = this.partyMembers.indexOf(user);

      // Confirm we want to delete user
      if (confirm("Delete " + user + " from your party?")) {
        // Delete username from party
        this.partyMembers.splice(index, 1)
      }

      // Refresh view
      this.requestUpdate();
    }

    cancel() {
      // Do something eventually
      // But for now just reset party list to empty
      if (confirm("Are you sure you'd like to erase your party from existance?")) {
        this.partyMembers = [];
      }
    }

    save() {
      // Check if party is empty
      if (this.partyMembers.length == 0) {
        alert("Your party is empty....")
      } else {
        this.makeItRain();
        alert("Added " + this.partyMembers + " to your party!");
        console.log(this.partyMembers);
      }
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
      // Get current user input
      const inputValue = e.target.value;
      // regex cleanup
      const scrubValue = inputValue.replace(/[^a-zA-Z0-9]+$/g, "");
      // update user input with scrubbed data
      e.target.value = scrubValue.slice(0, 10);
    }

    checkEnter(e) {
      const keypress = e.key;

      if (keypress == "Enter") {
        console.log(keypress);
        this.addUser();
      }
    }

    render() {
        return html`
            <confetti-container id="confetti">
              <div class="frame">
                  <h1 class="frame-title">Add Party Member</h1>

                  <div class="add-to-party-input">
                      <input class="input-text" type="text" placeholder="abc123" @input="${this.inputScrub}" @keypress="${this.checkEnter}">
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
                          <button class="delete-user" @click="${this.deleteUser}" seed="${userid}">X</button>
                          <rpg-character seed=${userid} @click="${this.deleteUser}"></rpg-character>
                          <p>${userid}</p>
                        </div>
                    `)}
                  </div>
                  <div class="save-cancel-buttons">
                    <button @click="${this.save}">Save</button>
                    <button @click="${this.cancel}">Erase</button>
                  </div>
                </div>
              </confetti-container>
        `;
    }

  static get properties() {
    return {
      ...super.properties,
      ownerName: { type: String, attribute: "owner-name" },
      partyMembers: { type: Array, reflect: true, attribute: "party-members"}
    }
  }
}
globalThis.customElements.define(haxcmsPartyUI.tag, haxcmsPartyUI);