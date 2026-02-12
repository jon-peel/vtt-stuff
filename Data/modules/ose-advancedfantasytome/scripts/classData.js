Hooks.once('OSRCB initialized', () => {
  if (game.modules.get('osr-character-builder')?.active) {
    OSE.data.classes = mergeObject(OSE.data.classes || {}, {
      classic: {
        cleric: {
          name: 'cleric',
          menu: 'Cleric',
          pack: 'osr-character-builder.osr-srd-class-options',
          title: [
            'Acolyte',
            'Adept',
            'Priest(ess)',
            'Vicar',
            'Curate',
            'Elder',
            'Bishop',
            'Lama',
            'Patriarch (Matriarch)'
          ],
          hdArr: [
            '1d6',
            '2d6',
            '3d6',
            '4d6',
            '5d6',
            '6d6',
            '7d6',
            '8d6',
            '9d6',
            '9d6+1',
            '9d6+2',
            '9d6+3',
            '9d6+4',
            '9d6+5'
          ],
          hd: 6,
          hdMod: [1, 2, 3, 4, 5],
          saves: {
            13: [3, 5, 7, 8, 7],
            9: [6, 7, 9, 11, 9],
            5: [9, 10, 12, 14, 12],
            1: [11, 12, 14, 16, 15]
          },
          thac0: {
            // starting lvl: [thaco, bba]
            13: [12, 7],
            9: [14, 5],
            5: [17, 2],
            1: [19, 0]
          },
          xp: [1500, 3000, 6000, 12000, 25000, 50000, 100000, 200000, 300000, 400000, 500000, 600000, 700000],
          req: 'none',
          primeReq: 'WIS',
          spellCaster: true,
          spellSlot: {
            1: { 1: { max: 0 }, 2: { max: 0 }, 3: { max: 0 }, 4: { max: 0 }, 5: { max: 0 }, 6: { max: 0 } },
            2: { 1: { max: 1 }, 2: { max: 0 }, 3: { max: 0 }, 4: { max: 0 }, 5: { max: 0 }, 6: { max: 0 } },
            3: { 1: { max: 2 }, 2: { max: 0 }, 3: { max: 0 }, 4: { max: 0 }, 5: { max: 0 }, 6: { max: 0 } },
            4: { 1: { max: 2 }, 2: { max: 1 }, 3: { max: 0 }, 4: { max: 0 }, 5: { max: 0 }, 6: { max: 0 } },
            5: { 1: { max: 2 }, 2: { max: 2 }, 3: { max: 0 }, 4: { max: 0 }, 5: { max: 0 }, 6: { max: 0 } },
            6: { 1: { max: 2 }, 2: { max: 2 }, 3: { max: 1 }, 4: { max: 1 }, 5: { max: 0 }, 6: { max: 0 } },
            7: { 1: { max: 2 }, 2: { max: 2 }, 3: { max: 2 }, 4: { max: 1 }, 5: { max: 1 }, 6: { max: 0 } },
            8: { 1: { max: 3 }, 2: { max: 3 }, 3: { max: 2 }, 4: { max: 2 }, 5: { max: 1 }, 6: { max: 0 } },
            9: { 1: { max: 3 }, 2: { max: 3 }, 3: { max: 3 }, 4: { max: 2 }, 5: { max: 2 }, 6: { max: 0 } },
            10: { 1: { max: 4 }, 2: { max: 4 }, 3: { max: 3 }, 4: { max: 3 }, 5: { max: 2 }, 6: { max: 0 } },
            11: { 1: { max: 4 }, 2: { max: 4 }, 3: { max: 4 }, 4: { max: 3 }, 5: { max: 3 }, 6: { max: 0 } },
            12: { 1: { max: 5 }, 2: { max: 5 }, 3: { max: 4 }, 4: { max: 4 }, 5: { max: 3 }, 6: { max: 0 } },
            13: { 1: { max: 5 }, 2: { max: 5 }, 3: { max: 5 }, 4: { max: 4 }, 5: { max: 4 }, 6: { max: 0 } },
            14: { 1: { max: 6 }, 2: { max: 5 }, 3: { max: 5 }, 4: { max: 5 }, 5: { max: 4 }, 6: { max: 0 } }
          },
          spellType: 'cleric',
          spellPackName: `${OSRCB.moduleName}.osr-srd-spells`,
          armorTypes: 'Any, including shields',
          weaponTypes: 'Any blunt weapons',
          bio: `<b>Requirements</b>: None<br>
      <b>Prime requisite</b>: WIS<br>
      <b>Hit Dice</b>: 1d6<br>
      <b>Maximum level</b>: 14<br>
      <b>Armour</b>: Any, including shields<br>
      <b>Weapons</b>: Any blunt weapons<br>
      <b>Languages</b>: Alignment, Common<br>`,
          description: `Clerics are adventurers who have sworn to serve a deity. They are trained for battle and channel the power of their deity.
          <br><br><b>Journal Entry</b>: @Compendium[${OSRCB.moduleName}.osr-srd-classes.MxTAGtazZxJfvF7M]{Cleric}<br>`,
          languages: ['Alignment', 'Common'],
          journal: `<br><br><b>Journal Entry</b>: @Compendium[${OSRCB.moduleName}.osr-srd-classes.MxTAGtazZxJfvF7M]{Cleric}<br>`,
          maxLvl: 14,
          classTables: '',
          nameType: 'human'
        },
        dwarf: {
          name: 'dwarf',
          menu: 'Dwarf',
          pack: 'osr-character-builder.osr-srd-class-options',
          title: [
            'Dwarven Veteran',
            'Dwarven Warrior',
            'Dwarven Swordmaster',
            'Dwarven Hero',
            'Dwarven Swashbuckler',
            'Dwarven Myrmidon',
            'Dwarven Champion',
            'Dwarven Superhero',
            'Dwarven Lord (Lady)'
          ],
          hdArr: ['1d8', '2d8', '3d8', '4d8', '5d8', '6d8', '7d8', '8d8', '9d8', '9d8+3', '9d8+6', '9d8+9'],
          hd: 8,
          hdMod: [3, 6, 9],
          saves: {
            10: [2, 3, 4, 4, 6],
            7: [4, 5, 6, 7, 8],
            4: [6, 7, 8, 10, 10],
            1: [8, 9, 10, 13, 12]
          },
          thac0: {
            10: [12, 7],
            7: [14, 5],
            4: [17, 2],
            1: [19, 0]
          },
          xp: [2200, 4400, 8800, 17000, 35000, 70000, 140000, 270000, 400000, 530000, 660000],
          req: 'Minimum CON 9',
          primeReq: 'STR',
          spellCaster: false,
          armorTypes: 'Any, including shields',
          weaponTypes: 'Small or normal sized',
          bio: `<b>Requirements</b>: Minimum CON 9<br>
      <b>Prime requisite</b>: STR<br>
      <b>Hit Dice</b>: 1d8<br>
      <b>Maximum level</b>: 12<br>
      <b>Armour</b>: Any, including shields<br>
      <b>Weapons</b>: Small or normal sized<br>
      <b>Languages</b>: Alignment, Common,<br>
      Dwarvish, Gnomish, Goblin, Kobold<br>`,
          description: `Dwarves are stout, bearded demihumans, about 4’ tall and weighing about 150 pounds. Dwarves typically live underground and love fine craftsmanship, gold, hearty food, and strong drink. They have skin, hair, and eye colours in earth tones. Dwarves are known for their stubbornness and practicality. They are a hardy people and have a strong resistance to magic, as reflected in their saving throws.
          <br><br><b>Journal Entry</b>: @Compendium[${OSRCB.moduleName}.osr-srd-classes.8FaYQ5BwGMxlWJA7]{Dwarf}<br>`,
          languages: ['Alignment', 'Common', 'Dwarvish', 'Gnomish', 'Goblin', 'Kobold'],
          journal: `<br><br><b>Journal Entry</b>: @Compendium[${OSRCB.moduleName}.osr-srd-classes.8FaYQ5BwGMxlWJA7]{Dwarf}<br>`,
          maxLvl: 12,
          classTables: '',
          nameType: 'dwarf'
        },
        elf: {
          name: 'elf',
          menu: 'Elf',
          pack: 'osr-character-builder.osr-srd-class-options',
          title: [
            'Medium/Veteran',
            'Seer/Warrior',
            'Conjurer/Swordmaster',
            'Magician/Hero',
            'Enchanter (Enchantress)/Swashbuckler',
            'Warlock (Witch)/Myrmidon',
            'Sorcerer (Sorceress)/Champion',
            'Necromancer/ Superhero',
            'Wizard/Lord (Lady)'
          ],
          hdArr: ['1d6', '2d6', '3d6', '4d6', '5d6', '6d6', '7d6', '8d6', '9d6', '9d6+2'],
          hd: 6,
          hdMod: [2],
          saves: {
            10: [6, 7, 8, 8, 8],
            7: [8, 9, 9, 10, 10],
            4: [10, 11, 11, 13, 12],
            1: [12, 13, 13, 15, 15]
          },
          thac0: {
            10: [12, 7],
            7: [14, 5],
            4: [17, 2],
            1: [19, 0]
          },
          xp: [4000, 8000, 16000, 32000, 65000, 120000, 250000, 400000, 600000],
          req: 'Minimum INT 9',
          primeReq: 'INT and STR',
          spellCaster: true,
          spellSlot: {
            1: { 1: { max: 1 }, 2: { max: 0 }, 3: { max: 0 }, 4: { max: 0 }, 5: { max: 0 }, 6: { max: 0 } },
            2: { 1: { max: 2 }, 2: { max: 0 }, 3: { max: 0 }, 4: { max: 0 }, 5: { max: 0 }, 6: { max: 0 } },
            3: { 1: { max: 2 }, 2: { max: 1 }, 3: { max: 0 }, 4: { max: 0 }, 5: { max: 0 }, 6: { max: 0 } },
            4: { 1: { max: 2 }, 2: { max: 2 }, 3: { max: 0 }, 4: { max: 0 }, 5: { max: 0 }, 6: { max: 0 } },
            5: { 1: { max: 2 }, 2: { max: 2 }, 3: { max: 1 }, 4: { max: 0 }, 5: { max: 0 }, 6: { max: 0 } },
            6: { 1: { max: 2 }, 2: { max: 2 }, 3: { max: 2 }, 4: { max: 0 }, 5: { max: 0 }, 6: { max: 0 } },
            7: { 1: { max: 3 }, 2: { max: 2 }, 3: { max: 2 }, 4: { max: 1 }, 5: { max: 0 }, 6: { max: 0 } },
            8: { 1: { max: 3 }, 2: { max: 3 }, 3: { max: 2 }, 4: { max: 2 }, 5: { max: 0 }, 6: { max: 0 } },
            9: { 1: { max: 3 }, 2: { max: 3 }, 3: { max: 3 }, 4: { max: 2 }, 5: { max: 1 }, 6: { max: 0 } },
            10: { 1: { max: 3 }, 2: { max: 3 }, 3: { max: 3 }, 4: { max: 3 }, 5: { max: 2 }, 6: { max: 0 } }
          },
          spellType: 'magic-user',
          spellPackName: `${OSRCB.moduleName}.osr-srd-spells`,
          armorTypes: 'Any, including shields',
          weaponTypes: 'Any',
          bio: `<b>Requirements</b>: Minimum INT 9<br>
      <b>Prime requisite</b>: INT and STR<br>
      <b>Hit Dice:</b> 1d6<br>
      <b>Maximum level</b>: 10<br>
      <b>Armour</b>: Any, including shields<br>
      <b>Weapons</b>: Any<br>
      <b>Languages</b>: Alignment, Common, Elvish, Gnoll, Hobgoblin, Orcish<br>`,
          description: `Elves are slender, fey demihumans with pointed ears. They typically weigh about 120 pounds and are between 5 and 5½ feet tall. Elves are seldom met in human settlements, preferring to feast and make merry in the woods. If crossed, they are dangerous enemies, as they are masters of both sword and spell. Elves are fascinated by spells and beautifully constructed magic items and love to collect both.<br>
      <b>Prime requisites</b>: An elf with at least 13 INT and STR gains a 5% bonus to experience. An elf with an INT of at least 16 and a STR of at least 13 receives a +10% XP bonus.
      <br><br><b>Journal Entry</b>: @Compendium[${OSRCB.moduleName}.osr-srd-classes.iH341o9KMs0jx96z]{Elf}<br>`,
          languages: ['Alignment', 'Common', 'Elvish', 'Gnoll', 'Hobgoblin', 'Orcish'],
          journal: `<br><br><b>Journal Entry</b>: @Compendium[${OSRCB.moduleName}.osr-srd-classes.iH341o9KMs0jx96z]{Elf}<br>`,
          maxLvl: 10,
          classTables: '',
          nameType: 'elf'
        },
        fighter: {
          name: 'fighter',
          menu: 'Fighter',
          pack: 'osr-character-builder.osr-srd-class-options',
          title: [
            'Veteran',
            'Warrior',
            'Sword-master',
            'Hero',
            'Swashbuckler',
            'Myrmidon',
            'Champion',
            'Superhero',
            'Lord (Lady)'
          ],
          hdArr: [
            '1d8',
            '2d8',
            '3d8',
            '4d8',
            '5d8',
            '6d8',
            '7d8',
            '8d8',
            '9d8',
            '9d8+2',
            '9d8+4',
            '9d8+6',
            '9d8+8',
            '9d8+10'
          ],
          hd: 8,
          hdMod: [2, 4, 6, 8, 10],
          saves: {
            13: [4, 5, 6, 5, 8],
            10: [6, 7, 8, 8, 10],
            7: [8, 9, 10, 10, 12],
            4: [10, 11, 12, 13, 14],
            1: [12, 13, 14, 15, 16]
          },
          thac0: {
            13: [10, 9],
            10: [12, 7],
            7: [14, 5],
            4: [17, 2],
            1: [19, 0]
          },
          xp: [2000, 4000, 8000, 16000, 32000, 64000, 120000, 240000, 360000, 480000, 600000, 720000, 840000],
          req: 'none',
          primeReq: 'STR',
          spellCaster: false,
          armorTypes: 'Any, including shields',
          weaponTypes: 'Any',
          bio: `<b>Requirements</b>: None<br>
      <b>Prime requisite</b>: STR<br>
      <b>Hit Dice</b>: 1d8<br>
      <b>Maximum level</b>: 14<br>
      <b>Armour</b>: Any, including shields<br>
      <b>Weapons</b>: Any<br>
      <b>Languages</b>: Alignment, Common<br>`,
          description: `Fighters are adventurers dedicated to mastering the arts of combat and war. In a group of adventurers, the role of fighters is to battle monsters and to defend other characters.
          <br><br><b>Journal Entry</b>: @Compendium[${OSRCB.moduleName}.osr-srd-classes.tuxYnX5oQOhSkHrp]{Fighter}<br>`,
          languages: ['Alignment', 'Common'],
          journal: `<br><br><b>Journal Entry</b>: @Compendium[${OSRCB.moduleName}.osr-srd-classes.tuxYnX5oQOhSkHrp]{Fighter}<br>`,
          maxLvl: 14,
          classTables: '',
          nameType: 'human'
        },
        halfling: {
          name: 'halfling',
          menu: 'Halfling',
          pack: 'osr-character-builder.osr-srd-class-options',
          title: [
            'Halfling Veteran',
            'Halfling Warrior',
            'Halfling Swordmaster',
            'Halfling Hero',
            'Halfling Swashbuckler',
            'Halfling Myrmidon',
            'Halfling Champion',
            'Sherif'
          ],
          hdArr: ['1d6', '2d6', '3d6', '4d6', '5d6', '6d6', '7d6', '8d6'],
          hd: 6,
          hdMod: [],
          saves: {
            7: [4, 5, 6, 7, 8],
            4: [6, 7, 8, 10, 10],
            1: [8, 9, 10, 13, 12]
          },
          thac0: {
            7: [14, 5],
            4: [17, 2],
            1: [19, 0]
          },
          xp: [2000, 4000, 8000, 16000, 32000, 64000, 120000],
          req: 'DEX, STR | CON 9, DEX 9',
          primeReq: 'DEX and STR',
          spellCaster: false,
          armorTypes: 'Any appropriate to size, including shields',
          weaponTypes: 'Any appropriate to size',
          bio: `<b>Requirements</b>: Minimum CON 9, minimum DEX 9<br>
      <b>Prime requisite</b>: DEX and STR<br>
      <b>Hit Dice</b>: 1d6<br>
      <b>Maximum</b> level: 8<br>
      <b>Armour</b>: Any appropriate to size, including shields<br>
      <b>Weapons</b>: Any appropriate to size<br>
      <b>Languages</b>: Alignment, Common, Halfling<br>`,
          description: `Halflings are small, rotund demihumans with furry feet and curly hair. They weigh about 60 pounds and are around 3’ tall. Halflings are a friendly and welcoming folk. Above all, they love the comforts of home and are not known for their bravery. Halflings who gain treasure through adventuring will often use their wealth in pursuit of a quiet, comfortable life. <br>
        <b>Prime requisites</b>: A halfling with at least 13 in one prime requisite gains a 5% bonus to experience. If both DEX and STR are 13 or higher, the halfling gets a +10% bonus.
        <br><br><b>Journal Entry</b>: @Compendium[${OSRCB.moduleName}.osr-srd-classes.56pppv5spL3hnIbc]{Halfling}<br>`,
          languages: ['Alignment', 'Common', 'Halfling'],
          journal: `<br><br><b>Journal Entry</b>: @Compendium[${OSRCB.moduleName}.osr-srd-classes.56pppv5spL3hnIbc]{Halfling}<br>`,
          maxLvl: 8,
          classTables: '',
          nameType: 'halfling'
        },
        'magic-user': {
          name: 'magic-user',
          menu: 'Magic User',
          pack: 'osr-character-builder.osr-srd-class-options',
          title: [
            'Medium',
            'Seer',
            'Conjurer',
            'Magician',
            'Enchanter (Enchantress)',
            'Warlock (Witch)',
            'Sorcerer (Sorceress)',
            'Necromancer',
            'Wizard'
          ],
          hdArr: [
            '1d4',
            '2d4',
            '3d4',
            '4d4',
            '5d4',
            '6d4',
            '7d4',
            '8d4',
            '9d4',
            '9d4+1',
            '9d4+2',
            '9d4+3',
            '9d4+4',
            '9d4+5'
          ],
          hd: 4,
          hdMod: [1, 2, 3, 4, 5],
          saves: {
            11: [8, 9, 8, 11, 8],
            6: [11, 12, 11, 14, 12],
            1: [13, 14, 13, 16, 15]
          },
          thac0: {
            11: [14, 5],
            6: [17, 2],
            1: [19, 0]
          },
          xp: [2500, 5000, 10000, 20000, 40000, 80000, 150000, 300000, 450000, 600000, 750000, 900000, 1050000],
          req: 'none',
          primeReq: 'INT',
          spellCaster: true,
          spellSlot: {
            1: { 1: { max: 1 }, 2: { max: 0 }, 3: { max: 0 }, 4: { max: 0 }, 5: { max: 0 }, 6: { max: 0 } },
            2: { 1: { max: 2 }, 2: { max: 0 }, 3: { max: 0 }, 4: { max: 0 }, 5: { max: 0 }, 6: { max: 0 } },
            3: { 1: { max: 2 }, 2: { max: 1 }, 3: { max: 0 }, 4: { max: 0 }, 5: { max: 0 }, 6: { max: 0 } },
            4: { 1: { max: 2 }, 2: { max: 2 }, 3: { max: 0 }, 4: { max: 0 }, 5: { max: 0 }, 6: { max: 0 } },
            5: { 1: { max: 2 }, 2: { max: 2 }, 3: { max: 1 }, 4: { max: 0 }, 5: { max: 0 }, 6: { max: 0 } },
            6: { 1: { max: 2 }, 2: { max: 2 }, 3: { max: 2 }, 4: { max: 0 }, 5: { max: 0 }, 6: { max: 0 } },
            7: { 1: { max: 3 }, 2: { max: 2 }, 3: { max: 2 }, 4: { max: 1 }, 5: { max: 0 }, 6: { max: 0 } },
            8: { 1: { max: 3 }, 2: { max: 2 }, 3: { max: 2 }, 4: { max: 2 }, 5: { max: 0 }, 6: { max: 0 } },
            9: { 1: { max: 3 }, 2: { max: 3 }, 3: { max: 3 }, 4: { max: 2 }, 5: { max: 1 }, 6: { max: 0 } },
            10: { 1: { max: 3 }, 2: { max: 3 }, 3: { max: 3 }, 4: { max: 3 }, 5: { max: 2 }, 6: { max: 0 } },
            11: { 1: { max: 4 }, 2: { max: 3 }, 3: { max: 3 }, 4: { max: 3 }, 5: { max: 2 }, 6: { max: 1 } },
            12: { 1: { max: 4 }, 2: { max: 4 }, 3: { max: 3 }, 4: { max: 3 }, 5: { max: 3 }, 6: { max: 2 } },
            13: { 1: { max: 4 }, 2: { max: 4 }, 3: { max: 4 }, 4: { max: 3 }, 5: { max: 3 }, 6: { max: 3 } },
            14: { 1: { max: 4 }, 2: { max: 4 }, 3: { max: 4 }, 4: { max: 4 }, 5: { max: 3 }, 6: { max: 3 } }
          },
          spellType: 'magic-user',
          spellPackName: `${OSRCB.moduleName}.osr-srd-spells`,
          armorTypes: 'None',
          weaponTypes: 'Dagger, staff (optional)',
          bio: `<b>Requirements</b>: None<br>
      <b>Prime requisite</b>: INT<br>
      <b>Hit Dice</b>: 1d4<br>
      <b>Maximum level</b>: 14<br>
      <b>Armour</b>: None<br>
      <b>Weapons</b>: Dagger, staff (optional)<br>
      <b>Languages</b>: Alignment, Common<br>`,
          description: `Magic-users are adventurers whose study of arcane secrets has taught them how to cast spells. Magic-users are able to cast a greater number of increasingly powerful spells as they advance in level.
          <br><br><b>Journal Entry</b>: @Compendium[${OSRCB.moduleName}.osr-srd-classes.8xWQ2MGa2LPMA43Z]{Magic-User}<br>`,
          languages: ['Alignment', 'Common'],
          journal: `<br><br><b>Journal Entry</b>: @Compendium[${OSRCB.moduleName}.osr-srd-classes.8xWQ2MGa2LPMA43Z]{Magic-User}<br>`,
          maxLvl: 14,
          classTables: '',
          nameType: 'human'
        },
        thief: {
          name: 'thief',
          menu: 'Thief',
          pack: 'osr-character-builder.osr-srd-class-options',
          title: [
            'Apprentice',
            'Footpad',
            'Robber',
            'Burglar',
            'Cutpurse',
            'Sharper',
            'Pilferer',
            'Thief',
            'Master Thief'
          ],
          hdArr: [
            '1d4',
            '2d4',
            '3d4',
            '4d4',
            '5d4',
            '6d4',
            '7d4',
            '8d4',
            '9d4',
            '9d4+2',
            '9d4+4',
            '9d4+6',
            '9d4+8',
            '9d4+10'
          ],
          hd: 4,
          hdMod: [2, 4, 6, 8, 10],
          saves: {
            13: [8, 9, 7, 10, 8],
            9: [10, 11, 9, 12, 10],
            5: [12, 13, 11, 14, 13],
            1: [13, 14, 13, 16, 15]
          },
          thac0: {
            13: [12, 7],
            9: [14, 5],
            5: [17, 2],
            1: [19, 0]
          },
          xp: [1200, 2400, 4800, 9600, 20000, 40000, 80000, 160000, 280000, 400000, 520000, 640000, 760000],
          req: 'DEX',
          primeReq: 'DEX',
          spellCaster: false,
          armorTypes: 'Leather, no shields',
          weaponTypes: 'Any',
          bio: `<b>Requirements</b>: None<br>
      <b>Prime requisite</b>: DEX<br>
      <b>Hit Dice</b>: 1d4<br>
      <b>Maximum level</b>: 14<br>
      <b>Armour</b>: Leather, no shields<br>
      <b>Weapons</b>: Any<br>
      <b>Languages</b>: Alignment, Common<br>`,
          description: `Thieves are adventurers who live by their skills of deception and stealth. Their range of unique skills makes them very handy companions in adventures. However, thieves are not always to be trusted.
      Adjust ability scores: In step 3 of character creation, thieves may not lower STR.
      <br><br><b>Journal Entry</b>: @Compendium[${OSRCB.moduleName}.osr-srd-classes.aTfwtSoLj0EYkOR7]{Thief}<br>`,
          languages: ['Alignment', 'Common'],
          journal: `<br><br><b>Journal Entry</b>: @Compendium[${OSRCB.moduleName}.osr-srd-classes.aTfwtSoLj0EYkOR7]{Thief}<br>`,
          maxLvl: 14,
          classTables: '',
          nameType: 'human'
        }
      },
      advanced: {
        acrobat: {
          name: 'acrobat',
          menu: 'Acrobat',
          pack: 'ose-advancedfantasytome.abilities',
          title: ['Apprentice'],
          hd: 4,
          hdArr: [
            '1d4',
            '2d4',
            '3d4',
            '4d4',
            '5d4',
            '6d4',
            '7d4',
            '8d4',
            '9d4',
            '9d4+2',
            '9d4+4',
            '9d4+6',
            '9d4+8',
            '9d4+10'
          ],
          hdMod: [2, 4, 6, 8, 10],
          saves: {
            1: [13, 14, 13, 16, 15],
            5: [12, 13, 11, 14, 13],
            9: [10, 11, 9, 12, 10],
            13: [8, 9, 7, 10, 8]
          },
          thac0: { 1: [19, 0], 5: [17, 2], 9: [14, 5], 13: [12, 7] },
          xp: [1200, 2400, 4800, 9600, 20000, 40000, 80000, 160000, 280000, 400000, 520000, 640000, 760000],
          req: 'None',
          spellCaster: false,
          description:
            "Acrobats are trained in skills of balance, gymnastics, and stealth. They often work in conjunction with thieves and may belong to a Thieves' Guild. \n      Adjust ability scores: In step 3 of character creation, acrobats may not lower STR. \n      Encumbrance: Evasion, falling, jumping, and tightrope walking cannot be performed if encumbrance reduces the acrobat's movement rate to less than 90' (30') (see Encumbrance, p203).\n      <br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.Pw8BYHUYyv75awld]{Acrobat}<br",
          languages: ['Alignment', 'Common'],
          journal:
            '<br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.Pw8BYHUYyv75awld]{Acrobat}<br>',
          maxLvl: 14,
          nameType: 'human',
          classTables: '',
          primeReq: 'DEX',
          armorTypes: 'Leather, no shields',
          weaponTypes: 'Missile weapons, dagger, sword, short sword, polearm, spear, staff',
          classTables:''},
        assassin: {
          name: 'assassin',
          menu: 'Assassin',
          pack: 'ose-advancedfantasytome.abilities',
          title: ['Bravo'],
          hd: 4,
          hdArr: [
            '1d4',
            '2d4',
            '3d4',
            '4d4',
            '5d4',
            '6d4',
            '7d4',
            '8d4',
            '9d4',
            '9d4+2',
            '9d4+4',
            '9d4+6',
            '9d4+8',
            '9d4+10'
          ],
          hdMod: [2, 4, 6, 8, 10],
          saves: {
            1: [13, 14, 13, 16, 15],
            5: [12, 13, 11, 14, 13],
            9: [10, 11, 9, 12, 10],
            13: [8, 9, 7, 10, 8]
          },
          thac0: { 1: [19, 0], 5: [17, 2], 9: [14, 5], 13: [12, 7] },
          xp: [1500, 3000, 6000, 12000, 25000, 50000, 100000, 200000, 300000, 425000, 575000, 750000, 900000],
          req: 'None',
          spellCaster: false,
          description:
            'Assassins are adventurers who specialise in the arts of infiltration and killing by stealth. They sometimes form guilds whereby their illicit services may be hired.\n      <b>Alignment</b>: Assassins may not be lawful. Adjust ability scores: In step 3 of character creation, assassins may not lower STR.\n      <br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.P4LIjkYokqDyPghX]{Assassin}<br>',
          languages: ['Alignment', 'Common'],
          journal:
            '<br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.P4LIjkYokqDyPghX]{Assassin}<br>',
          maxLvl: 14,
          nameType: 'human',
          classTables: '',
          primeReq: 'DEX',
          armorTypes: 'Leather, shields',
          weaponTypes: 'Any',
          classTables:''},
        barbarian: {
          name: 'barbarian',
          menu: 'Barbarian',
          pack: 'ose-advancedfantasytome.abilities',
          title: ['Hunter'],
          hd: 8,
          hdArr: [
            '1d8',
            '2d8',
            '3d8',
            '4d8',
            '5d8',
            '6d8',
            '7d8',
            '8d8',
            '9d8',
            '9d8+3',
            '9d8+6',
            '9d8+9',
            '9d8+12',
            '9d8+15'
          ],
          hdMod: [3, 6, 9, 12, 15],
          saves: {
            1: [10, 13, 12, 15, 16],
            4: [8, 11, 10, 13, 13],
            7: [6, 9, 8, 10, 10],
            10: [4, 7, 6, 8, 7],
            13: [3, 5, 4, 5, 5]
          },
          thac0: { 1: [19, 0], 4: [17, 2], 7: [14, 5], 10: [12, 7], 13: [10, 9] },
          xp: [2500, 5000, 10000, 18500, 37000, 85000, 140000, 270000, 400000, 530000, 660000, 790000, 920000],
          req: 'Minimum DEX 9',
          spellCaster: false,
          description:
            'Barbarians are tribal warriors from wild lands. They are formidable fighters with many useful survival skills but have a deep mistrust of the arcane.<br>\n      <b>Prime requisites</b>: A barbarian with at least 13 in one prime requisite gains a 5% bonus to experience. If both STR and CON are 16 or higher, the barbarian gets a +10% bonus.\n      Literacy: A 1st level barbarian cannot read or write, irrespective of INT score.\n      <br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.GwFj5lgZPVv3aUKC]{Barbarian}<br>',
          languages: ['Alignment', 'Common'],
          journal:
            '<br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.GwFj5lgZPVv3aUKC]{Barbarian}<br>',
          maxLvl: 14,
          nameType: 'barbarian',
          classTables: '',
          primeReq: 'CON and STR',
          armorTypes: 'Leather, chainmail, shields',
          weaponTypes: 'Any',
          classTables:''},
        bard: {
          name: 'bard',
          menu: 'Bard',
          pack: 'ose-advancedfantasytome.abilities',
          title: ['Rhymer'],
          hd: 6,
          hdArr: [
            '1d6',
            '2d6',
            '3d6',
            '4d6',
            '5d6',
            '6d6',
            '7d6',
            '8d6',
            '9d6',
            '9d6+2',
            '9d6+4',
            '9d6+6',
            '9d6+8',
            '9d6+10'
          ],
          hdMod: [2, 4, 6, 8, 10],
          saves: {
            1: [13, 14, 13, 16, 15],
            5: [12, 12, 11, 14, 13],
            9: [9, 11, 9, 12, 10],
            13: [8, 9, 7, 10, 8]
          },
          thac0: { 1: [19, 0], 5: [17, 2], 9: [14, 5], 13: [12, 7] },
          xp: [2000, 4000, 8000, 16000, 32000, 64000, 120000, 240000, 360000, 480000, 600000, 720000, 840000],
          req: 'Minimum DEX 9, minimum INT 9',
          spellCaster: true,
          spellSlot: {
            1: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            2: {
              1: { max: 1 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            3: {
              1: { max: 2 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            4: {
              1: { max: 3 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            5: {
              1: { max: 3 },
              2: { max: 1 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            6: {
              1: { max: 3 },
              2: { max: 2 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            7: {
              1: { max: 3 },
              2: { max: 3 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            8: {
              1: { max: 3 },
              2: { max: 3 },
              3: { max: 1 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            9: {
              1: { max: 3 },
              2: { max: 3 },
              3: { max: 2 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            10: {
              1: { max: 3 },
              2: { max: 3 },
              3: { max: 3 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            11: {
              1: { max: 3 },
              2: { max: 3 },
              3: { max: 3 },
              4: { max: 1 },
              5: { max: 0 },
              6: { max: 0 }
            },
            12: {
              1: { max: 3 },
              2: { max: 3 },
              3: { max: 3 },
              4: { max: 2 },
              5: { max: 0 },
              6: { max: 0 }
            },
            13: {
              1: { max: 3 },
              2: { max: 3 },
              3: { max: 3 },
              4: { max: 3 },
              5: { max: 0 },
              6: { max: 0 }
            },
            14: {
              1: { max: 4 },
              2: { max: 4 },
              3: { max: 3 },
              4: { max: 3 },
              5: { max: 0 },
              6: { max: 0 }
            }
          },
          spellType: 'druid',
          spellPackName: 'old-school-essentials.ose spells',
          description:
            'Bards are members of a sect of minstrels and warrior poets associated with the druids. Like druids, bards worship the force of nature and the myriad deities that personify it. Their strengths lie in their deep knowledge of myth and legend, the magic that they wield on behalf of their gods, and the enchanting power of their music.\n      <br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.iiGaZX4OVBzOEWjB]{Bard}<br>',
          languages: ['Alignment', 'Common'],
          journal:
            '<br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.iiGaZX4OVBzOEWjB]{Bard}<br>',
          maxLvl: 14,
          nameType: 'human',
          classTables: '',
          primeReq: 'CHA',
          armorTypes: 'Leather, chainmail, no shields',
          weaponTypes: 'Missile weapons, one-handed meleeweapons',
          classTables:''},
        drow: {
          name: 'drow',
          menu: 'Drow',
          pack: 'ose-advancedfantasytome.abilities',
          title: ['Acolyte/Veteran'],
          hd: 6,
          hdArr: ['1d6', '2d6', '3d6', '4d6', '5d6', '6d6', '7d6', '8d6', '9d6', '9d6+2'],
          hdMod: [2],
          saves: { 1: [12, 13, 13, 15, 12], 4: [10, 11, 11, 13, 10], 7: [8, 9, 9, 10, 8], 10: [6, 7, 8, 8, 6] },
          thac0: { 1: [19, 0], 4: [17, 2], 7: [14, 5], 10: [12, 7] },
          xp: [4000, 8000, 16000, 32000, 64000, 120000, 250000, 400000, 600000],
          req: 'Minimum INT 9',
          spellCaster: true,
          spellSlot: {
            1: {
              1: { max: 1 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            2: {
              1: { max: 2 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            3: {
              1: { max: 2 },
              2: { max: 1 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            4: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            5: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 1 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            6: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 2 },
              4: { max: 1 },
              5: { max: 0 },
              6: { max: 0 }
            },
            7: {
              1: { max: 3 },
              2: { max: 3 },
              3: { max: 2 },
              4: { max: 2 },
              5: { max: 1 },
              6: { max: 0 }
            },
            8: {
              1: { max: 3 },
              2: { max: 3 },
              3: { max: 3 },
              4: { max: 2 },
              5: { max: 2 },
              6: { max: 0 }
            },
            9: {
              1: { max: 4 },
              2: { max: 4 },
              3: { max: 3 },
              4: { max: 3 },
              5: { max: 2 },
              6: { max: 0 }
            },
            10: {
              1: { max: 4 },
              2: { max: 4 },
              3: { max: 4 },
              4: { max: 3 },
              5: { max: 3 },
              6: { max: 0 }
            },
            11: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            12: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            13: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            14: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            }
          },
          spellType: 'cleric',
          spellPackName: 'old-school-essentials.ose spells',
          description:
            'Drow (also known as dark elves) are slender, fey demihumans with pointed ears, skin as black as the night sky, and hair of silver or white. They have extremely long lifespans, being nigh immortal. Drow dwell exclusively underground, carving great cities of stone and crystal. They are related to the elves of the surface world and share their love of nature and magic. \n      Drow typically weigh about 120 pounds and are from 5 to 5½ feet tall. They are talented fighters and gain powerful magic through the worship of their strange subterranean deities. They have a strong resistance to magic, as reflected in their saving throws.<br>\n      <b>Prime requisites</b>: A drow with at least 13 STR and WIS gains a 5% bonus to experience. A drow with at least 13 STR and at least 16 WIS gains a 10% bonus.\n      <br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.Z5mKMrUD4NvFKjyP]{Drow}<br>',
          languages: ['Alignment', 'Common', 'Deepcommon', 'Elvish', 'Gnomish', 'Spider'],
          journal: '',
          maxLvl: 10,
          nameType: 'dark-elf',
          classTables: '',
          primeReq: 'STR and WIS',
          armorTypes: 'Any, including shields',
          weaponTypes: 'Any',
          classTables:''},
        druid: {
          name: 'druid',
          menu: 'Druid',
          pack: 'ose-advancedfantasytome.abilities',
          title: ['Aspirant'],
          hd: 6,
          hdArr: [
            '1d6',
            '2d6',
            '3d6',
            '4d6',
            '5d6',
            '6d6',
            '7d6',
            '8d6',
            '9d6',
            '9d6+1',
            '9d6+2',
            '9d6+3',
            '9d6+4',
            '9d6+5'
          ],
          hdMod: [1, 2, 3, 4, 5],
          saves: { 1: [11, 12, 14, 16, 15], 5: [9, 10, 12, 14, 12], 9: [6, 7, 9, 11, 9], 13: [3, 5, 7, 8, 7] },
          thac0: { 1: [19, 0], 5: [17, 2], 9: [14, 5], 13: [12, 7] },
          xp: [2000, 4000, 7500, 12500, 20000, 35000, 60000, 90000, 125000, 200000, 300000, 750000, 1500000],
          req: 'None',
          spellCaster: true,
          spellSlot: {
            1: {
              1: { max: 1 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            2: {
              1: { max: 2 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            3: {
              1: { max: 2 },
              2: { max: 1 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            4: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            5: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 1 },
              4: { max: 1 },
              5: { max: 0 },
              6: { max: 0 }
            },
            6: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 2 },
              4: { max: 1 },
              5: { max: 0 },
              6: { max: 0 }
            },
            7: {
              1: { max: 3 },
              2: { max: 3 },
              3: { max: 2 },
              4: { max: 2 },
              5: { max: 1 },
              6: { max: 0 }
            },
            8: {
              1: { max: 3 },
              2: { max: 3 },
              3: { max: 3 },
              4: { max: 2 },
              5: { max: 1 },
              6: { max: 0 }
            },
            9: {
              1: { max: 4 },
              2: { max: 4 },
              3: { max: 3 },
              4: { max: 3 },
              5: { max: 2 },
              6: { max: 0 }
            },
            10: {
              1: { max: 4 },
              2: { max: 4 },
              3: { max: 4 },
              4: { max: 3 },
              5: { max: 2 },
              6: { max: 0 }
            },
            11: {
              1: { max: 5 },
              2: { max: 5 },
              3: { max: 4 },
              4: { max: 4 },
              5: { max: 3 },
              6: { max: 0 }
            },
            12: {
              1: { max: 5 },
              2: { max: 5 },
              3: { max: 5 },
              4: { max: 4 },
              5: { max: 3 },
              6: { max: 0 }
            },
            13: {
              1: { max: 6 },
              2: { max: 5 },
              3: { max: 5 },
              4: { max: 5 },
              5: { max: 4 },
              6: { max: 0 }
            },
            14: {
              1: { max: 6 },
              2: { max: 6 },
              3: { max: 5 },
              4: { max: 5 },
              5: { max: 5 },
              6: { max: 0 }
            }
          },
          spellType: 'druid',
          spellPackName: 'old-school-essentials.ose spells',
          description:
            'Druids are priests of nature, protecting wild lands from the encroachment of “civilised” Law and the corrupting touch of Chaos. They worship the force of nature itself, personified in the form of various nature deities.\n      <b>Alignment</b>: Druids regard the ways of the natural world as the ideal state of things. They see the concepts of Law and Chaos as extremes that are both equally against nature. Thus, druids must be neutral in alignment.\n      <br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.29Xp9cn1bBvXf3j1]{Druid}<br>',
          languages: ['Alignment', 'Common'],
          journal:
            '<br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.29Xp9cn1bBvXf3j1]{Druid}<br>',
          maxLvl: 14,
          nameType: 'human',
          classTables: '',
          primeReq: 'WIS',
          armorTypes: 'Leather, wooden shields',
          weaponTypes: 'Club, dagger, sling, spear, staff',
          classTables:''},
        duergar: {
          name: 'duergar',
          menu: 'Duergar',
          pack: 'ose-advancedfantasytome.abilities',
          title: ['Skulk'],
          hd: 6,
          hdArr: ['1d6', '2d6', '3d6', '4d6', '5d6', '6d6', '7d6', '8d6', '9d6', '9d6+3'],
          hdMod: [3],
          saves: { 1: [8, 9, 10, 13, 12], 4: [6, 7, 8, 10, 10], 7: [4, 5, 6, 7, 8], 10: [2, 3, 4, 4, 6] },
          thac0: { 1: [19, 0], 4: [17, 2], 7: [14, 5], 10: [12, 7] },
          xp: [2800, 5600, 11200, 23000, 46000, 100000, 200000, 300000, 400000],
          req: 'Minimum CON 9, minimum INT 9',
          spellCaster: false,
          description:
            "Duergars (also known as grey dwarves) are short, scrawny, bearded demihumans with grey skin and hair and ugly visages. They are around 4' tall, weigh about 120 pounds, and have lifespans of up to 500 years. \n      Duergars dwell in strongholds and cities deep underground. They are renowned for their greed for precious metals and stones and for their xenophobia toward other races. Duergars have a naturally strong constitution and are highly resistant to magic.\n      <br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.TVmgqY4VecRcJeiw]{Duergar}<br>",
          languages: ['Alignment', 'Common', 'Deepcommon', 'Dwarvish', 'Gnomish', 'Goblin', 'Kobold'],
          journal:
            '<br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.TVmgqY4VecRcJeiw]{Duergar}<br>',
          maxLvl: 10,
          nameType: 'dwarf',
          classTables: '',
          primeReq: 'STR',
          armorTypes: 'Any, including shields',
          weaponTypes: 'Small or normal sized',
          classTables:''},
        gnome: {
          name: 'gnome',
          menu: 'Gnome',
          pack: 'ose-advancedfantasytome.abilities',
          title: ['Gnome Prestidigitator'],
          hd: 4,
          hdArr: ['1d4', '2d4', '3d4', '4d4', '5d4', '6d4', '7d4', '8d4'],
          hdMod: [],
          saves: { 1: [8, 9, 10, 14, 11], 6: [6, 7, 8, 11, 9] },
          thac0: { 1: [19, 0], 6: [17, 2] },
          xp: [3000, 6000, 12000, 30000, 60000, 120000, 240000],
          req: '',
          spellCaster: true,
          spellSlot: {
            1: {
              1: { max: 1 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            2: {
              1: { max: 2 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            3: {
              1: { max: 2 },
              2: { max: 1 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            4: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            5: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 1 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            6: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 2 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            7: {
              1: { max: 3 },
              2: { max: 2 },
              3: { max: 2 },
              4: { max: 1 },
              5: { max: 1 },
              6: { max: 0 }
            },
            8: {
              1: { max: 3 },
              2: { max: 3 },
              3: { max: 2 },
              4: { max: 2 },
              5: { max: 1 },
              6: { max: 0 }
            },
            9: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            10: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            11: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            12: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            13: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            14: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            }
          },
          spellType: 'illusionist',
          spellPackName: 'old-school-essentials.ose spells',
          description:
            '<b>Requirements</b>: Minimum CON 9\n      <b>Prime requisite</b>: DEX and INT<br>\n      <b>Hit Dice</b>: 1d4<br>\n      <b>Maximum level</b>: 8<br>\n      <b>Armour</b>: Leather, shields<br>\n      <b>Weapons</b>: Any appropriate to size<br>\n      <b>Languages</b>: Alignment, Common, Gnomish, Dwarvish, Kobold, the secret language of burrowing mammals<br><br><br>undefined',
          languages: ['Alignment', 'Common', 'Gnomish', 'Dwarvish', 'Kobold', 'Burrowing Mammals'],
          journal:
            '<br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.0uplQPyJS4TvNWRc]{Gnome}<br>',
          maxLvl: 8,
          nameType: 'gnome',
          classTables: '',
          primeReq: 'DEX and INT',
          armorTypes: 'Leather, shields',
          weaponTypes: 'Any appropriate to size',
          classTables:''},
        'half-elf': {
          name: 'half-elf',
          menu: 'Half Elf',
          pack: 'ose-advancedfantasytome.abilities',
          title: ['Veteran'],
          hd: 6,
          hdArr: ['1d6', '2d6', '3d6', '4d6', '5d6', '6d6', '7d6', '8d6', '9d6', '9d6+2', '9d6+4', '9d6+6'],
          hdMod: [2, 4, 6],
          saves: {
            1: [12, 13, 13, 15, 15],
            4: [10, 11, 11, 13, 12],
            7: [8, 9, 9, 10, 10],
            10: [6, 7, 8, 8, 8]
          },
          thac0: { 1: [19, 0], 4: [17, 2], 7: [14, 5], 10: [12, 7] },
          xp: [2500, 5000, 10000, 20000, 40000, 80000, 150000, 300000, 450000, 600000, 750000],
          req: 'Minimum CHA 9, minimum CON 9',
          spellCaster: true,
          spellSlot: {
            1: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            2: {
              1: { max: 1 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            3: {
              1: { max: 2 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            4: {
              1: { max: 2 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            5: {
              1: { max: 2 },
              2: { max: 1 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            6: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            7: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            8: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 1 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            9: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 1 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            10: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 2 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            11: {
              1: { max: 3 },
              2: { max: 2 },
              3: { max: 2 },
              4: { max: 1 },
              5: { max: 0 },
              6: { max: 0 }
            },
            12: {
              1: { max: 3 },
              2: { max: 3 },
              3: { max: 2 },
              4: { max: 1 },
              5: { max: 0 },
              6: { max: 0 }
            },
            13: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            14: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            }
          },
          spellType: 'magic-user',
          spellPackName: 'old-school-essentials.ose spells',
          description:
            "Half-elves are the rare offspring of elves and humans. Physically, they tend to combine the best features of their parents, having the innate beauty of elves and the robust physique of humans. They are human-like in stature but always have a feature that marks their elven heritage (e.g. pointed ears or unusually bright eyes). Half-elves are skilled fighters and dabble with magic, though they lack their elvish parents' mastery of the arcane.<br>\n      <b>Prime requisites</b>: A half-elf with at least 13 INT and STR gains a 5% bonus to experience. A half-elf with a score of 16 or higher in one prime requisite, and a 13 or higher in the other gains a 10% bonus.\n      <br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.qEHpv3owi6iUKT3v]{Half-Elf}<br>",
          languages: ['Alignment', 'Common', 'Elvish'],
          journal:
            '<br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.qEHpv3owi6iUKT3v]{Half-Elf}<br>',
          maxLvl: 12,
          nameType: 'half-elf',
          classTables: '',
          primeReq: 'INT and STR',
          armorTypes: 'Any, including shields',
          weaponTypes: 'Any',
          classTables:''},
        'half-orc': {
          name: 'half-orc',
          menu: 'Half Orc',
          pack: 'ose-advancedfantasytome.abilities',
          title: ['Outlaw'],
          hd: 6,
          hdArr: ['1d6', '2d6', '3d6', '4d6', '5d6', '6d6', '7d6', '8d6'],
          hdMod: [],
          saves: { 1: [13, 14, 13, 16, 15], 5: [12, 13, 11, 14, 13] },
          thac0: { 1: [19, 0], 5: [17, 2] },
          xp: [1800, 2300, 7000, 14000, 28000, 60000, 120000],
          req: 'None',
          spellCaster: false,
          description:
            'Half-orcs are the rare offspring of orcs and humans. They are human-like in stature and appearance, but usually have at least one feature that marks their orcish heritage (e.g. fangs or a pig-like snout). \n      Due to the common animosity between orcs and humans, half-orcs are typically outcasts from both their parent cultures, living on the fringes of society and making a living by whatever means they can. Half-orc adventurers are capable combatants and have some skill as thieves. <br>\n      <b>Prime requisites</b>: A half-orc with at least 13 DEX and STR gains a 5% bonus to experience. A half-orc with at least 16 DEX and STR gains a 10% bonus.\n      <br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.3vhYUZFk73odioiN]{Half-Orc}<br>',
          languages: ['Alignment', 'Common', 'Orcish'],
          journal:
            '<br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.3vhYUZFk73odioiN]{Half-Orc}<br>',
          maxLvl: 8,
          nameType: 'orc',
          classTables: '',
          primeReq: 'DEX and STR',
          armorTypes: 'Leather, chainmail, shields',
          weaponTypes: 'Any',
          classTables:''},
        illusionist: {
          name: 'illusionist',
          menu: 'Illusionist',
          pack: 'ose-advancedfantasytome.abilities',
          title: ['Prestidigitator'],
          hd: 4,
          hdArr: [
            '1d4',
            '2d4',
            '3d4',
            '4d4',
            '5d4',
            '6d4',
            '7d4',
            '8d4',
            '9d4',
            '9d4+1',
            '9d4+2',
            '9d4+3',
            '9d4+4',
            '9d4+5'
          ],
          hdMod: [1, 2, 3, 4, 5],
          saves: { 1: [13, 14, 13, 16, 15], 6: [11, 12, 11, 14, 12], 11: [8, 9, 8, 11, 8] },
          thac0: { 1: [19, 0], 6: [17, 2] },
          xp: [2500, 5000, 10000, 20000, 40000, 80000, 150000, 300000, 450000, 600000, 750000, 900000, 1050000],
          req: 'Minimum DEX 9',
          spellCaster: true,
          spellSlot: {
            1: {
              1: { max: 1 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            2: {
              1: { max: 2 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            3: {
              1: { max: 2 },
              2: { max: 1 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            4: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            5: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 1 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            6: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 2 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            7: {
              1: { max: 3 },
              2: { max: 2 },
              3: { max: 2 },
              4: { max: 1 },
              5: { max: 0 },
              6: { max: 0 }
            },
            8: {
              1: { max: 3 },
              2: { max: 2 },
              3: { max: 2 },
              4: { max: 2 },
              5: { max: 0 },
              6: { max: 0 }
            },
            9: {
              1: { max: 3 },
              2: { max: 3 },
              3: { max: 3 },
              4: { max: 2 },
              5: { max: 1 },
              6: { max: 0 }
            },
            10: {
              1: { max: 3 },
              2: { max: 3 },
              3: { max: 3 },
              4: { max: 3 },
              5: { max: 2 },
              6: { max: 0 }
            },
            11: {
              1: { max: 4 },
              2: { max: 3 },
              3: { max: 3 },
              4: { max: 3 },
              5: { max: 2 },
              6: { max: 1 }
            },
            12: {
              1: { max: 4 },
              2: { max: 4 },
              3: { max: 3 },
              4: { max: 3 },
              5: { max: 3 },
              6: { max: 2 }
            },
            13: {
              1: { max: 4 },
              2: { max: 4 },
              3: { max: 4 },
              4: { max: 3 },
              5: { max: 3 },
              6: { max: 3 }
            },
            14: {
              1: { max: 4 },
              2: { max: 4 },
              3: { max: 4 },
              4: { max: 4 },
              5: { max: 3 },
              6: { max: 3 }
            }
          },
          spellType: 'illusionist',
          spellPackName: 'old-school-essentials.ose spells',
          description:
            'Illusionists are adventurers who study the arcane arts of illusion and deception. Through this study, they have learned to cast magic spells.\n        <br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.LwHMXRqFv9uMiAsT]{Illusionist}<br>',
          languages: ['Alignment', 'Common'],
          journal:
            '<br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.LwHMXRqFv9uMiAsT]{Illusionist}<br>',
          maxLvl: 14,
          nameType: 'human',
          classTables: '',
          primeReq: 'INT',
          armorTypes: 'None',
          weaponTypes: 'Dagger, staff (optional)',
          classTables:''},
        knight: {
          name: 'knight',
          menu: 'Knight',
          pack: 'ose-advancedfantasytome.abilities',
          title: ['Rider'],
          hd: 8,
          hdArr: [
            '1d8',
            '2d8',
            '3d8',
            '4d8',
            '5d8',
            '6d8',
            '7d8',
            '8d8',
            '9d8',
            '9d8+2',
            '9d8+4',
            '9d8+6',
            '9d8+8',
            '9d8+10'
          ],
          hdMod: [2, 4, 6, 8, 10],
          saves: {
            1: [12, 13, 14, 15, 16],
            4: [10, 11, 12, 13, 14],
            7: [8, 9, 10, 10, 12],
            10: [6, 7, 8, 8, 10],
            13: [4, 5, 6, 5, 8]
          },
          thac0: { 1: [19, 0], 4: [17, 2], 7: [14, 5], 10: [12, 7], 13: [10, 9] },
          xp: [2500, 5000, 10000, 18500, 37000, 85000, 140000, 270000, 400000, 530000, 600000, 790000, 920000],
          req: 'Minimum CON 9, minimum DEX 9',
          spellCaster: false,
          description:
            "Knights are warriors who serve a noble house or knightly order, carrying out their liege's command and upholding the honour of the liege at all costs. They are masters of heavily armoured, mounted combat, preferring the lance above all other weapons. Knights are often mem- bers of the noble classes, but a person of lowlier origin may be initiated as a knight as a reward for noble deeds.\n      Knighthood: Knights of 1st and 2nd level are known as “squires” and are not yet regarded as true knights. Upon reaching 3rd level, the character is knighted by their liege and gains the right to bear a coat of arms (typically emblazoned upon the knight's shield).\n      <b>Alignment</b>: A knight must have the same alignment as their liege.\n      <br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.BhbfPaOeMtlQJfd3]{Knight}<br>",
          languages: ['Alignment', 'Common'],
          journal:
            '<br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.BhbfPaOeMtlQJfd3]{Knight}<br>',
          maxLvl: 14,
          nameType: 'human',
          classTables: '',
          primeReq: 'STR',
          armorTypes: 'Chainmail, plate mail, shields',
          weaponTypes: 'Melee weapons',
          classTables:''},
        paladin: {
          name: 'paladin',
          menu: 'Paladin',
          pack: 'ose-advancedfantasytome.abilities',
          title: ['Gallant'],
          hd: 8,
          hdArr: [
            '1d8',
            '2d8',
            '3d8',
            '4d8',
            '5d8',
            '6d8',
            '7d8',
            '8d8',
            '9d8',
            '9d8+2',
            '9d8+4',
            '9d8+6',
            '9d8+8',
            '9d8+10'
          ],
          hdMod: [2, 4, 6, 8, 10],
          saves: {
            1: [10, 11, 12, 13, 14],
            4: [8, 9, 10, 11, 12],
            7: [6, 7, 8, 8, 10],
            10: [4, 5, 6, 6, 8],
            13: [2, 3, 4, 3, 6]
          },
          thac0: { 1: [19, 0], 4: [17, 2], 7: [14, 5], 10: [12, 7], 13: [10, 9] },
          xp: [2750, 5500, 12000, 24000, 15000, 95000, 175000, 350000, 500000, 650000, 8000000, 950000, 1100000],
          req: 'Minimum CHA 9',
          spellCaster: true,
          spellSlot: {
            1: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            2: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            3: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            4: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            5: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            6: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            7: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            8: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            9: {
              1: { max: 1 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            10: {
              1: { max: 2 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            11: {
              1: { max: 2 },
              2: { max: 1 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            12: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 1 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            13: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 1 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            14: {
              1: { max: 3 },
              2: { max: 2 },
              3: { max: 1 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            }
          },
          spellType: 'cleric',
          spellPackName: 'old-school-essentials.ose spells',
          description:
            "Paladins are warriors sworn by sacred oath to the service of a Lawful holy order. \n      <b>Alignment</b>: A paladin must be lawful. If the character's alignment ever changes (for any reason), they lose all class abilities and become a fighter of the same level. The referee may allow the character to perform a quest of atonement in order to regain their status as a paladin.<br>\n      <b>Prime requisites</b>: A paladin with at least 13 in one prime requisite gets +5% to experience. If both STR and WIS are 16 or higher, the paladin gets a +10% bonus.\n      <br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.8W40tfLhZIGHwoF8]{Paladin}<br>",
          languages: ['Alignment', 'Common'],
          journal:
            '<br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.8W40tfLhZIGHwoF8]{Paladin}<br>',
          maxLvl: 14,
          nameType: 'human',
          classTables: '',
          primeReq: 'STR and WIS',
          armorTypes: 'Any, including shields',
          weaponTypes: 'Any',
          classTables:''},
        ranger: {
          name: 'ranger',
          menu: 'Ranger',
          pack: 'ose-advancedfantasytome.abilities',
          title: ['Runner'],
          hd: 8,
          hdArr: [
            '1d8',
            '2d8',
            '3d8',
            '4d8',
            '5d8',
            '6d8',
            '7d8',
            '8d8',
            '9d8',
            '9d8+2',
            '9d8+4',
            '9d8+6',
            '9d8+8',
            '9d8+10'
          ],
          hdMod: [2, 4, 6, 8, 10],
          saves: {
            1: [12, 13, 14, 15, 16],
            4: [10, 11, 12, 13, 14],
            7: [8, 9, 10, 10, 12],
            10: [6, 7, 8, 8, 10],
            13: [4, 5, 6, 5, 8]
          },
          thac0: { 1: [19, 0], 4: [17, 2], 7: [14, 5], 10: [12, 7], 13: [10, 9] },
          xp: [2250, 4500, 10000, 20000, 40000, 90000, 150000, 300000, 425000, 550000, 675000, 800000, 925000],
          req: 'Minimum CON 9, minimum WIS 9',
          spellCaster: true,
          spellSlot: {
            1: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            2: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            3: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            4: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            5: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            6: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            7: {
              1: { max: 0 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            8: {
              1: { max: 1 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            9: {
              1: { max: 2 },
              2: { max: 0 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            10: {
              1: { max: 2 },
              2: { max: 1 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            11: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 0 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            12: {
              1: { max: 2 },
              2: { max: 2 },
              3: { max: 1 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            13: {
              1: { max: 3 },
              2: { max: 2 },
              3: { max: 1 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            },
            14: {
              1: { max: 3 },
              2: { max: 2 },
              3: { max: 2 },
              4: { max: 0 },
              5: { max: 0 },
              6: { max: 0 }
            }
          },
          spellType: 'druid',
          spellPackName: 'old-school-essentials.ose spells',
          description:
            'Rangers are members of a secret society which protects their native lands from invasion and the influence of Chaos. They are skilled warriors who are adapted to life in the wilds. At higher levels, their connection with nature grants them the ability to cast spells.\n      <b>Alignment</b>: As protectors, rangers may only be lawful or neutral. If a ranger ever changes alignment to chaotic, they lose all special class abilities and become a fighter of the same level. The character may be able to regain their ranger status by performing a special quest.\n      <br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.71LUJ4Dl4qMIR3x1]{Ranger}<br>',
          languages: ['Alignment', 'Common'],
          journal:
            '<br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.71LUJ4Dl4qMIR3x1]{Ranger}<br>',
          maxLvl: 14,
          nameType: 'human',
          classTables: '',
          primeReq: 'STR',
          armorTypes: 'Leather, chainmail, shields',
          weaponTypes: 'Any',
          classTables:''},
        svirfneblin: {
          name: 'svirfneblin',
          menu: 'Svirfneblin',
          pack: 'ose-advancedfantasytome.abilities',
          title: ['Miner'],
          hd: 6,
          hdArr: ['1d6', '2d6', '3d6', '4d6', '5d6', '6d6', '7d6', '8d6'],
          hdMod: [],
          saves: { 1: [8, 9, 10, 14, 11], 4: [6, 7, 8, 11, 9], 7: [4, 5, 6, 9, 7] },
          thac0: { 1: [19, 0], 4: [17, 2], 7: [14, 5] },
          xp: [2400, 4800, 10000, 20000, 40000, 80000, 160000],
          req: 'Minimum CON 9',
          spellCaster: false,
          description:
            "Short, thickset demihumans with long noses and gnarled, hairless, grey skin. Svirfneblins (also known as deep gnomes) are subterranean cousins of the gnomes who live close to the surface. Svirfneblins are skilled tunnellers and makers of mechanical contraptions and cunning secret doors. They love gems above all else and excavate their communities around veins of precious stones. Svirfneblins are typically around 3½' tall and weigh around 120 pounds.\n      <br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.NaEPgokJdF1bB8XJ]{Svirfneblin}<br>",
          languages: ['Alignment', 'Common', 'Deepcommon', 'Gnomish', 'Dwarvish', 'Kobold', 'Earth Elementals'],
          journal:
            '<br><br><b>Journal Entry</b>: @UUID[Compendium.ose-advancedfantasytome.rules.JournalEntry.pKRzPpWFHma1Xfnx.JournalEntryPage.NaEPgokJdF1bB8XJ]{Svirfneblin}<br>',
          maxLvl: 8,
          nameType: 'gnome',
          classTables: '',
          primeReq: 'STR',
          armorTypes: 'Any appropriate to size, including shields',
          weaponTypes: 'Any appropriate to size',
          classTables:''}
      }
    });

    OSE.gp = {
      name: 'GP',
      type: 'item',
      img: '/systems/ose/assets/gold.png',
      data: {
        description: '',
        quantity: {
          value: 0,
          max: 0
        },
        treasure: true,
        cost: 1,
        weight: 1,
        containerId: '',
        isContainer: false
      },
      effects: [],
      folder: null,
      sort: 0,
      permission: {
        default: 0
      },
      flags: {}
    };

    OSE.data.retainerGear = {
      cleric: {
        armor: ['Leather Armor', 'Chain Mail', 'Plate Mail'],
        weapons: ['Club', 'Mace', 'Warhammer']
      },
      dwarf: {
        armor: ['Leather Armor', 'Chain Mail', 'Plate Mail'],
        weapons: ['Sword', 'Dagger', 'Hand Axe', 'Mace']
      },
      elf: {
        armor: ['Leather Armor', 'Chain Mail', 'Plate Mail'],
        weapons: ['Sword', 'Dagger', 'Hand Axe', 'Mace', 'Two-handed Sword', 'Longbow', 'Shortbow']
      },
      fighter: {
        armor: ['Leather Armor', 'Chain Mail', 'Plate Mail'],
        weapons: ['Sword', 'Dagger', 'Hand Axe', 'Mace', 'Two-handed Sword', 'Longbow', 'Shortbow']
      },
      halfling: {
        armor: ['Leather Armor', 'Chain Mail', 'Plate Mail'],
        weapons: ['Sword', 'Dagger', 'Hand Axe', 'Mace']
      },
      'magic-user': {
        armor: [],
        weapons: ['Dagger', 'Staff']
      },
      thief: {
        armor: ['Leather Armor'],
        weapons: ['Sword', 'Dagger', 'Hand Axe', 'Mace', 'Longbow', 'Shortbow']
      },
      acrobat: {
        armor: ['Leather Armor'],
        weapons: ['Sword', 'Dagger', 'Spear', 'Longbow', 'Shortbow']
      },
      assassin: {
        armor: ['Leather Armor'],
        weapons: ['Sword', 'Dagger', 'Hand Axe', 'Mace', 'Two-handed Sword', 'Longbow', 'Shortbow']
      },
      barbarian: {
        armor: ['Leather Armor', 'Chain Mail'],
        weapons: ['Sword', 'Dagger', 'Hand Axe', 'Mace', 'Two-handed Sword', 'Longbow', 'Shortbow']
      },
      bard: {
        armor: ['Leather Armor', 'Chain Mail'],
        weapons: ['Sword', 'Dagger', 'Hand Axe', 'Mace', 'Longbow', 'Shortbow']
      },
      drow: {
        armor: ['Leather Armor', 'Chain Mail', 'Plate Mail'],
        weapons: ['Sword', 'Dagger', 'Hand Axe', 'Mace', 'Two-handed Sword', 'Longbow', 'Shortbow']
      },
      druid: {
        armor: ['Leather Armor'],
        weapons: ['Dagger', 'Staff', 'Club', 'Spear']
      },
      duergar: {
        armor: ['Leather Armor', 'Chain Mail', 'Plate Mail'],
        weapons: ['Sword', 'Dagger', 'Hand Axe', 'Mace']
      },
      gnome: {
        armor: ['Leather Armor'],
        weapons: ['Sword', 'Dagger', 'Hand Axe', 'Mace', 'Two-handed Sword', 'Longbow', 'Shortbow']
      },
      'half-elf': {
        armor: ['Leather Armor', 'Chain Mail', 'Plate Mail'],
        weapons: ['Sword', 'Dagger', 'Hand Axe', 'Mace', 'Two-handed Sword', 'Longbow', 'Shortbow']
      },
      'half-orc': {
        armor: ['Leather Armor', 'Chain Mail'],
        weapons: ['Sword', 'Dagger', 'Hand Axe', 'Mace', 'Two-handed Sword', 'Longbow', 'Shortbow']
      },
      illusionist: {
        armor: [],
        weapons: ['Dagger', 'Staff']
      },
      knight: {
        armor: ['Leather Armor', 'Chain Mail', 'Plate Mail'],
        weapons: ['Sword', 'Dagger', 'Hand Axe', 'Mace', 'Two-handed Sword']
      },
      paladin: {
        armor: ['Leather Armor', 'Chain Mail', 'Plate Mail'],
        weapons: ['Sword', 'Dagger', 'Hand Axe', 'Mace', 'Two-handed Sword', 'Longbow', 'Shortbow']
      },
      ranger: {
        armor: ['Leather Armor', 'Chain Mail'],
        weapons: ['Sword', 'Dagger', 'Hand Axe', 'Mace', 'Two-handed Sword', 'Longbow', 'Shortbow']
      },
      svirfneblin: {
        armor: ['Leather Armor', 'Chain Mail', 'Plate Mail'],
        weapons: ['Sword', 'Dagger', 'Hand Axe', 'Mace', 'Two-handed Sword', 'Longbow', 'Shortbow']
      }
    };
  }

  OSE.spellList = {
    cleric: {
      1: [
        `Cure Light Wounds`,
        `Cause Light Wounds`,
        `Detect Evil`,
        `Detect Magic`,
        `Light`,
        `Darkness`,
        `Protection from Evil`,
        `Purify Food and Water`,
        `Remove Fear`,
        `Cause Fear`,
        `Resist Cold`
      ],
      2: [
        `Bless`,
        `Blight`,
        `Find Traps`,
        `Hold Person`,
        `Know Alignment`,
        `Resist Fire`,
        `Silence 15’ Radius`,
        `Snake Charm`,
        `Speak with Animals`
      ],
      3: [
        `Continual Light`,
        `Continual Darkness`,
        `Cure Disease`,
        `Cause Disease`,
        `Growth of Animal`,
        `Locate Object`,
        `Remove Curse`,
        `Curse`,
        `Striking`
      ],
      4: [
        `Create Water`,
        `Cure Serious Wounds`,
        `Cause Serious Wounds`,
        `Neutralize Poison`,
        `Protection from Evil 10’ Radius`,
        `Speak with Plants`,
        `Sticks to Snakes`
      ],
      5: [
        `Commune`,
        `Create Food`,
        `Dispel Evil`,
        `Insect Plague`,
        `Quest`,
        `Remove Quest`,
        `Raise Dead`,
        `Finger of Death`
      ]
    },
    druid: {
      1: [
        `Animal Friendship`,
        `Detect Danger`,
        `Entangle`,
        `Faerie Fire`,
        `Invisibility to Animals`,
        `Locate Plant or Animal`,
        `Predict Weather`,
        `Speak with Animals`
      ],
      2: [
        `Barkskin`,
        `Create Water`,
        `Cure Light Wounds`,
        `Cause Light Wounds`,
        `Heat Metal`,
        `Obscuring Mist`,
        `Produce Flame`,
        `Slow Poison`,
        `Warp Wood`
      ],
      3: [
        `Call Lightning`,
        `Growth of Nature`,
        `Hold Animal`,
        `Protection from Poison`,
        `Tree Shape`,
        `Water Breathing`,
        `Air Breathing`
      ],
      4: [
        `Cure Serious Wounds`,
        `Cause Serious Wounds`,
        `Dispel Magic`,
        `Protection from Fire and Lightning`,
        `Speak with Plants`,
        `Summon Animals`,
        `Temperature Control`
      ],
      5: [
        `Commune with Nature`,
        `Control Weather`,
        `Pass Plant`,
        `Protection from Plants and Animals`,
        `Transmute Rock to Mud`,
        `Transmute Rock to Mud`,
        `Wall of Thorns`
      ]
    },
    'magic-user': {
      1: [
        `Charm Person`,
        `Detect Magic`,
        `Floating Disc`,
        `Hold Portal`,
        `Light`,
        `Darkness`,
        `Magic Missile`,
        `Protection from Evil`,
        `Read Languages`,
        `Read Magic`,
        `Shield`,
        `Sleep`,
        `Ventriloquism`
      ],
      2: [
        `Continual Light`,
        `Continual Darkness`,
        `Detect Evil`,
        `Detect Invisible`,
        `ESP`,
        `Invisibility`,
        `Knock`,
        `Levitate`,
        `Locate Object`,
        `Mirror Image`,
        `Phantasmal Force`,
        `Web`,
        `Wizard Lock`
      ],
      3: [
        `Clairvoyance`,
        `Dispel Magic`,
        `Fire Ball`,
        `Fly`,
        `Haste`,
        `Hold Person`,
        `Infravision`,
        `Invisibility 10’ Radius`,
        `Lightning Bolt`,
        `Protection from Evil 10’ Radius`,
        `Protection from Normal Missiles`,
        `Water Breathing`
      ],
      4: [
        `Charm Monster`,
        `Confusion`,
        `Dimension Door`,
        `Growth of Plants`,
        `Hallucinatory Terrain`,
        `Massmorph`,
        `Polymorph Others`,
        `Polymorph Self`,
        `Remove Curse`,
        `Curse`,
        `Wall of Fire`,
        `Wall of Ice`,
        `Wizard Eye`
      ],
      5: [
        `Animate Dead`,
        `Cloudkill`,
        `Conjure Elemental`,
        `Contact Higher Plane`,
        `Feeblemind`,
        `Hold Monster`,
        `Magic Jar`,
        `Pass-Wall`,
        `Telekinesis`,
        `Teleport`,
        `Transmute Rock to Mud`,
        `Transmute Rock to Mud`,
        `Wall of Stone`
      ],
      6: [
        `Anti-Magic Shell`,
        `Control Weather`,
        `Death Spell`,
        `Disintegrate`,
        `Geas`,
        `Remove Geas`,
        `Invisible Stalker`,
        `Lower Water`,
        `Move Earth`,
        `Part Water`,
        `Projected Image`,
        `Reincarnation`,
        `Stone to Flesh`,
        `Flesh to Stone`
      ]
    },
    illusionist: {
      1: [
        `Auditory Illusion`,
        `Chromatic Orb`,
        `Colour Spray`,
        `Dancing Lights`,
        `Detect Illusion`,
        `Glamour`,
        `Hypnotism`,
        `Light`,
        `Darkness`,
        `Phantasmal Force`,
        `Read Magic`,
        `Spook`,
        `Wall of Fog`
      ],
      2: [
        `Blindness/Deafness`,
        `Blur`,
        `Detect Magic`,
        `False Aura`,
        `Fascinate`,
        `Hypnotic Pattern`,
        `Improved Phantasmal Force`,
        `Invisibility`,
        `Magic Mouth`,
        `Mirror Image`,
        `Quasimorph`,
        `Whispering Wind`
      ],
      3: [
        `Blacklight`,
        `Dispel Illusion`,
        `Fear`,
        `Hallucinatory Terrain`,
        `Invisibility 10’ Radius`,
        `Nondetection`,
        `Paralysation`,
        `Phantom Steed`,
        `Rope Trick`,
        `Spectral Force`,
        `Suggestion`,
        `Wraithform`
      ],
      4: [
        `Confusion`,
        `Dispel Magic`,
        `Emotion`,
        `Illusory Stamina`,
        `Improved Invisibility`,
        `Massmorph`,
        `Minor Creation`,
        `Phantasmal Killer`,
        `Rainbow Pattern`,
        `Shadow Monsters`,
        `Solid Fog`,
        `Veil of Abandonment`
      ],
      5: [
        `Chaos`,
        `Demi-Shadow Monsters`,
        `Illusion`,
        `Looking Glass`,
        `Major Creation`,
        `Maze of Mirrors`,
        `Projected Image`,
        `Seeming`,
        `Shadowcast`,
        `Shadowy Transformation`,
        `Time Flow`,
        `Visitation`
      ],
      6: [
        `Acid Fog`,
        `Dream Quest`,
        `Impersonation`,
        `Manifest Dream`,
        `Mass Suggestion`,
        `Mislead`,
        `Permanent Illusion`,
        `Shades`,
        `Through the Looking Glass`,
        `Triggered Illusion`,
        `True Seeing`,
        `Vision`
      ]
    }
  };

  OSRCB.spells.mergedList = mergeObject(OSRCB.spells.mergedList, OSE.spellList);
});


