import { execFileSync } from 'node:child_process';
import { DESIGN_SYSTEM_ROOT } from '../paths';

export interface CommitRow {
  hash: string;
  date: string;
  message: string;
}

/**
 * Real `git log` for this component's folder inside the actual
 * MeetMedicoComponent repo (read through the node_modules/design-system
 * junction, which points at the same .git). Not a fabricated changelog -
 * whatever this shows is exactly what `git log -- <path>` would print.
 */
export function getGitLog(name: string): CommitRow[] {
  const relPath = `src/components/${name}`;
  try {
    const output = execFileSync(
      'git',
      ['log', '--follow', '--date=short', '--pretty=format:%h|%ad|%s', '--', relPath],
      { cwd: DESIGN_SYSTEM_ROOT, encoding: 'utf8' }
    );
    if (!output.trim()) return [];
    return output
      .trim()
      .split('\n')
      .map((line) => {
        const [hash, date, ...rest] = line.split('|');
        return { hash, date, message: rest.join('|') };
      });
  } catch {
    return [];
  }
}
