import fs from 'node:fs';
import path from 'node:path';
import { DESIGN_SYSTEM_COMPONENTS_DIR } from '../paths';

export interface HardcodedHit {
  file: string;
  line: number;
  snippet: string;
  reason: string;
}

// Heuristic, not a formal lint rule - reviewed manually, listed with file:line
// so it's transparent rather than a black-box number. Flags:
//  - literal hex colors NOT inside a var(...) fallback
//  - literal non-zero px values on color-agnostic spacing/radius/font props
//    NOT going through a --spacing-*/--radius-*/--font-size-* token
// Deliberately ignores `0`, `0px`, and `1px solid ...` border resets - those
// are legitimate literals, not missed design tokens.
const HEX_RE = /#[0-9a-fA-F]{3,8}\b/;
const TOKEN_PROP_RE = /^\s*(padding|margin|gap|border-radius|font-size)\s*:\s*(.+);/;

function isInsideVar(line: string, matchIndex: number): boolean {
  const before = line.slice(Math.max(0, matchIndex - 12), matchIndex);
  return before.includes('var(');
}

export function getHardcodedValues(): { total: number; hits: HardcodedHit[] } {
  const hits: HardcodedHit[] = [];
  if (!fs.existsSync(DESIGN_SYSTEM_COMPONENTS_DIR)) return { total: 0, hits };

  for (const folder of fs.readdirSync(DESIGN_SYSTEM_COMPONENTS_DIR, { withFileTypes: true })) {
    if (!folder.isDirectory()) continue;
    const cssPath = path.join(DESIGN_SYSTEM_COMPONENTS_DIR, folder.name, `${folder.name}.module.css`);
    if (!fs.existsSync(cssPath)) continue;

    const rel = `src/components/${folder.name}/${folder.name}.module.css`;
    const lines = fs.readFileSync(cssPath, 'utf8').split('\n');

    lines.forEach((line, i) => {
      const hexMatch = HEX_RE.exec(line);
      if (hexMatch && !isInsideVar(line, hexMatch.index)) {
        hits.push({ file: rel, line: i + 1, snippet: line.trim(), reason: 'literal hex color not using a --token' });
        return;
      }

      const propMatch = TOKEN_PROP_RE.exec(line);
      if (propMatch) {
        const prop = propMatch[1];
        const value = propMatch[2];
        const trimmed = value.trim();
        const isZeroOnly = /^(0(px)?\s*)+$/.test(trimmed);
        const usesVar = value.includes('var(--');
        const isBorderWidthContext = /\b1px\s+solid\b/.test(value);
        // A percentage radius (e.g. 50% for a circular dot/avatar) isn't a
        // spacing/radius token candidate at all - shape, not scale.
        const isPercent = /%\s*$/.test(trimmed);
        // Tiny (<=2px) border-radius values are cosmetic micro-adjustments
        // (e.g. a checkbox's slightly-rounded corner), not part of the
        // 8/12/16... spacing scale - flagging them as "missing a token" is
        // noise, not a real design-system violation.
        const isTinyRadius = prop === 'border-radius' && /^[12]px$/.test(trimmed);
        if (!isZeroOnly && !usesVar && !isBorderWidthContext && !isPercent && !isTinyRadius) {
          hits.push({
            file: rel,
            line: i + 1,
            snippet: line.trim(),
            reason: `literal value on "${propMatch[1]}" not using a --token`,
          });
        }
      }
    });
  }

  return { total: hits.length, hits };
}
