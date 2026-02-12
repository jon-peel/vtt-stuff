import { OSEMonsterParser } from "./ose-monster-parser.js";

const {
  ApplicationV2,
  HandlebarsApplicationMixin
} = foundry.applications.api;

/**
 * OSE Monster Statblock Importer.
 */
export class StatblockImporter extends HandlebarsApplicationMixin(ApplicationV2) {
  // Store the current position of the textarea's caret to reapply on render
  #statblockTextCaretPosition = 0;
  #statblockText = "";
  #parsedData = null;

  static DEFAULT_OPTIONS = {
    id: "ose-statblock-importer",
    classes: ["ose", "statblock-importer"],
    position: {
      width: Math.max(640, window.innerWidth * 0.6),
      height: Math.max(480, window.innerHeight * 0.7)
    },
    tag: "form",
    form: {
      handler: StatblockImporter.#onSubmitForm,
      closeOnSubmit: false,
      submitOnChange: true
    },
    window: {
      title: "OSE Monster Importer",
      resizable: true,
      contentClasses: ["standard-form"]
    },
    actions: {
      import: this.#actionImport
    }
  };

  static PARTS = {
    main: {
      template: "modules/ose-advancedfantasytome/templates/statblock-importer-dialog.html"
    }
  };

  async _prepareContext(options) {
    const base = await super._prepareContext(options);
    return {
      ...base,
      statblockText: this.#statblockText,
      parsedData: this.#parsedData,
      treasureLink: this.#parsedData?.system?.details?.treasure?.table ?
        await foundry.applications.ux.TextEditor.implementation.enrichHTML(
          this.#parsedData.system.details.treasure.table,
          { async: true }
        ) :
        ""
    };
  }

  /**
   * Handle form submission
   * @this {StatblockImporter}
   * @param {SubmitEvent} event
   * @param {HTMLFormElement} form
   * @param {FormDataExtended} formData
   */
  static async #onSubmitForm(event, form, formData) {
    event.preventDefault();
    this.#statblockText = formData.object.statblock;
    await this.importStatblock();
  }

  /**
   * Actions performed after any render of the Application.
   * Post-render steps are not awaited by the render process.
   * @param {ApplicationRenderContext} context      Prepared context data
   * @param {RenderOptions} options                 Provided render options
   * @protected
   */
  _onRender(context, options) {
    super._onRender(context, options);

    const textarea = this.element.querySelector("textarea[name=\"statblock\"]");
    textarea.addEventListener("input", StatblockImporter.#handleInputChange.bind(this));
    textarea.selectionStart = textarea.selectionEnd = this.#statblockTextCaretPosition;
  }

  /**
   * Parse current textarea contents.
   */
  parseStatblock() {
    if (!this.#statblockText.trim()) {
      ui.notifications.warn("Enter a Statblock to parse");
      return;
    }

    try {
      this.#parsedData = OSEMonsterParser.parse(this.#statblockText);
      console.log("Parsed Data:", this.#parsedData);
      this.render();
      ui.notifications.info("Parsed successfully");
    } catch (err) {
      ui.notifications.error(`Parse failed: ${err.message}`);
      console.error("OSE Parse Error:", err);
    }
  }

  /**
   * Create an Actor from parsed data.
   * @returns {Promise<Actor|null>} The created Actor, or null on failure.
   */
  async importStatblock() {
    if (!this.#parsedData?.name) {
      ui.notifications.warn("Please parse the Statblock first");
      return null;
    }

    try {
      const actorData = foundry.utils.deepClone(this.#parsedData);
      const items = [...actorData.attacks, ...actorData.abilities];
      delete actorData.attacks;
      delete actorData.abilities;

      console.log("Creating Actor:", actorData);
      const actor = await Actor.implementation.create(actorData);

      // Create items for the actor
      if (items.length) {
        console.log("Adding items:", items);
        await actor.createEmbeddedDocuments("Item", items);
      }

      ui.notifications.success(`Created ${actor.name}`);

      return actor;
    } catch (err) {
      ui.notifications.error(`Import failed: ${err.message}`);
      console.error("OSE Import Error:", err);

      return null;
    }
  }

  /**
   * @this {StatblockImporter}
   * @param {PointerEvent} event
   * @param {HTMLElement} target
   */
  static #actionImport(event, target) {
    event.preventDefault();
    return this.importStatblock();
  }

  /**
   * @this {StatblockImporter}
   * @param {InputEvent} _event
   */
  static #handleInputChange(_event) {
    this.#statblockTextCaretPosition = this.element.querySelector("textarea[name=\"statblock\"]").selectionStart;
    this.#statblockText = _event.currentTarget.value;
    this.parseStatblock();
  }
}
