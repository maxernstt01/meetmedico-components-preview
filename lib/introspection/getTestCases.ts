import fs from 'node:fs';
import path from 'node:path';
import { componentDir } from '../paths';

export interface TestCase {
  describeBlock: string | null;
  title: string;
}

export interface TestCasesResult {
  sourceFile: string;
  found: boolean;
  cases: TestCase[];
}

const DESCRIBE_RE = /\bdescribe\(\s*['"`]([^'"`]+)['"`]/g;
const IT_RE = /\b(?:it|test)\(\s*['"`]([^'"`]+)['"`]/g;

/**
 * Extracts real `describe`/`it` titles from <Name>.test.tsx - used as the
 * factual basis for both the Validation and Test Scenarios tabs, since both
 * ultimately come from the one real source of truth (the test file), per
 * user's confirmed decision to show "same list, two labels".
 */
export function getTestCases(name: string): TestCasesResult {
  const dir = componentDir(name);
  const testFile = path.join(dir, `${name}.test.tsx`);
  const relSourceFile = `src/components/${name}/${name}.test.tsx`;

  if (!fs.existsSync(testFile)) {
    return { sourceFile: relSourceFile, found: false, cases: [] };
  }

  const text = fs.readFileSync(testFile, 'utf8');

  // Walk the file top-to-bottom tracking the nearest enclosing describe() by
  // brace depth, so each `it(...)` gets attributed to its real describe block.
  const lines = text.split('\n');
  let depthStack: { depth: number; name: string }[] = [];
  let depth = 0;
  const cases: TestCase[] = [];

  for (const line of lines) {
    const describeMatch = /\bdescribe\(\s*['"`]([^'"`]+)['"`]/.exec(line);
    if (describeMatch) {
      depthStack.push({ depth, name: describeMatch[1] });
    }
    const itMatches = line.matchAll(IT_RE);
    for (const m of itMatches) {
      const current = depthStack.length ? depthStack[depthStack.length - 1].name : null;
      cases.push({ describeBlock: current, title: m[1] });
    }

    for (const ch of line) {
      if (ch === '{') depth++;
      if (ch === '}') {
        depth--;
        while (depthStack.length && depthStack[depthStack.length - 1].depth >= depth) {
          depthStack.pop();
        }
      }
    }
  }

  return { sourceFile: relSourceFile, found: true, cases };
}
