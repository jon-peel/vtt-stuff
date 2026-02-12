import firstLoadSplash from "./firstLoadSplash.js";
import { StatblockImporter } from "./statblock-importer.js";

const formatSignedNumber = function (value) {
  const num = Number(value);
  if (Number.isNaN(num)) return '';
  if (num > 0) return `+${num}`;
  if (num < 0) return `-${Math.abs(num)}`;
  if (num === 0) return '0';
  return '';
};

Hooks.once("init", () => {
  //register display initial load splash message setting
  game.settings.register("ose-advancedfantasytome", "firstLoadSplash", {
    name: "firstLoadSplash",
    scope: "world",
    type: Boolean,
    default: false,
    config: false
  });
  //register namespace
  window.OSE = window.OSE || {};
  OSE.util = OSE.util || {};
  OSE.data = OSE.data || {};

  Handlebars.registerHelper('formatSignedNumber', formatSignedNumber);

  Handlebars.registerHelper('thac0String', function (value) {
    const num = Number(value);
    if (Number.isNaN(num)) return value;
    const thac0 = num;
    const acVal = 19 - thac0;
    return `${thac0} [${formatSignedNumber(acVal)}]`;
  });

  game.settings.register("ose-advancedfantasytome", "monster-importer", {
    name: "Enable Monster Statblock Importer",
    hint: "Adds a button to the Actor Sidebar to import OSE monster Statblocks from PDFs.",
    default: false,
    scope: "world",
    type: Boolean,
    requiresReload: true,
    config: true,
  });

  Hooks.call("OSE Initialized");
});

//add ose class options to character builder
Hooks.once("OseCharacterClassAdded", async () => {
  if (!game.user.isGM) {
    return;
  }

  const classArr = await game.settings.get("osr-character-builder", "externalClasses");
  classArr.push({
      name: "classic-fantasy",
      menu: "Classic Fantasy",
      default: false,
      pack: "ose-advancedfantasytome.abilities",
      classes: OSE.data.classes.classic
    },
    {
      name: "advanced-fantasy",
      menu: "Advanced Fantasy",
      default: false,
      pack: "ose-advancedfantasytome.abilities",
      classes: OSE.data.classes.advanced
    });
  await game.settings.set("osr-character-builder", "externalClasses", classArr);
});

//load splash if first load
Hooks.once("ready", async () => {
  if (game.user.isGM && !game.settings.get("ose-advancedfantasytome", "firstLoadSplash")) {
    firstLoadSplash();
  }

  const classicFantasyCompendium = game.modules.get("classicfantasycompendium");
  if (game.user.isGM && classicFantasyCompendium?.active) {
    foundry.applications.api.DialogV2.prompt({
      window: { title: "Module Incompatibility" },
      content: `The "${classicFantasyCompendium.title}" module is currently enabled. You should disable this module as the "${game.modules.get("ose-advancedfantasytome")?.title || "Advanced"}" module includes all features from the free module.`
    });
  }
});

Hooks.on("osrItemShopActive", async () => {
  if (!game.user.isGM) {
    return;
  }

  let curData = await game.settings.get("osrItemShop", "sourceList");
  let itemList = await game.settings.get("osrItemShop", "itemList");

  let newList = itemList.concat(OSE.itemData);
  if (!curData.find((i) => i.header === "Old School Essentials")) {
    curData.push({
      header: "Old School Essentials",
      data: OSE.itemData,
      options: [
        {
          name: "Items",
          source: "OSE",
          itemTypes: [`weapons`, `armor`, `equipment`, `ammunition`]
        }
      ]
    });
    await game.settings.set("osrItemShop", "itemList", newList);
    await game.settings.set("osrItemShop", "sourceList", curData);
  }
});

Hooks.on('renderActorDirectory', (_app, html) => {
  if (!game.user.can('ACTOR_CREATE')) return;
  if (!game.settings.get("ose-advancedfantasytome", "monster-importer")) return;
  const root = html instanceof HTMLElement ? html : html[0];
  if (!root) return;

  const importButton = document.createElement('button');
  importButton.type = 'button';
  importButton.classList.add('import-statblock');
  importButton.innerHTML = '<i class="fas fa-file-import"></i> Import OSE Monster';
  importButton.addEventListener('click', () => {
    new StatblockImporter().render({ force: true });
  });

  let headerActions = root.querySelector('.header-actions');
  if (headerActions) {
    headerActions.appendChild(importButton);
  }
});

