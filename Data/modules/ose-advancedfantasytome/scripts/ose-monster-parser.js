/**
 * Parses a single OSE monster Statblock from raw text.
 */
export class OSEMonsterParser {
  // Various bullet styles use for monster ability lines.
  // Care must be taken as these are used directly in a regular expression,
  // so some characters need to be escaped or placed in specific positions
  // (e.g. dash must be first or last to avoid being interpreted as a range).
  static BULLET_STYLES = [
    "-", // Dash must be first for regex range
    "▶", // U+25B6
    "*",
    "•", // U+2022
    "►", // U+25BA
    "▸", // U+25B8
    "▪", // U+25AA
    "·", // U+00B7
    "‣", // U+2023
    "‒", // U+2012
    "–", // U+2013
    "—", // U+2014
    ">"
  ];

  // Regex to match ability lines starting with a bullet style, capturing name and text.
  static ABILITY_LINE_RE = new RegExp(
    `^[${OSEMonsterParser.BULLET_STYLES.join("")}]\\s*([^:]+)\\s*:(.*)$`,
    "i"
  );

  // Mapping of save type wording used within attack descriptions to their OSE abbreviations.
  static saveTypes = {
    death: "D",
    poison: "D",
    wand: "W",
    paralysis: "P",
    petrification: "P",
    petrify: "P",
    breath: "B",
    spell: "S",
    rod: "S",
    staff: "S"
  };

  // Mapping of save abbreviations to their full OSE save type names.
  static saveTypeMap = {
    D: "death",
    P: "paralysis",
    W: "wand",
    B: "breath",
    S: "spell"
  };

  /**
   * Parse a raw OSE Monster Statblock text into structured data.
   * @param {string} raw Raw Statblock text.
   * @return {object} Parsed monster data suitable for creating a Foundry Actor.
   */
  static parse(raw) {
    if (!raw) throw new Error("Empty input");
    const norm = this._normalize(raw);

    const data = {
      name: "",
      type: "monster",
      system: {
        hp: {
          hd: "",
          value: 0,
          max: 0
        },
        ac: {
          value: 0,
          mod: 0
        },
        aac: {
          value: 0,
          mod: 0
        },
        thac0: {
          value: 19
        },
        saves: {
          death: {
            value: 0
          },
          wand: {
            value: 0
          },
          paralysis: {
            value: 0
          },
          breath: {
            value: 0
          },
          spell: {
            value: 0
          }
        },
        movement: {
          base: 120
        },
        details: {
          biography: "",
          alignment: "",
          xp: 0,
          specialAbilities: 0,
          treasure: {
            table: "",
            type: ""
          },
          appearing: {
            d: 0,
            w: 0
          },
          morale: 0,
          movement: ""
        }
      },
      attacks: [],
      abilities: []
    };

    const lines = norm.trim()
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean);
    if (!lines.length) throw new Error("Empty input");

    // First line should be the name
    data.name = lines[0];
    let encounteredStats = false;
    let completedStats = false;
    let combinedStatsLine = "";
    let abilityBuffer = null;

    // Parse remaining lines
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();

      // Capture leading description text before stats start
      if (!encounteredStats) {
        if (!line.match(/^AC\s*-?\d+/i)) {
          // Accumulate description
          if (data.system.details.biography.endsWith("-")) {
            // Remove trailing hyphen (line continuation)
            data.system.details.biography = data.system.details.biography.slice(0, -1) + line;
          } else {
            data.system.details.biography += (data.system.details.biography ? " " : "") + line;
          }

          continue;
        }
      }

      encounteredStats = true;
      // Accumulate stats line until Abilities section starts
      if (!completedStats && !line.match(OSEMonsterParser.ABILITY_LINE_RE)) {
        if (combinedStatsLine.endsWith("-")) {
          // Remove trailing hyphen (line continuation)
          combinedStatsLine = combinedStatsLine.slice(0, -1) + line;
        } else {
          combinedStatsLine += (combinedStatsLine ? " " : "") + line;
        }

        continue;
      }

      if (!completedStats) {
        combinedStatsLine = this.parseStatsLine(combinedStatsLine, data);
      }

      completedStats = true;

      const abilityMatch = line.match(OSEMonsterParser.ABILITY_LINE_RE);
      if (abilityMatch) {
        if (abilityBuffer) {
          // New ability started, finalize previous one
          const abilityItem = {
            ...foundry.utils.deepClone(OSEMonsterParser.baseAbility),
            name: abilityBuffer.name.replace(/\b\w/g, c => c.toUpperCase())
          };
          abilityItem.system.description = abilityBuffer.text.trim();
          data.abilities.push(abilityItem);
        }
        // Start new ability
        abilityBuffer = {
          name: abilityMatch[1].trim(),
          text: (abilityMatch[2] || "").trim()
        };
      } else if (abilityBuffer) {
        // Continuation line for current ability
        if (abilityBuffer.text.endsWith("-")) {
          // Remove trailing hyphen (line continuation)
          abilityBuffer.text = abilityBuffer.text.slice(0, -1) + line;
        } else {
          abilityBuffer.text += (abilityBuffer.text ? " " : "") + line;
        }
      }
    }

    // Finalize last pending ability
    if (abilityBuffer) {
      const abilityItem = {
        ...foundry.utils.deepClone(OSEMonsterParser.baseAbility),
        name: abilityBuffer.name.replace(/\b\w/g, c => c.toUpperCase())
      };
      abilityItem.system.description = abilityBuffer.text.trim();
      data.abilities.push(abilityItem);
    }

    // If a monster has no abilities, the stats will not have been parsed yet.
    if (!completedStats) {
      this.parseStatsLine(combinedStatsLine, data);
    }

    return data;
  }

  static parseStatsLine(combinedStatsLine, data) {
    combinedStatsLine = combinedStatsLine.trim();

    // Extract AC and AAC
    const acMatch = combinedStatsLine.match(/\bAC\s*(-?\d+)\s*\[([+‑-]?\d+)]?/i);
    if (acMatch) {
      data.system.ac.value = parseInt(acMatch[1], 10) || 0;
      if (acMatch[2]) {
        // Replace the potentially non-standard hyphen character
        const aacValue = parseInt(acMatch[2].replace("‑", "-"), 10);
        if (!isNaN(aacValue) && aacValue !== 0) {
          data.system.aac.value = aacValue;
        }
      }
    }

    // Extract HP
    const hdMatch = combinedStatsLine.match(
      /\bHD\s+(\d+|[¼½¾⅓⅔⅛⅜⅝⅞])([+‑-]\d+)?(\*+)?(?:\s*\((\d+)\s*hp\))?/i
    );
    if (hdMatch) {
      const rawHD = hdMatch[1].replace(/\s+/, " ")
        .trim();
      const numericHD = OSEMonsterParser.parseFractionNumber(rawHD);
      if (!isNaN(numericHD)) {
        if (numericHD >= 1) {
          data.system.hp.hd = `${numericHD}d8`;
        } else if (numericHD > 0) {
          data.system.hp.hd = `1d${Math.round(8 * numericHD)}`;
        }

        if (hdMatch[2]) {
          // Replace the potentially non-standard hyphen character
          const hdMod = parseInt(hdMatch[2].replace("‑", "-"), 10);
          if (!isNaN(hdMod) && hdMod !== 0) {
            data.system.hp.hd += hdMod > 0 ? `+${hdMod}` : `${hdMod}`;
          }
        }
      }

      if (hdMatch[3]) {
        data.system.details.specialAbilities = hdMatch[3].length;
      }

      if (hdMatch[4]) {
        // Record the value in brackets as HP
        data.system.hp.value = parseInt(hdMatch[4]);
        data.system.hp.max = data.system.hp.value;
      }
    }

    // Extract THAC0
    const thac0Match = combinedStatsLine.match(/THAC0\s+(\d+)/i);
    if (thac0Match) {
      data.system.thac0.value = parseInt(thac0Match[1]);
    }

    // Extract Movement
    const moveMatch = combinedStatsLine.match(/MV\s+((\d+)(?:'\s*)?(?:\([^)]*\))?\s*([^,]*))/i);
    if (moveMatch) {
      const desc = moveMatch[1].trim();
      data.system.details.movement = desc || "";
      data.system.movement.base = parseInt(moveMatch[2], 10) || 0;
    }

    // Extract Save Values
    const savesMatch = combinedStatsLine.match(/SV\s+([^,]+)/i);
    if (savesMatch) {
      for (const abbr of Object.values(OSEMonsterParser.saveTypes)) {
        const match = savesMatch[1].match(new RegExp(`\\b${abbr}\\s*(\\d+)\\b`, "i"));
        if (match) {
          data.system.saves[OSEMonsterParser.saveTypeMap[abbr]].value = parseInt(match[1], 10) || 0;
        }
      }

      // TODO handle Save as HD value (inside brackets)
    }

    // Extract Morale
    const moraleMatch = combinedStatsLine.match(/\bML\s+(\d+)/i);
    if (moraleMatch) {
      data.system.details.morale = parseInt(moraleMatch[1], 10) || 0;
    }

    // Extract Alignment
    const alignMatch = combinedStatsLine.match(/\bAL\s+([^,]+)/i);
    if (alignMatch) {
      data.system.details.alignment = alignMatch[1].trim();
    }

    // Extract XP
    const xpMatch = combinedStatsLine.match(/\bXP\s+([\d,]+)/i);
    if (xpMatch) {
      data.system.details.xp = parseInt(xpMatch[1].replace(',', ''), 10) || 0;
    }

    // Extract Number Appearing
    const naMatch = combinedStatsLine.match(/\bNA\s+([^,]+)/i);
    if (naMatch) {
      const naText = naMatch[1].trim();
      const naValMatch = naText.match(/(\S+)\s*(?:\(([^)]+)\))?/);
      if (naValMatch) {
        data.system.details.appearing.d = naValMatch[1].trim();
        if (naValMatch[2]) {
          data.system.details.appearing.w = naValMatch[2].trim();
        }
      }
    }

    // Extract Treasure Type or Table
    const ttMatch = combinedStatsLine.match(/\bTT\s+([^,]+)$/i);
    if (ttMatch) {
      const ttText = ttMatch[1].trim();
      if (ttText && ttText !== "None") {
        const compendiumRef = game.packs.get("ose-advancedfantasytome.tables")?.index.find(e => e.name === `Type ${ttText}`);
        if (compendiumRef) {
          data.system.details.treasure.table = `@UUID[${compendiumRef.uuid}]`;
        } else {
          data.system.details.treasure.type = ttText;
        }
      }
    }

    // Create attacks
    const attMatch = combinedStatsLine.match(/\bAtt\s+(.+?),\s*THAC0/i);
    if (attMatch) {
      const attText = attMatch[1].trim();
      const availablePatterns = Object.keys(CONFIG.OSE.colors);
      const startIdx = availablePatterns.indexOf("red");
      let patternIdx = startIdx !== -1 ? startIdx : 0;

      // Split on commas (ignoring those inside brackets)
      const splitTopLevelCommas = (text) => {
        const parts = [];
        let buf = "";
        let depthParens = 0;
        let depthBrackets = 0;
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === "(") depthParens++;
          else if (ch === ")") depthParens = Math.max(0, depthParens - 1);
          else if (ch === "[") depthBrackets++;
          else if (ch === "]") depthBrackets = Math.max(0, depthBrackets - 1);
          if (ch === "," && depthParens === 0 && depthBrackets === 0) {
            parts.push(buf.trim());
            buf = "";
            continue;
          }
          buf += ch;
        }
        if (buf.trim()) parts.push(buf.trim());
        return parts;
      };

      // Split a segment on top-level " or " (ignoring those inside brackets)
      const splitTopLevelOr = (text) => {
        const parts = [];
        let buf = "";
        let depthParens = 0;
        let depthBrackets = 0;
        for (let i = 0; i < text.length; i++) {
          const slice = text.slice(i, i + 4).toLowerCase();
          const ch = text[i];
          if (ch === "(") depthParens++;
          else if (ch === ")") depthParens = Math.max(0, depthParens - 1);
          else if (ch === "[") depthBrackets++;
          else if (ch === "]") depthBrackets = Math.max(0, depthBrackets - 1);

          if (slice === " or " && depthParens === 0 && depthBrackets === 0) {
            parts.push(buf.trim());
            buf = "";
            i += 3;
            continue;
          }
          buf += ch;
        }
        if (buf.trim()) parts.push(buf.trim());
        return parts;
      };

      const parseSingleAttack = (attackExpr, pattern) => {
        if (!attackExpr) return;
        const atkMatch = attackExpr.trim()
          .match(/^(?:(\d+)\s*x)?\s*([^(]+?)(?:\s*\(([^)]+)\))?\s*$/i);
        if (!atkMatch) return;

        const count = atkMatch[1] ? parseInt(atkMatch[1], 10) : 1;
        const rawName = atkMatch[2].trim();
        const name = rawName.replace(/\b\w/g, c => c.toUpperCase());
        const bracket = atkMatch[3] ? atkMatch[3].trim() : "";

        const normalizeForCompare = s => s.replace(/\s+/g, "").toLowerCase();
        let damageValue = "";
        let descriptionValue = "";
        const hasDice = !!(bracket && /\d*d\d+/i.test(bracket));

        if (hasDice) {
          const normNoSpace = normalizeForCompare(bracket);
          if (/^[0-9d+x\-]+$/i.test(normNoSpace)) {
            damageValue = normNoSpace;
          } else {
            const prefixMatch = bracket.match(/^(\d+d\d+(?:\s*[+x-]\s*\d+)*)/i);
            if (prefixMatch) damageValue = normalizeForCompare(prefixMatch[1]);
            descriptionValue = bracket;
            if (descriptionValue && damageValue &&
              normalizeForCompare(descriptionValue) === damageValue) {
              descriptionValue = "";
            }
          }
        } else {
          descriptionValue = bracket || rawName;
        }

        let foundSaveKey = "";
        const searchText = bracket || rawName;
        if (searchText) {
          for (const key of Object.keys(OSEMonsterParser.saveTypes)) {
            if (new RegExp(`\\b${key}\\b`, "i").test(searchText)) {
              foundSaveKey = key;
              break;
            }
          }
        }

        if (damageValue) damageValue = damageValue.replace(/x/gi, "*");

        const attackItem = {
          ...foundry.utils.deepClone(OSEMonsterParser.baseAttack),
          name
        };
        attackItem.system.counter.value = count;
        attackItem.system.counter.max = count;
        attackItem.system.save = foundSaveKey;
        attackItem.system.pattern = pattern;
        if (damageValue) attackItem.system.damage = damageValue;
        if (descriptionValue && normalizeForCompare(descriptionValue) !== damageValue) {
          attackItem.system.description = descriptionValue;
        }

        data.attacks.push(attackItem);
      };

      // Handle a bracketed group (all attacks share one pattern)
      const processBracketGroup = (groupText, pattern) => {
        const inner = groupText.slice(1, -1).trim();
        const orParts = splitTopLevelOr(inner);
        if (orParts.length > 1) {
          orParts.forEach(p => parseSingleAttack(p, pattern));
          return;
        }
        const commaParts = splitTopLevelCommas(inner);
        commaParts.forEach(p => parseSingleAttack(p, pattern));
      };

      const commaSegments = splitTopLevelCommas(attText);
      for (const segment of commaSegments) {
        const currentPattern = availablePatterns.length ? availablePatterns[patternIdx] : "red";
        const segTrim = segment.trim();

        // Segment may itself have OR alternatives; each alternative shares currentPattern.
        const alternatives = splitTopLevelOr(segTrim);
        for (const alt of alternatives) {
          const altTrim = alt.trim();
          if (/^\[.*]$/.test(altTrim)) {
            processBracketGroup(altTrim, currentPattern);
          } else {
            parseSingleAttack(altTrim, currentPattern);
          }
        }

        if (availablePatterns.length) patternIdx = (patternIdx + 1) % availablePatterns.length;
      }
    }
    return combinedStatsLine;
  }

  static _normalize(t) {
    return t
      .replace(/\r/g, "")
      .replace(/[“”]/g, "\"")
      .replace(/[‘’′]/g, "'")
      .replace(/\u00d7/g, "×")
      .replace(/\s*×\s*/g, " x ")
      .replace(/\u2013|\u2014/g, "-")
      .replace(/\s*–\s*/g, "-")
      .replace(/[’`]/g, "'")
      .replace(/\s+$/g, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{2,}/g, "\n")
      .trim();
  }

  static FRACTION_MAP = {
    "¼": 0.25,
    "½": 0.5,
    "¾": 0.75,
    "⅓": 1 / 3,
    "⅔": 2 / 3,
    "⅛": 0.125,
    "⅜": 0.375,
    "⅝": 0.625,
    "⅞": 0.875
  };

  static parseFractionNumber = (raw) => {
    if (!raw) return NaN;
    raw = raw.trim();

    if (/^\d+$/.test(raw)) return parseInt(raw, 10);

    let intPart = 0;
    let fracPart = raw;

    // Mixed number like "2 1/2" or "2½"
    const mixed = raw.match(/^(\d+)\s*(.*)$/);
    if (mixed) {
      const maybeFraction = mixed[2];
      if (maybeFraction && (maybeFraction.includes("/") || [...maybeFraction].some(c => OSEMonsterParser.FRACTION_MAP[c] != null))) {
        intPart = parseInt(mixed[1], 10);
        fracPart = maybeFraction;
      }
    }

    let fracVal = 0;

    // Unicode fraction chars
    [...fracPart].forEach(ch => {
      if (OSEMonsterParser.FRACTION_MAP[ch] != null) {
        fracVal += OSEMonsterParser.FRACTION_MAP[ch];
        fracPart = fracPart.replace(ch, "");
      }
    });

    fracPart = fracPart.trim();

    // Standard a/b fraction
    if (/\d+\/\d+/.test(fracPart)) {
      const [a, b] = fracPart.split("/")
        .map(Number);
      if (b) fracVal += a / b;
    }

    if (intPart === 0 && fracVal === 0) return NaN;
    return intPart + fracVal;
  };

  static baseAttack = {
    name: "",
    type: "weapon",
    img: "icons/skills/melee/swords-parry-block-blue.webp",
    system: {
      damage: "",
      description: "",
      melee: true,
      missile: false,
      pattern: "red",
      save: "",
      counter: {
        max: 0,
        value: 0
      }
    }
  };

  static baseAbility = {
    name: "",
    type: "ability",
    img: "icons/sundries/books/book-tooled-eye-gold-red.webp",
    system: {
      description: "",
      pattern: "white"
    }
  };
}
