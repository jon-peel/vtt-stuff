Hooks.on('OSE Initialized', () => {

  OSE.util.dungEnc = async function (level) {
    const levelIdx = (num) => {
      if (num >= 8) {
        return 5;
      } else if (num >= 6 && num <= 7) {
        return 4;
      } else if (num >= 4 && num <= 5) {
        return 3;
      } else {
        return num - 1;
      }
    };
    const gm = game.users.contents.filter((u) => u.role === CONST.USER_ROLES.GAMEMASTER).map((u) => u.id);
    const rollTotal = (qty, die, bonus = 0) => {
      let total = 0;
      for (let i = 0; i < qty; i++) {
        total += Math.floor(Math.random() * die + 1);
      }
      return total + bonus;
    };
    const rollOne = Math.floor(Math.random() * 4);
    const rollTwo = Math.floor(Math.random() * 10);
    const dLevel = levelIdx(level);
    // return result
    const result = OSE.dungeonEncTable[rollOne][rollTwo][dLevel];
    let qtyRolled = rollTotal(result.qty, result.die, result.bonus);
    const pack = await game.packs.get('ose-advancedfantasytome.monsters');
    let resultObj = pack.index.find((m) => m.name === result.name);
    let resultID =
      !resultObj
        ? result.name
        : `@Compendium[ose-advancedfantasytome.monsters.${resultObj._id}]{${result.name}}`;
    const msgContent = {
      flavor: `<div style="display:flex; justify-content: center;"><span style='color: red'>Encounter Table Result</span></div>`,
      user: game.user.id,
      speaker: game.user.id,
      content: `
    <div style="display:flex; flex-direction: column; align-items: center;">
      <br/>
      <div><b>Level: ${level}</b></div>
      <br/>
      <div>${qtyRolled} x ${resultID} appear.</div>
      <br/>
      <br/>
    </div>`,
      whisper: gm
    };
    ChatMessage.create(msgContent);
  };

  OSE.util.dungeonEncounter = function () {
    let selectData = ``;
    for (let i = 1; i <= 8; i++) {
      if (i === 8) {
        selectData += `<option value="${i}">Level ${i}+</option>`;
      } else {
        selectData += `<option value="${i}">Level ${i}</option>`;
      }
    }
    let dialogTemplate = `
  <h1> Pick a Dungeon level </h1>
  <br/>
  <div style="display:flex; justify-content: center;">
    <div  style="margin-bottom:15px"><select id="dunLvl" name="dunLvl">${selectData}</select></div>
    </div>`;

    foundry.applications.api.DialogV2.prompt({
      window: { title: 'Dungeon Encounter Table' },
      content: dialogTemplate,
      ok: {
        label: 'Select',
        callback: async (event, button, html) => {
          const level = new foundry.applications.ux.FormDataExtended(button.form)?.object?.dunLvl;

          return OSE.util.dungEnc(level);
        }
      }
    });
  };
  // wild encounter tables

  OSE.util.wildEncounter = function (random = false) {
    const terrainTypes = [
      'Barren, Hills, Mountains',
      'City',
      'Clear, Grasslands',
      'Desert',
      'Forest',
      'Jungle',
      'Lake, River',
      'Ocean, Sea',
      'Settled',
      'Swamp'
    ];
    if (random) {
      const d10 = Math.floor(Math.random() * 10);
      OSE.util.wildEncResult(terrainTypes[d10]);
    } else {
      let terrainOptions = ``;
      for (let type of terrainTypes) {
        terrainOptions += `<option value="${type}">${type}</option>`;
      }
      const dialogTemplate = `
      <h1> Pick a terrain type </h1>
      <br/>
      <div style="display:flex; justify-content: center;">
      <div  style="margin-bottom:15px"><select id="terrainType" name="terrainType">${terrainOptions}</select></div>
      </div>
    `;
      foundry.applications.api.DialogV2.prompt({
        window: { title: "Wilderness Encounter" },
        content: dialogTemplate,
        ok: {
          label: "Select",
          callback: async (event, button, html) => {
            const type = new foundry.applications.ux.FormDataExtended(button.form)?.object?.terrainType;

            OSE.util.wildEncResult(type);
          }
        }
      });
    }
  };
  OSE.util.wildEncResult = function (type) {
    const pack = game.packs.get('ose-advancedfantasytome.monsters');
    const gm = game.users.contents.filter((u) => u.role === CONST.USER_ROLES.GAMEMASTER).map((u) => u.id);
    const d8 = Math.floor(Math.random() * 8);
    const d20 = Math.floor(Math.random() * 20);
    const subTable = OSE.wildEncByTerrain[type][d8];
    const encounterObj = OSE.wildEncSubTables[subTable.table][subTable.type][d20];
    const result = encounterObj.name;

    let resultObj = pack.index.find((m) => m.name === result);
    let resultDisp =
      !resultObj ? result : `@Compendium[ose-advancedfantasytome.monsters.${resultObj._id}]{${result}}`;

    const msgContent = {
      flavor: `<div style="display:flex; justify-content: center;"><span style='color: red'><b>Wilderness Encounter Table Result<b></span></div>`,
      user: game.user.id,
      speaker: game.user.id,
      content: `
    <div style="display:flex; flex-direction: column; align-items: center;">
      <br/>
      <div><b>Terrain Type: ${type}</b></div>
      <br/>
      <div><b>Table Type: ${subTable.type}</b></div>
      <br/>
      <div><b>Result:</b>  ${resultDisp}</div>
      <br/>
      <br/>
    </div>`,
      whisper: gm
    };
    ChatMessage.create(msgContent);
  };

  OSE.dungeonEncTable = [
    [
      [
        { name: 'Acolyte', qty: 1, die: 8, bonus: 0 },
        { name: 'Ankheg  (3hd)', qty: 1, die: 2, bonus: 0 },
        { name: 'Ankheg  (3hd)', qty: 1, die: 6, bonus: 0 },
        { name: 'Ankheg  (5hd)', qty: 1, die: 6, bonus: 0 },
        { name: 'Amphisbaena', qty: 1, die: 3, bonus: 0 },
        { name: 'Black Pudding', qty: 1, die: 1, bonus: 0 }
      ],
      [
        { name: 'Bandit', qty: 1, die: 8, bonus: 0 },
        { name: 'Oil Beetle', qty: 1, die: 8, bonus: 0 },
        { name: 'Ape, White', qty: 1, die: 6, bonus: 0 },
        { name: 'Cave Bear', qty: 1, die: 2, bonus: 0 },
        { name: 'Banshee', qty: 1, die: 1, bonus: 0 },
        { name: 'Chimera', qty: 1, die: 2, bonus: 0 }
      ],
      [
        { name: 'Fire Beetle', qty: 1, die: 8, bonus: 0 },
        { name: 'Berserker', qty: 1, die: 6, bonus: 0 },
        { name: 'Basic Adventurer', qty: 1, die: 4, bonus: 4 },
        { name: 'Blink Dog', qty: 1, die: 6, bonus: 0 },
        { name: 'Basilisk', qty: 1, die: 6, bonus: 0 },
        { name: 'Black Dragon', qty: 1, die: 4, bonus: 0 }
      ],
      [
        { name: 'Oil Beetle', qty: 1, die: 3, bonus: 0 },
        { name: 'Brown Mould', qty: 1, die: 8, bonus: 0 },
        { name: 'Tiger Beetle', qty: 1, die: 6, bonus: 0 },
        { name: 'Caecilia', qty: 1, die: 3, bonus: 0 },
        { name: 'Cave Bear', qty: 1, die: 2, bonus: 0 },
        { name: 'Blue Dragon', qty: 1, die: 4, bonus: 0 }
      ],
      [
        { name: 'Berserker', qty: 1, die: 4, bonus: 0 },
        { name: 'Mountain Lion', qty: 1, die: 4, bonus: 0 },
        { name: 'Brown Mould', qty: 1, die: 10, bonus: 0 },
        { name: 'Caryatid Column', qty: 1, die: 12, bonus: 0 },
        { name: 'Black Pudding', qty: 1, die: 1, bonus: 0 },
        { name: 'Brass Dragon', qty: 1, die: 4, bonus: 0 }
      ],
      [
        { name: 'Brown Mould', qty: 1, die: 3, bonus: 0 },
        { name: 'Coffer Corpse', qty: 1, die: 1, bonus: 0 },
        { name: 'Bugbear', qty: 2, die: 4, bonus: 0 },
        { name: 'Cockatrice', qty: 1, die: 4, bonus: 0 },
        { name: 'Caecilia', qty: 1, die: 3, bonus: 0 },
        { name: 'Bronze Dragon', qty: 1, die: 4, bonus: 0 }
      ],
      [
        { name: 'Brownie', qty: 3, die: 6, bonus: 0 },
        { name: 'Dark Creeper', qty: 1, die: 1, bonus: 0 },
        { name: 'Carcass Crawler', qty: 1, die: 3, bonus: 0 },
        { name: 'Deep One', qty: 3, die: 12, bonus: 0 },
        { name: 'Caryatid Column', qty: 3, die: 6, bonus: 0 },
        { name: 'Copper Dragon', qty: 1, die: 4, bonus: 0 }
      ],
      [
        { name: 'Dark Creeper', qty: 1, die: 1, bonus: 0 },
        { name: 'Wild Dog', qty: 2, die: 6, bonus: 0 },
        { name: 'Coffer Corpse', qty: 1, die: 3, bonus: 0 },
        { name: 'Disenchanter', qty: 1, die: 2, bonus: 0 },
        { name: 'White Dragon', qty: 1, die: 4, bonus: 0 },
        { name: 'Gold Dragon', qty: 1, die: 4, bonus: 0 }
      ],
      [
        { name: 'Wild Dog', qty: 2, die: 6, bonus: 0 },
        { name: 'Elf', qty: 1, die: 4, bonus: 0 },
        { name: 'Dark Creeper', qty: 1, die: 4, bonus: 0 },
        { name: 'Doppelgänger', qty: 1, die: 6, bonus: 0 },
        { name: 'Drider', qty: 1, die: 4, bonus: 0 },
        { name: 'Green Dragon', qty: 1, die: 4, bonus: 0 }
      ],
      [
        { name: 'Dwarf', qty: 1, die: 6, bonus: 0 },
        { name: 'Giant Poisonous Frog', qty: 1, die: 6, bonus: 0 },
        { name: 'Deep One', qty: 2, die: 12, bonus: 0 },
        { name: 'Drow', qty: 3, die: 6, bonus: 0 },
        { name: 'Expert Adventurer', qty: 1, die: 6, bonus: 3 },
        { name: 'Red Dragon', qty: 1, die: 4, bonus: 0 }
      ]
    ],
    [
      [
        { name: 'Giant Mutant Frog', qty: 3, die: 6, bonus: 0 },
        { name: 'Gas Spore', qty: 1, die: 3, bonus: 0 },
        { name: 'Doppelgänger', qty: 1, die: 6, bonus: 0 },
        { name: 'Duergar', qty: 3, die: 6, bonus: 0 },
        { name: 'Flail Snail', qty: 1, die: 4, bonus: 0 },
        { name: 'Silver Dragon', qty: 1, die: 4, bonus: 0 }
      ],
      [
        { name: 'Gas Spore', qty: 1, die: 3, bonus: 0 },
        { name: 'Ghoul', qty: 1, die: 6, bonus: 0 },
        { name: 'Driver Ant', qty: 2, die: 4, bonus: 0 },
        { name: 'Expert Adventurer', qty: 1, die: 6, bonus: 3 },
        { name: 'Ghast', qty: 2, die: 4, bonus: 0 },
        { name: 'Dragonne', qty: 1, die: 1, bonus: 0 }
      ],
      [
        { name: 'Gnome', qty: 1, die: 6, bonus: 0 },
        { name: 'Gnoll', qty: 1, die: 6, bonus: 0 },
        { name: 'Drow', qty: 2, die: 4, bonus: 0 },
        { name: 'Flail Snail', qty: 1, die: 1, bonus: 0 },
        { name: 'Gibbering Mouther', qty: 1, die: 3, bonus: 0 },
        { name: 'Expert Adventurer', qty: 1, die: 6, bonus: 3 }
      ],
      [
        { name: 'Goblin', qty: 2, die: 4, bonus: 0 },
        { name: 'Grey Ooze', qty: 1, die: 1, bonus: 0 },
        { name: 'Duergar', qty: 2, die: 6, bonus: 0 },
        { name: 'Ghast', qty: 1, die: 3, bonus: 0 },
        { name: 'Gorgon', qty: 1, die: 2, bonus: 0 },
        { name: 'Eye of Terror', qty: 1, die: 1, bonus: 0 }
      ],
      [
        { name: 'Green Slime', qty: 1, die: 4, bonus: 0 },
        { name: 'Gullygug', qty: 2, die: 6, bonus: 0 },
        { name: 'Flail Snail', qty: 1, die: 1, bonus: 0 },
        { name: 'Gibbering Mouther', qty: 1, die: 1, bonus: 0 },
        { name: 'Hellhound', qty: 2, die: 4, bonus: 0 },
        { name: 'Ghost', qty: 1, die: 1, bonus: 0 }
      ],
      [
        { name: 'Gullygug', qty: 2, die: 6, bonus: 0 },
        { name: 'Hobgoblin', qty: 1, die: 6, bonus: 0 },
        { name: 'Gargoyle', qty: 1, die: 6, bonus: 0 },
        { name: 'Grey Ooze', qty: 1, die: 1, bonus: 0 },
        { name: 'Hook Beast', qty: 3, die: 6, bonus: 0 },
        { name: 'Hill Giant', qty: 1, die: 4, bonus: 0 }
      ],
      [
        { name: 'Halfling', qty: 3, die: 6, bonus: 0 },
        { name: 'Homunculus', qty: 1, die: 1, bonus: 0 },
        { name: 'Gas Spore', qty: 1, die: 3, bonus: 0 },
        { name: 'Hellhound', qty: 2, die: 4, bonus: 0 },
        { name: 'Hydra', qty: 1, die: 1 },
        { name: 'Stone Giant', qty: 1, die: 2, bonus: 0 }
      ],
      [
        { name: 'Homunculus', qty: 1, die: 1, bonus: 0 },
        { name: 'Lizard Man', qty: 2, die: 4, bonus: 0 },
        { name: 'Gelatinous Cube', qty: 1, die: 1, bonus: 0 },
        { name: 'Hook Beast', qty: 2, die: 6, bonus: 0 },
        { name: 'Krell', qty: 1, die: 3, bonus: 0 },
        { name: 'Amber Golem', qty: 1, die: 1, bonus: 0 }
      ],
      [
        { name: 'Killer Bee', qty: 1, die: 10, bonus: 0 },
        { name: 'Draco', qty: 1, die: 4, bonus: 0 },
        { name: 'Ghast', qty: 1, die: 1, bonus: 0 },
        { name: 'Krell', qty: 1, die: 1, bonus: 0 },
        { name: 'Flame Lizard', qty: 1, die: 4, bonus: 0 },
        { name: 'Bone Golem', qty: 1, die: 1, bonus: 0 }
      ],
      [
        { name: 'Kobold', qty: 4, die: 4, bonus: 0 },
        { name: 'Wererat', qty: 1, die: 4, bonus: 0 },
        { name: 'Harpy', qty: 1, die: 6, bonus: 0 },
        { name: 'Tuatara', qty: 1, die: 2, bonus: 0 },
        { name: 'Subterranean Lizard', qty: 1, die: 6, bonus: 0 },
        { name: 'iron Golem', qty: 1, die: 1, bonus: 0 }
      ]
    ],
    [
      [
        { name: 'Leprechaun', qty: 1, die: 1, bonus: 0 },
        { name: 'Mutoid', qty: 2, die: 6, bonus: 0 },
        { name: 'Crystal Living Statue', qty: 1, die: 6, bonus: 0 },
        { name: 'Wereboar', qty: 1, die: 4, bonus: 0 },
        { name: 'Weretiger', qty: 1, die: 4, bonus: 0 },
        { name: 'Stone Golem', qty: 1, die: 1, bonus: 0 }
      ],
      [
        { name: 'Gecko', qty: 1, die: 3, bonus: 0 },
        { name: 'Mycelian', qty: 1, die: 12, bonus: 0 },
        { name: 'Wererat', qty: 1, die: 8, bonus: 0 },
        { name: 'Werewolf', qty: 1, die: 6, bonus: 0 },
        { name: 'Mind Lasher', qty: 1, die: 4, bonus: 0 },
        { name: 'Black Hag', qty: 1, die: 1, bonus: 0 }
      ],
      [
        { name: 'Mutoid', qty: 1, die: 8, bonus: 0 },
        { name: 'Neanderthal (Caveman)', qty: 1, die: 10, bonus: 0 },
        { name: 'Medium', qty: 1, die: 4, bonus: 0 },
        { name: 'Minotaur', qty: 1, die: 6, bonus: 0 },
        { name: 'Minotaur', qty: 1, die: 6, bonus: 0 },
        { name: 'Hulker', qty: 1, die: 4, bonus: 0 }
      ],
      [
        { name: 'Necrophidius', qty: 1, die: 1, bonus: 0 },
        { name: 'Necrophidius', qty: 1, die: 1, bonus: 0 },
        { name: 'Medusa', qty: 1, die: 3, bonus: 0 },
        { name: 'Ochre Jelly', qty: 1, die: 1, bonus: 0 },
        { name: 'Mummy', qty: 1, die: 4, bonus: 0 },
        { name: 'Hydra', qty: 1, die: 1 }
      ],
      [
        { name: 'Orc', qty: 2, die: 4, bonus: 0 },
        { name: 'Noble', qty: 2, die: 6, bonus: 0 },
        { name: 'Mutoid', qty: 2, die: 8, bonus: 0 },
        { name: 'Otyugh (6hd)', qty: 1, die: 1, bonus: 0 },
        { name: 'Ochre Jelly', qty: 1, die: 1, bonus: 0 },
        { name: 'Lamia', qty: 1, die: 1, bonus: 0 }
      ],
      [
        { name: 'Piercer (1hd)', qty: 3, die: 6, bonus: 0 },
        { name: 'Piercer (2hd)', qty: 3, die: 8, bonus: 0 },
        { name: 'Mycelian', qty: 2, die: 8, bonus: 0 },
        { name: 'Owl Bear', qty: 1, die: 4, bonus: 0 },
        { name: 'Otyugh (6hd)', qty: 1, die: 3, bonus: 0 },
        { name: 'Lurker Above', qty: 1, die: 1, bonus: 0 }
      ],
      [
        { name: 'Poltergeist', qty: 1, die: 3, bonus: 0 },
        { name: 'Pixie', qty: 2, die: 4, bonus: 0 },
        { name: 'Necrophidius', qty: 1, die: 3, bonus: 0 },
        { name: 'Rhagodessa', qty: 1, die: 4, bonus: 0 },
        { name: 'Owl Bear', qty: 1, die: 4, bonus: 0 },
        { name: 'Devil Swine', qty: 1, die: 3, bonus: 0 }
      ],
      [
        { name: 'Robber Fly', qty: 1, die: 3, bonus: 0 },
        { name: 'Poltergeist', qty: 1, die: 8, bonus: 0 },
        { name: 'Ochre Jelly', qty: 1, die: 1, bonus: 0 },
        { name: 'Rust Monster', qty: 1, die: 4, bonus: 0 },
        { name: 'Rakshasa', qty: 1, die: 4, bonus: 0 },
        { name: 'Werebear', qty: 1, die: 4, bonus: 0 }
      ],
      [
        { name: 'Rot Grub', qty: 5, die: 4, bonus: 0 },
        { name: 'Pseudo-Dragon', qty: 1, die: 1, bonus: 0 },
        { name: 'Ogre', qty: 1, die: 6, bonus: 0 },
        { name: 'Slithering Tracker', qty: 1, die: 1, bonus: 0 },
        { name: 'Remorhaz (7hd)', qty: 1, die: 1, bonus: 0 },
        { name: 'Manticore', qty: 1, die: 2, bonus: 0 }
      ],
      [
        { name: 'Shrew, Giant', qty: 1, die: 10, bonus: 0 },
        { name: 'Robber Fly', qty: 1, die: 6, bonus: 0 },
        { name: 'Piercer (3hd)', qty: 4, die: 6, bonus: 0 },
        { name: 'Snake Person', qty: 1, die: 3, bonus: 0 },
        { name: 'Revenant', qty: 1, die: 1, bonus: 0 },
        { name: 'Mimic', qty: 1, die: 1, bonus: 0 }
      ]
    ],
    [
      [
        { name: 'Skeleton', qty: 3, die: 4, bonus: 0 },
        { name: 'Rock Baboon', qty: 2, die: 6, bonus: 0 },
        { name: 'Poltergeist', qty: 2, die: 6, bonus: 0 },
        { name: 'Spawn of the Worm', qty: 1, die: 3, bonus: 0 },
        { name: 'Rust Monster', qty: 1, die: 4, bonus: 0 },
        { name: 'Mind Lasher', qty: 1, die: 8, bonus: 0 }
      ],
      [
        { name: 'Spitting Cobra', qty: 1, die: 6, bonus: 0 },
        { name: 'Rot Grub', qty: 5, die: 6, bonus: 0 },
        { name: 'Rot Grub', qty: 5, die: 6, bonus: 0 },
        { name: 'Spectre', qty: 1, die: 4, bonus: 0 },
        { name: 'Flame Salamander', qty: 1, die: 4, bonus: 1 },
        { name: 'Purple Worm', qty: 1, die: 2, bonus: 0 }
      ],
      [
        { name: 'Crab Spider', qty: 1, die: 4, bonus: 0 },
        { name: 'Pit Viper', qty: 1, die: 8, bonus: 0 },
        { name: 'Shadow', qty: 1, die: 8, bonus: 0 },
        { name: 'Phase Spider, Giant', qty: 1, die: 4, bonus: 0 },
        { name: 'Scorpion, Giant', qty: 1, die: 6, bonus: 0 },
        { name: 'Revenant', qty: 1, die: 1, bonus: 0 }
      ],
      [
        { name: 'Sprite', qty: 3, die: 6, bonus: 0 },
        { name: 'Black Widow', qty: 1, die: 3, bonus: 0 },
        { name: 'Tarantella', qty: 1, die: 3, bonus: 0 },
        { name: 'Frost Toad, Giant', qty: 1, die: 4, bonus: 0 },
        { name: 'Slithering Tracker', qty: 1, die: 1, bonus: 0 },
        { name: 'Roper', qty: 1, die: 2, bonus: 0 }
      ],
      [
        { name: 'Stirge', qty: 1, die: 10, bonus: 0 },
        { name: 'Poisonous Toad', qty: 1, die: 8, bonus: 0 },
        { name: 'Svirfneblin', qty: 2, die: 8, bonus: 0 },
        { name: 'Troll', qty: 1, die: 8, bonus: 0 },
        { name: 'Snake Person', qty: 1, die: 6, bonus: 0 },
        { name: 'Flame Salamander', qty: 1, die: 4, bonus: 1 }
      ],
      [
        { name: 'Poisonous Toad', qty: 1, die: 4, bonus: 0 },
        { name: 'Troglodyte', qty: 1, die: 8, bonus: 0 },
        { name: 'Thoul', qty: 1, die: 6, bonus: 0 },
        { name: 'Violet Fungus', qty: 2, die: 4, bonus: 0 },
        { name: 'Spectre', qty: 1, die: 4, bonus: 0 },
        { name: 'Frost Salamander', qty: 1, die: 3, bonus: 0 }
      ],
      [
        { name: 'Trader', qty: 1, die: 8, bonus: 0 },
        { name: 'Veteran', qty: 2, die: 4, bonus: 0 },
        { name: 'Poisonous Toad', qty: 2, die: 6, bonus: 0 },
        { name: 'Water Fiend', qty: 1, die: 4, bonus: 0 },
        { name: 'Troll', qty: 1, die: 8, bonus: 0 },
        { name: 'Shambling Mound', qty: 1, die: 3, bonus: 0 }
      ],
      [
        { name: 'Troglodyte', qty: 1, die: 4, bonus: 0 },
        { name: 'Violet Fungus', qty: 1, die: 2, bonus: 0 },
        { name: 'Violet Fungus', qty: 1, die: 4, bonus: 0 },
        { name: 'Weasel, Giant', qty: 1, die: 4, bonus: 0 },
        { name: 'Warp Beast', qty: 1, die: 4, bonus: 0 },
        { name: 'Slug, Giant', qty: 1, die: 1, bonus: 0 }
      ],
      [
        { name: 'Winter Wolf', qty: 2, die: 6, bonus: 0 },
        { name: 'Water Fiend', qty: 1, die: 1, bonus: 0 },
        { name: 'Water Fiend', qty: 1, die: 3, bonus: 0 },
        { name: "Will-o'-the-Wisp", qty: 1, die: 1, bonus: 0 },
        { name: "Will-o'-the-Wisp", qty: 1, die: 3, bonus: 0 },
        { name: 'Trapper', qty: 1, die: 1, bonus: 0 }
      ],
      [
        { name: 'Zombie', qty: 1, die: 4, bonus: 0 },
        { name: 'Zombie', qty: 2, die: 4, bonus: 0 },
        { name: 'Wight', qty: 1, die: 6, bonus: 0 },
        { name: 'Wraith', qty: 1, die: 4, bonus: 0 },
        { name: 'Xorn', qty: 1, die: 4, bonus: 0 },
        { name: 'Vampire', qty: 1, die: 4, bonus: 0 }
      ]
    ]
  ];
  OSE.wildEncByTerrain = {
    'Barren, Hills, Mountains': [
      { table: 'B', type: 'Animal' },
      { table: '1', type: 'Dragon' },
      { table: '1', type: 'Dragon' },
      { table: 'B', type: 'Human' },
      { table: 'B', type: 'Humanoid' },
      { table: 'B', type: 'Humanoid' },
      { table: 'B', type: 'Monster' },
      { table: '2', type: 'Unusual' }
    ],
    City: [
      { table: 'C', type: 'Human, City' },
      { table: 'C', type: 'Human, City' },
      { table: 'C', type: 'Human, City' },
      { table: 'C', type: 'Human, City' },
      { table: 'C', type: 'Human, City' },
      { table: 'C', type: 'Human, City' },
      { table: 'C', type: 'Humanoid' },
      { table: '2', type: 'Undead' }
    ],
    'Clear, Grasslands': [
      { table: 'G', type: 'Animal' },
      { table: '1', type: 'Dragon' },
      { table: '1', type: 'Flyer' },
      { table: 'G', type: 'Human' },
      { table: 'G', type: 'Humanoid' },
      { table: '1', type: 'Insect' },
      { table: 'G', type: 'Monster' },
      { table: '2', type: 'Unusual' }
    ],
    Desert: [
      { table: 'D', type: 'Animal' },
      { table: 'D', type: 'Animal' },
      { table: '1', type: 'Dragon' },
      { table: 'D', type: 'Human' },
      { table: 'D', type: 'Human' },
      { table: 'D', type: 'Humanoid' },
      { table: 'D', type: 'Monster' },
      { table: '2', type: 'Undead' }
    ],
    Forest: [
      { table: 'F', type: 'Animal' },
      { table: '1', type: 'Dragon' },
      { table: '1', type: 'Flyer' },
      { table: 'F', type: 'Human' },
      { table: 'F', type: 'Humanoid' },
      { table: '1', type: 'Insect' },
      { table: 'F', type: 'Monster' },
      { table: '2', type: 'Unusual' }
    ],
    Jungle: [
      { table: 'J', type: 'Animal' },
      { table: '1', type: 'Dragon' },
      { table: '1', type: 'Flyer' },
      { table: 'J', type: 'Human' },
      { table: 'J', type: 'Humanoid' },
      { table: '1', type: 'Insect' },
      { table: '1', type: 'Insect' },
      { table: 'J', type: 'Monster' }
    ],
    'Lake, River': [
      { table: 'L', type: 'Animal' },
      { table: '1', type: 'Dragon' },
      { table: '1', type: 'Flyer' },
      { table: 'L', type: 'Human' },
      { table: 'L', type: 'Humanoid' },
      { table: '1', type: 'Insect' },
      { table: 'L', type: 'Swimmer' },
      { table: 'L', type: 'Swimmer' }
    ],
    'Ocean, Sea': [
      { table: '1', type: 'Dragon' },
      { table: '1', type: 'Flyer' },
      { table: 'O', type: 'Human' },
      { table: 'O', type: 'Swimmer' },
      { table: 'O', type: 'Swimmer' },
      { table: 'O', type: 'Swimmer' },
      { table: 'O', type: 'Swimmer' },
      { table: 'O', type: 'Swimmer' }
    ],
    Settled: [
      { table: 'C', type: 'Animal' },
      { table: '1', type: 'Dragon' },
      { table: '1', type: 'Flyer' },
      { table: 'C', type: 'Human, Settled' },
      { table: 'C', type: 'Human, Settled' },
      { table: 'C', type: 'Human, Settled' },
      { table: 'C', type: 'Humanoid' },
      { table: '1', type: 'Insect' }
    ],
    Swamp: [
      { table: '1', type: 'Dragon' },
      { table: '1', type: 'Flyer' },
      { table: 'S', type: 'Human' },
      { table: 'S', type: 'Humanoid' },
      { table: '1', type: 'Insect' },
      { table: 'S', type: 'Swimmer' },
      { table: 'S', type: 'Monster' },
      { table: '2', type: 'Undead' }
    ]
  };
  OSE.wildEncSubTables = {
    1: {
      Dragon: [
        { name: 'Chimera' },
        { name: 'Black Dragon' },
        { name: 'Blue Dragon' },
        { name: 'Brass Dragon' },
        { name: 'Bronze Dragon' },
        { name: 'Copper Dragon' },
        { name: 'Gold Dragon' },
        { name: 'Green Dragon' },
        { name: 'Red Dragon' },
        { name: 'Silver Dragon' },
        { name: 'White Dragon' },
        { name: 'Hydra' },
        { name: 'Hydra' },
        { name: 'Pseudo-Dragon' },
        { name: 'Wyvern' },
        { name: 'Amphisbaena', reroll: true },
        { name: 'Basilisk', reroll: true },
        { name: 'Dragonne', reroll: true },
        { name: 'Flame Lizard', reroll: true },
        { name: 'Flame Salamander', reroll: true }
      ],
      Flyer: [
        { name: 'Cockatrice' },
        { name: 'Couatl' },
        { name: 'Gargoyle' },
        { name: 'Griffon' },
        { name: 'Giant Hawk' },
        { name: 'Hippogriff' },
        { name: 'Killer Bee' },
        { name: 'Mantis, Giant' },
        { name: 'Nightmare' },
        { name: 'Pegasus' },
        { name: 'Peryton' },
        { name: 'Phoenix' },
        { name: 'Pixie' },
        { name: 'Pseudo-Dragon' },
        { name: 'Robber Fly' },
        { name: 'Small Roc' },
        { name: 'Sphinx' },
        { name: 'Sprite' },
        { name: 'Stirge' },
        { name: 'Wasp, Giant' }
      ],
      Insect: [
        { name: 'Ankheg  (3hd)' },
        { name: 'Fire Beetle' },
        { name: 'Oil Beetle' },
        { name: 'Tiger Beetle' },
        { name: 'Centipede, Giant' },
        { name: 'Driver Ant' },
        { name: 'Driver Ant' },
        { name: 'Flail Snail' },
        { name: 'Killer Bee' },
        { name: 'Mantis, Giant' },
        { name: 'Rhagodessa' },
        { name: 'Robber Fly' },
        { name: 'Rot Grub' },
        { name: 'Scorpion, Giant' },
        { name: 'Slug, Giant' },
        { name: 'Black Widow' },
        { name: 'Crab Spider' },
        { name: 'Phase Spider, Giant' },
        { name: 'Tarantella' },
        { name: 'Wasp, Giant' }
      ]
    },
    2: {
      'Prehistoric Animal': [
        { name: 'Cave Bear' },
        { name: 'Cave Bear' },
        { name: 'Sabre-Toothed Tiger' },
        { name: 'Sabre-Toothed Tiger' },
        { name: 'Giant Crocodile' },
        { name: 'Giant Crocodile' },
        { name: 'Gorilla' },
        { name: 'Behemoth Hippopotamus' },
        { name: 'Mastodon' },
        { name: 'Pteranodon' },
        { name: 'Pterodactyl' },
        { name: 'Woolly Rhinoceros' },
        { name: 'Woolly Rhinoceros' },
        { name: 'Pit Viper' },
        { name: 'Stegosaurus' },
        { name: 'Titanothere' },
        { name: 'Triceratops' },
        { name: 'Tyrannosaurus Rex' },
        { name: 'Dire Wolf' },
        { name: 'Yeti}' }
      ],
      Undead: [
        { name: 'Banshee' },
        { name: 'Coffer Corpse' },
        { name: 'Coffer Corpse' },
        { name: 'Ghast' },
        { name: 'Ghost' },
        { name: 'Ghost' },
        { name: 'Ghoul' },
        { name: 'Ghoul' },
        { name: 'Mummy' },
        { name: 'Necrophidius' },
        { name: 'Poltergeist' },
        { name: 'Revenant' },
        { name: 'Skeleton' },
        { name: 'Skeleton' },
        { name: 'Spectre' },
        { name: 'Vampire' },
        { name: 'Wight' },
        { name: 'Wraith' },
        { name: 'Zombie' },
        { name: 'Zombie' }
      ],
      Unusual: [
        { name: 'Basilisk' },
        { name: 'Blink Dog' },
        { name: 'Bulette' },
        { name: 'Catoblepas' },
        { name: 'Centaur' },
        { name: 'Gorgon' },
        { name: 'Jackalwere' },
        { name: 'Lamia' },
        { name: 'Leucrocotta' },
        { name: 'Werebear' },
        { name: 'Wereboar' },
        { name: 'Wererat' },
        { name: 'Weretiger' },
        { name: 'Werewolf' },
        { name: 'Medusa' },
        { name: 'Otyugh (6hd)' },
        { name: 'Roper' },
        { name: 'Shambling Mound' },
        { name: 'Treant' },
        { name: 'Warp Beast' }
      ]
    },
    B: {
      Animal: [
        { name: 'Ape, White' },
        { name: 'Ape, White' },
        { name: 'Cave Bear' },
        { name: 'Mountain Lion' },
        { name: 'Wild Dog' },
        { name: 'Dragonne' },
        { name: 'Gorilla' },
        { name: 'Normal Hawk' },
        { name: 'Herd Animal' },
        { name: 'Flame Lizard' },
        { name: 'Subterranean Lizard' },
        { name: 'Mule' },
        { name: 'Rock Baboon' },
        { name: 'Pit Viper' },
        { name: 'Giant Rattler' },
        { name: 'Phase Spider' },
        { name: 'Wasp, Giant' },
        { name: 'Normal Wolf' },
        { name: 'Dire Wolf' },
        { name: 'Winter Wolf' }
      ],
      Human: [
        { name: 'Bandit' },
        { name: 'Bandit' },
        { name: 'Berserker' },
        { name: 'Berserker' },
        { name: 'Berserker' },
        { name: 'Brigand a' },
        { name: 'Brigand a' },
        { name: 'Brigand a' },
        { name: 'Expert Adventurers' },
        { name: 'Expert Adventurers' },
        { name: 'High-Level Cleric' },
        { name: 'High-Level Fighter' },
        { name: 'High-Level Fighter' },
        { name: 'High-Level Magic-User' },
        { name: 'High-Level Magic-User' },
        { name: 'Merchant' },
        { name: 'Merchant' },
        { name: 'Neanderthal (Caveman)' },
        { name: 'Neanderthal (Caveman)' },
        { name: 'Neanderthal (Caveman)' }
      ],
      Humanoid: [
        { name: 'Dwarf' },
        { name: 'Ettin' },
        { name: 'Cloud Giant' },
        { name: 'Frost Giant' },
        { name: 'Hill Giant' },
        { name: 'Stone Giant' },
        { name: 'Storm Giant' },
        { name: 'Gnome' },
        { name: 'Goblin' },
        { name: 'Black Hag' },
        { name: 'Jackalwere' },
        { name: 'Kobold' },
        { name: 'Mutoid' },
        { name: 'Orc' },
        { name: 'Scorpionoid' },
        { name: 'Svirfneblin' },
        { name: 'Titan' },
        { name: 'Troglodyte' },
        { name: 'Troll' },
        { name: 'Yeti' }
      ],
      Monster: [
        { name: 'Gargoyle' },
        { name: 'Griffon' },
        { name: 'Harpy' },
        { name: 'Normal Hawk' },
        { name: 'Giant Hawk' },
        { name: 'Hippogriff' },
        { name: 'Lamia' },
        { name: 'Leucrocotta' },
        { name: 'Manticore' },
        { name: 'Manticore' },
        { name: 'Nightmare' },
        { name: 'Pegasus' },
        { name: 'Peryton' },
        { name: 'Peryton' },
        { name: 'Giant Roc' },
        { name: 'Large Roc' },
        { name: 'Small Roc' },
        { name: 'Sphinx' },
        { name: "Will-o'-the-Wisp" },
        { name: 'Xorn' }
      ]
    },
    C: {
      Animal: [
        { name: 'Boar' },
        { name: 'Boar' },
        { name: 'Tiger' },
        { name: 'Hunting Dog' },
        { name: 'Hunting Dog' },
        { name: 'War Dog' },
        { name: 'Ferret, Giant' },
        { name: 'Normal Hawk' },
        { name: 'Normal Hawk' },
        { name: 'Herd Animal' },
        { name: 'Herd Animal' },
        { name: 'Herd Animal' },
        { name: 'Giant Rat' },
        { name: 'Giant Rat' },
        { name: 'Giant Shrew' },
        { name: 'Pit Viper' },
        { name: 'Tarantella' },
        { name: 'Giant Weasel' },
        { name: 'Normal Wolf' },
        { name: 'Normal Wolf' }
      ],
      'Human, City': [
        { name: 'Acolyte' },
        { name: 'Acolyte' },
        { name: 'Bandit' },
        { name: 'Bandit' },
        { name: 'Bandit' },
        { name: 'Basic Adventurers' },
        { name: 'Basic Adventurers' },
        { name: 'Expert Adventurers' },
        { name: 'High-Level Fighter' },
        { name: 'High-Level Fighter' },
        { name: 'Medium' },
        { name: 'Merchant' },
        { name: 'Merchant' },
        { name: 'Noble' },
        { name: 'Noble' },
        { name: 'Trader' },
        { name: 'Trader' },
        { name: 'Trader' },
        { name: 'Trader' },
        { name: 'Veteran' }
      ],
      'Human, Settled': [
        { name: 'Acolyte' },
        { name: 'Acolyte' },
        { name: 'Bandit' },
        { name: 'Bandit' },
        { name: 'Bandit' },
        { name: 'Basic Adventurers' },
        { name: 'Basic Adventurers' },
        { name: 'Expert Adventurers' },
        { name: 'High-Level Cleric' },
        { name: 'High-Level Cleric' },
        { name: 'High-Level Fighter' },
        { name: 'High-Level Magic-User' },
        { name: 'Medium' },
        { name: 'Merchant' },
        { name: 'Merchant' },
        { name: 'Noble' },
        { name: 'Noble' },
        { name: 'Trader' },
        { name: 'Trader' },
        { name: 'Veteran' }
      ],
      Humanoid: [
        { name: 'Brownie' },
        { name: 'Dwarf' },
        { name: 'Dwarf' },
        { name: 'Elf' },
        { name: 'Elf' },
        { name: 'Hill Giant' },
        { name: 'Gnoll' },
        { name: 'Gnome' },
        { name: 'Gnome' },
        { name: 'Goblin' },
        { name: 'Gullygug' },
        { name: 'Halfling' },
        { name: 'Halfling' },
        { name: 'Hobgoblin' },
        { name: 'Leprechaun' },
        { name: 'Mutoid' },
        { name: 'Ogre' },
        { name: 'Orc' },
        { name: 'Pixie' },
        { name: 'Sprite' }
      ]
    },
    D: {
      Animal: [
        { name: 'Camel' },
        { name: 'Camel' },
        { name: 'Camel' },
        { name: 'Lion' },
        { name: 'Lion' },
        { name: 'Lion' },
        { name: 'Wild Dog' },
        { name: 'Normal Hawk' },
        { name: 'Herd Animal' },
        { name: 'Herd Animal' },
        { name: 'Herd Animal' },
        { name: 'Gecko' },
        { name: 'Monitor Lizard' },
        { name: 'Tuatara' },
        { name: 'Mantis, Giant' },
        { name: 'Pit Viper' },
        { name: 'Giant Rattler' },
        { name: 'Giant Rattler' },
        { name: 'Tarantella' },
        { name: 'Tarantella' }
      ],
      Human: [
        { name: 'Dervish a' },
        { name: 'Dervish a' },
        { name: 'Dervish a' },
        { name: 'Expert Adventurers' },
        { name: 'Expert Adventurers' },
        { name: 'High-Level Cleric' },
        { name: 'High-Level Cleric' },
        { name: 'High-Level Fighter' },
        { name: 'High-Level Fighter' },
        { name: 'High-Level Magic-User' },
        { name: 'Merchant' },
        { name: 'Merchant' },
        { name: 'Noble' },
        { name: 'Noble' },
        { name: 'Nomad' },
        { name: 'Nomad' },
        { name: 'Nomad' },
        { name: 'Nomad' },
        { name: 'Nomad' },
        { name: 'Nomad' }
      ],
      Humanoid: [
        { name: 'Fire Giant' },
        { name: 'Goblin' },
        { name: 'Goblin' },
        { name: 'Hobgoblin' },
        { name: 'Hobgoblin' },
        { name: 'Jackalwere' },
        { name: 'Mantid' },
        { name: 'Mutoid' },
        { name: 'Mutoid' },
        { name: 'Ogre' },
        { name: 'Ogre' },
        { name: 'Ogre' },
        { name: 'Orc' },
        { name: 'Orc' },
        { name: 'Pixie' },
        { name: 'Rakshasa' },
        { name: 'Scorpionoid' },
        { name: 'Snake Person' },
        { name: 'Sprite' },
        { name: 'Thoul' }
      ],
      Monster: [
        { name: 'Amphisbaena' },
        { name: 'Bulette' },
        { name: 'Dragonne' },
        { name: 'Gargoyle' },
        { name: 'Gargoyle' },
        { name: 'Griffon' },
        { name: 'Normal Hawk' },
        { name: 'Giant Hawk' },
        { name: 'Giant Hawk' },
        { name: 'Lamia' },
        { name: 'Leucrocotta' },
        { name: 'Manticore' },
        { name: 'Manticore' },
        { name: 'Manticore' },
        { name: 'Giant Roc' },
        { name: 'Large Roc' },
        { name: 'Small Roc' },
        { name: 'Sphinx' },
        { name: 'Sphinx' },
        { name: 'Wasp, Giant' }
      ]
    },
    F: {
      Animal: [
        { name: 'Grizzly Bear' },
        { name: 'Boar' },
        { name: 'Panther' },
        { name: 'Tiger' },
        { name: 'Wild Dog' },
        { name: 'Giant Mutant Frog' },
        { name: 'Giant Poisonous Frog' },
        { name: 'Normal Hawk' },
        { name: 'Herd Animal' },
        { name: 'Gecko' },
        { name: 'Tuatara' },
        { name: 'Pit Viper' },
        { name: 'Crab Spider' },
        { name: 'Crab Spider' },
        { name: 'Phase Spider' },
        { name: 'Poisonous Toad' },
        { name: 'Unicorn' },
        { name: 'Normal Wolf' },
        { name: 'Normal Wolf' },
        { name: 'Dire Wolf' }
      ],
      Human: [
        { name: 'Bandit' },
        { name: 'Bandit' },
        { name: 'Bandit' },
        { name: 'Basic Adventurers' },
        { name: 'Basic Adventurers' },
        { name: 'Berserker' },
        { name: 'Berserker' },
        { name: 'Brigand a' },
        { name: 'Brigand a' },
        { name: 'Brigand a' },
        { name: 'Brigand a' },
        { name: 'Expert Adventurers' },
        { name: 'Expert Adventurers' },
        { name: 'High-Level Cleric' },
        { name: 'High-Level Fighter' },
        { name: 'High-Level Magic-User' },
        { name: 'Merchant' },
        { name: 'Merchant' },
        { name: 'Trader' },
        { name: 'Trader' }
      ],
      Humanoid: [
        { name: 'Brownie' },
        { name: 'Bugbear' },
        { name: 'Cyclops' },
        { name: 'Dryad' },
        { name: 'Elf' },
        { name: 'Ettin' },
        { name: 'Hill Giant' },
        { name: 'Gnoll' },
        { name: 'Goblin' },
        { name: 'Gullygug' },
        { name: 'Black Hag' },
        { name: 'Hobgoblin' },
        { name: 'Leprechaun' },
        { name: 'Mutoid' },
        { name: 'Ogre' },
        { name: 'Ogre' },
        { name: 'Orc' },
        { name: 'Satyr' },
        { name: 'Thoul' },
        { name: 'Troll' }
      ],
      Monster: [
        { name: 'Catoblepas' },
        { name: 'Centaur' },
        { name: 'Cockatrice' },
        { name: 'Gas Spore' },
        { name: 'Ghost' },
        { name: 'Gibbering Mouther' },
        { name: 'Manticore' },
        { name: 'Otyugh (6hd)' },
        { name: 'Owl Bear' },
        { name: 'Peryton' },
        { name: 'Poltergeist' },
        { name: 'Pseudo-Dragon' },
        { name: 'Roper' },
        { name: 'Shambling Mound' },
        { name: 'Slithering Tracker' },
        { name: 'Aranea' },
        { name: 'Treant' },
        { name: 'Violet Fungus' },
        { name: "Will-o'-the-Wisp" },
        { name: 'Wyvern' }
      ]
    },
    G: {
      Animal: [
        { name: 'Ankheg  (3hd)' },
        { name: 'Boar' },
        { name: 'Lion' },
        { name: 'Wild Dog' },
        { name: 'Elephant' },
        { name: 'Ferret, Giant' },
        { name: 'Giant Hawk' },
        { name: 'Herd Animal' },
        { name: 'Herd Animal' },
        { name: 'Normal Hippopotamus' },
        { name: 'Wild Horse' },
        { name: 'Flame Lizard' },
        { name: 'Mantis, Giant' },
        { name: 'Mule' },
        { name: 'Rock Baboon' },
        { name: 'Pit Viper' },
        { name: 'Giant Rattler' },
        { name: 'Phase Spider' },
        { name: 'Wasp, Giant' },
        { name: 'Weasel, Giant' }
      ],
      Human: [
        { name: 'Bandit' },
        { name: 'Bandit' },
        { name: 'Bandit' },
        { name: 'Berserker' },
        { name: 'Berserker' },
        { name: 'Brigand a' },
        { name: 'Brigand a' },
        { name: 'Expert Adventurers' },
        { name: 'Expert Adventurers' },
        { name: 'High-Level Cleric' },
        { name: 'High-Level Fighter' },
        { name: 'High-Level Magic-User' },
        { name: 'Merchant' },
        { name: 'Merchant' },
        { name: 'Merchant' },
        { name: 'Noble' },
        { name: 'Noble' },
        { name: 'Nomad' },
        { name: 'Nomad' },
        { name: 'Trader' }
      ],
      Humanoid: [
        { name: 'Brownie' },
        { name: 'Bugbear' },
        { name: 'Elf' },
        { name: 'Hill Giant' },
        { name: 'Gnoll' },
        { name: 'Goblin' },
        { name: 'Halfling' },
        { name: 'Hobgoblin' },
        { name: 'Jackalwere' },
        { name: 'Leprechaun' },
        { name: 'Mantid' },
        { name: 'Mutoid' },
        { name: 'Ogre' },
        { name: 'Orc' },
        { name: 'Pixie' },
        { name: 'Rakshasa' },
        { name: 'Snake Person' },
        { name: 'Thoul' },
        { name: 'Titan' },
        { name: 'Troll' }
      ],
      Monster: [
        { name: 'Amphisbaena' },
        { name: 'Amphisbaena' },
        { name: 'Blink Dog' },
        { name: 'Blink Dog' },
        { name: 'Bulette' },
        { name: 'Bulette' },
        { name: 'Dragonne' },
        { name: 'Dragonne' },
        { name: 'Gorgon' },
        { name: 'Griffon' },
        { name: 'Griffon' },
        { name: 'Harpy' },
        { name: 'Hippogriff' },
        { name: 'Leucrocotta' },
        { name: 'Manticore' },
        { name: 'Minotaur' },
        { name: 'Nightmare' },
        { name: 'Pegasus' },
        { name: 'Warp Beast' },
        { name: 'Wyvern' }
      ]
    },
    J: {
      Animal: [
        { name: 'Boar' },
        { name: 'Panther' },
        { name: 'Elephant' },
        { name: 'Giant Poisonous Frog' },
        { name: 'Gorilla' },
        { name: 'Herd Animal' },
        { name: 'Behemoth Hippopotamus' },
        { name: 'Normal Hippopotamus' },
        { name: 'Draco' },
        { name: 'Gecko' },
        { name: 'Monitor Lizard' },
        { name: 'Horned Chameleon' },
        { name: 'Giant Rat' },
        { name: 'Shrew, Giant' },
        { name: 'Slug, Giant' },
        { name: 'Pit Viper' },
        { name: 'Rock Python' },
        { name: 'Spitting Cobra' },
        { name: 'Crab Spider' },
        { name: 'Poisonous Toad' }
      ],
      Human: [
        { name: 'Bandit' },
        { name: 'Bandit' },
        { name: 'Berserker' },
        { name: 'Berserker' },
        { name: 'Brigand a' },
        { name: 'Brigand a' },
        { name: 'Brigand a' },
        { name: 'Brigand a' },
        { name: 'Expert Adventurers' },
        { name: 'Expert Adventurers' },
        { name: 'Expert Adventurers' },
        { name: 'High-Level Cleric' },
        { name: 'High-Level Fighter' },
        { name: 'High-Level Fighter' },
        { name: 'High-Level Magic-User' },
        { name: 'High-Level Magic-User' },
        { name: 'Merchant' },
        { name: 'Neanderthal (Caveman)' },
        { name: 'Neanderthal (Caveman)' },
        { name: 'Trader' }
      ],
      Humanoid: [
        { name: 'Bugbear' },
        { name: 'Cyclops' },
        { name: 'Elf' },
        { name: 'Ettin' },
        { name: 'Fire Giant' },
        { name: 'Hill Giant' },
        { name: 'Gnoll' },
        { name: 'Goblin' },
        { name: 'Gullygug' },
        { name: 'Gullygug' },
        { name: 'Black Hag' },
        { name: 'Lizard Man' },
        { name: 'Mantid' },
        { name: 'Mutoid' },
        { name: 'Ogre' },
        { name: 'Orc' },
        { name: 'Rakshasa' },
        { name: 'Snake Person' },
        { name: 'Troglodyte' },
        { name: 'Troll' }
      ],
      Monster: [
        { name: 'Amphisbaena' },
        { name: 'Basilisk' },
        { name: 'Caecilia' },
        { name: 'Couatl' },
        { name: 'Couatl' },
        { name: 'Flail Snail' },
        { name: 'Ghost' },
        { name: 'Gibbering Mouther' },
        { name: 'Leech, Giant' },
        { name: 'Nightmare' },
        { name: 'Otyugh (6hd)' },
        { name: 'Otyugh (6hd)' },
        { name: 'Pseudo-Dragon' },
        { name: 'Roper' },
        { name: 'Roper' },
        { name: 'Sphinx' },
        { name: 'Phase Spider, Giant' },
        { name: 'Violet Fungus' },
        { name: 'Violet Fungus' },
        { name: 'Warp Beast' }
      ]
    },
    L: {
      Animal: [
        { name: 'Boar' },
        { name: 'Panther' },
        { name: 'Tiger' },
        { name: 'Crab, Giant' },
        { name: 'Normal Crocodile' },
        { name: 'Normal Crocodile' },
        { name: 'Large Crocodile' },
        { name: 'Giant Piranha' },
        { name: 'Giant Mutant Frog' },
        { name: 'Herd Animal' },
        { name: 'Herd Animal' },
        { name: 'Behemoth Hippopotamus' },
        { name: 'Normal Hippopotamus' },
        { name: 'Lamprey, Giant' },
        { name: 'Leech, Giant' },
        { name: 'Leech, Giant' },
        { name: 'Giant Rat' },
        { name: 'Shrew, Giant' },
        { name: 'Frost Toad, Giant' },
        { name: 'Frost Toad, Giant' }
      ],
      Human: [
        { name: 'Bandit' },
        { name: 'Bandit' },
        { name: 'Basic Adventurers' },
        { name: 'Basic Adventurers' },
        { name: 'Brigand a' },
        { name: 'Buccaneer' },
        { name: 'Buccaneer' },
        { name: 'Buccaneer' },
        { name: 'Buccaneer' },
        { name: 'Expert Adventurers' },
        { name: 'Expert Adventurers' },
        { name: 'High-Level Cleric' },
        { name: 'High-Level Cleric' },
        { name: 'High-Level Fighter' },
        { name: 'High-Level Fighter' },
        { name: 'High-Level Magic-User' },
        { name: 'Merchant' },
        { name: 'Merchant' },
        { name: 'Merchant' },
        { name: 'Trader' }
      ],
      Humanoid: [
        { name: 'Brownie' },
        { name: 'Brownie' },
        { name: 'Bugbear' },
        { name: 'Elf' },
        { name: 'Gnoll' },
        { name: 'Gullygug' },
        { name: 'Gullygug' },
        { name: 'Hobgoblin' },
        { name: 'Leprechaun' },
        { name: 'Lizard Man' },
        { name: 'Lizard Man' },
        { name: 'Merrow' },
        { name: 'Merrow' },
        { name: 'Mutoid' },
        { name: 'Nixie' },
        { name: 'Ogre' },
        { name: 'Orc' },
        { name: 'Sprite' },
        { name: 'Thoul' },
        { name: 'Troll' }
      ],
      Swimmer: [
        { name: 'Crab, Giant' },
        { name: 'Normal Crocodile' },
        { name: 'Large Crocodile' },
        { name: 'Giant Catfish' },
        { name: 'Giant Electric Eel' },
        { name: 'Giant Electric Eel' },
        { name: 'Giant Pike' },
        { name: 'Giant Pike' },
        { name: 'Giant Piranha' },
        { name: 'Giant Sturgeon' },
        { name: 'Giant Mutant Frog' },
        { name: 'Giant Mutant Frog' },
        { name: 'Gullygug' },
        { name: 'Normal Hippopotamus' },
        { name: 'Leech, Giant' },
        { name: 'Lizard Man' },
        { name: 'Nixie' },
        { name: 'Aquatic Spider' },
        { name: 'Freshwater Termite' },
        { name: 'Snapping Turtle' }
      ]
    },
    O: {
      Swimmer: [
        { name: 'Dragon Turtle' },
        { name: 'Giant Swordfish' },
        { name: 'Sea Hag' },
        { name: 'Hippocampus' },
        { name: 'Sea Hydra' },
        { name: 'Jellyfish, Giant' },
        { name: 'Locathah' },
        { name: 'Merman' },
        { name: 'Merrow' },
        { name: 'Octopus, Giant' },
        { name: 'Sahuagin' },
        { name: 'Sea Dragon' },
        { name: 'Sea Serpent (Lesser)' },
        { name: 'Mako Shark' },
        { name: 'Sea Snake' },
        { name: 'Giant Squid' },
        { name: 'Saltwater Termite' },
        { name: 'Triton' },
        { name: 'Sea Turtle' },
        { name: 'Killer Whale' }
      ],
      Human: [
        { name: 'Buccaneer' },
        { name: 'Buccaneer' },
        { name: 'Buccaneer' },
        { name: 'Buccaneer' },
        { name: 'Expert Adventurers' },
        { name: 'Expert Adventurers' },
        { name: 'Merchant' },
        { name: 'Merchant' },
        { name: 'Merchant' },
        { name: 'Merchant' },
        { name: 'Merchant' },
        { name: 'Merchant' },
        { name: 'Merchant' },
        { name: 'Pirate' },
        { name: 'Pirate' },
        { name: 'Pirate' },
        { name: 'Pirate' },
        { name: 'Pirate' },
        { name: 'Pirate' },
        { name: 'Pirate' }
      ]
    },
    S: {
      Human: [
        { name: 'Bandit' },
        { name: 'Bandit' },
        { name: 'Bandit' },
        { name: 'Basic Adventurers' },
        { name: 'Berserker' },
        { name: 'Berserker' },
        { name: 'Brigand a' },
        { name: 'Brigand a' },
        { name: 'Expert Adventurers' },
        { name: 'Expert Adventurers' },
        { name: 'Expert Adventurers' },
        { name: 'High-Level Cleric' },
        { name: 'High-Level Cleric' },
        { name: 'High-Level Fighter' },
        { name: 'High-Level Fighter' },
        { name: 'High-Level Magic-User' },
        { name: 'High-Level Magic-User' },
        { name: 'Merchant' },
        { name: 'Trader' },
        { name: 'Trader' }
      ],
      Humanoid: [
        { name: 'Ettin' },
        { name: 'Gnoll' },
        { name: 'Goblin' },
        { name: 'Gullygug' },
        { name: 'Gullygug' },
        { name: 'Gullygug' },
        { name: 'Black Hag' },
        { name: 'Hobgoblin' },
        { name: 'Lizard Man' },
        { name: 'Lizard Man' },
        { name: 'Lizard Man' },
        { name: 'Merrow' },
        { name: 'Mutoid' },
        { name: 'Nixie' },
        { name: 'Ogre' },
        { name: 'Orc' },
        { name: 'Snake Person' },
        { name: 'Troglodyte' },
        { name: 'Troll' },
        { name: 'Troll' }
      ],
      Monster: [
        { name: 'Banshee' },
        { name: 'Carcass Crawler' },
        { name: 'Catoblepas' },
        { name: 'Giant Mutant Frog' },
        { name: 'Giant Poisonous Frog' },
        { name: 'Ghost' },
        { name: 'Ghoul' },
        { name: 'Hydra' },
        { name: 'Leucrocotta' },
        { name: 'Merrow' },
        { name: 'Merrow' },
        { name: 'Otyugh (6hd)' },
        { name: 'Rot Grub' },
        { name: 'Shambling Mound' },
        { name: 'Spawn of the Worm' },
        { name: 'Poisonous Toad' },
        { name: 'Water Fiend' },
        { name: "Will-o'-the-Wisp" },
        { name: "Will-o'-the-Wisp" },
        { name: 'Wraith' }
      ],
      Swimmer: [
        { name: 'Crab, Giant' },
        { name: 'Crocodile' },
        { name: 'Giant Crocodile' },
        { name: 'Large Crocodile' },
        { name: 'Giant Catfish' },
        { name: 'Giant Electric Eel' },
        { name: 'Giant Pike' },
        { name: 'Gullygug' },
        { name: 'Gullygug' },
        { name: 'Insect Swarm' },
        { name: 'Insect Swarm' },
        { name: 'Lamprey, Giant' },
        { name: 'Lamprey, Giant' },
        { name: 'Leech, Giant' },
        { name: 'Leech, Giant' },
        { name: 'Lizard Man' },
        { name: 'Lizard Man' },
        { name: 'Aquatic Spider' },
        { name: 'Swamp Termite' },
        { name: 'Snapping Turtle' }
      ]
    }
  };
});
