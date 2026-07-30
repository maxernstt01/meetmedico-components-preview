import fs from 'node:fs';
import path from 'node:path';

const SCAN_ROOT = process.cwd();
const SCAN_DIRS = ['app', 'components'];
const IGNORE_DIRS = new Set(['node_modules', '.next', '.git']);

export interface UsageHit {
  file: string;
  line: number;
}

export interface UsageResult {
  count: number;
  hits: UsageHit[];
}

function walk(dir: string, out: string[]) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (/\.(tsx|jsx)$/.test(entry.name)) {
      out.push(full);
    }
  }
}

// Every preview file's `export const CODE = \`...\`;` block is a documentation
// string shown in the UI, not a real render call - strip it before counting so
// a component tag appearing only in the displayed code snippet doesn't get
// counted as a real usage.
const CODE_BLOCK_RE = /export const CODE = `[\s\S]*?`;/g;

/**
 * "Usage Pages" counts real JSX usage of <Name ... /> across this preview
 * app's own source (app/, components/) - per user's decision, since there's
 * no separate consuming product app linked yet, meetmedico-components-preview
 * itself is treated as "the application" for this metric.
 */
export function getUsageCount(name: string): UsageResult {
  const files: string[] = [];
  for (const d of SCAN_DIRS) walk(path.join(SCAN_ROOT, d), files);

  const tagRe = new RegExp(`<${name}[\\s/>]`);
  const hits: UsageHit[] = [];

  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    const stripped = text.replace(CODE_BLOCK_RE, (block) => block.replace(/[^\n]/g, ' '));
    const lines = stripped.split('\n');
    lines.forEach((line, i) => {
      if (tagRe.test(line)) {
        hits.push({ file: path.relative(SCAN_ROOT, file).replace(/\\/g, '/'), line: i + 1 });
      }
    });
  }

  return { count: hits.length, hits };
}
