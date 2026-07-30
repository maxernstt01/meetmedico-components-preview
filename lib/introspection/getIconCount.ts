import fs from 'node:fs';
import path from 'node:path';
import { DESIGN_SYSTEM_ROOT } from '../paths';

const ICONS_DIR = path.join(DESIGN_SYSTEM_ROOT, 'src/assets/icons');

/** Real count of .svg icon files under MeetMedicoComponent's icons folder (recursive). */
export function getIconCount(): { total: number; files: string[] } {
  const files: string[] = [];

  function walk(dir: string) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.svg$/i.test(entry.name)) files.push(path.relative(DESIGN_SYSTEM_ROOT, full).replace(/\\/g, '/'));
    }
  }

  walk(ICONS_DIR);
  return { total: files.length, files };
}
