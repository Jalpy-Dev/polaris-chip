import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class haxcmsPartyUI extends DDD {
    static get tag() {
        return 'haxcms-party-ui';
    }

    constructor() {
        super();
        this.ownerName = "rudolphtherednosereindeer";
        this.party1 = "";
        this.party2 = "";
        this.party3 = "";
        this.party4 = "";
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
        /* color: var(--ddd-theme-default-keystoneYellow); */
      }

      .slot {
        /* width: var(--m-24); */
        border-bottom: 2px solid black;
      }

      .party-members {
        display: inline-flex;
      }

      .slot {
        margin: var(--ddd-spacing-2);
      }

      .hide-character {
        visibility: hidden;
      }
    `];
  }

    isAdded(partyMember) {
        if (partyMember != "") {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        return html`
            <div class="frame">
                <h1 class="frame-title">Add Party Member</h1>

                <div class="add-to-party-input">
                    <form>
                        <label for="fname">@</label>
                        <input type="text" id="username" name="username">
                        <input type="submit" value="Add">
                    </form>
                </div>

                <div class="party-members">
                    <div class="slot">
                        <rpg-character seed="${this.ownerName} walking"></rpg-character></div>
                    <div class="slot">
                        <div class="character-box ${this.isAdded(this.party1) ? `` : `hide-character`}">
                            <rpg-character seed="${this.party1} walking"></rpg-character>
                        </div>
                    </div>
                    <div class="slot">
                        <div class="character-box ${this.isAdded(this.party2) ? `` : `hide-character`}">
                            <rpg-character seed="${this.party2} walking"></rpg-character>
                        </div>
                    </div>
                    <div class="slot">
                        <div class="character-box ${this.isAdded(this.party3) ? `` : `hide-character`}">
                            <rpg-character seed="${this.party3} walking"></rpg-character>
                        </div>
                    </div>
                    <div class="slot">
                        <div class="character-box ${this.isAdded(this.party4) ? `` : `hide-character`}">
                            <rpg-character seed="${this.party4} walking"></rpg-character>
                        </div>
                    </div>
            </div>
        `;
    }

  static get properties() {
    return {
      ...super.properties,
      ownerName: { type: String },
      party1: { type: String, reflect: true },
      party2: { type: String, reflect: true },
      party3: { type: String, reflect: true },
      party4: { type: String, reflect: true }
    }
  }
}
globalThis.customElements.define(haxcmsPartyUI.tag, haxcmsPartyUI);