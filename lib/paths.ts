import path from 'node:path';

// node_modules/design-system is a filesystem junction/symlink straight at
// ../MeetMedicoComponent (verified after `npm install`) - reading through it
// is identical to reading the real repo, and picks up live edits with no
// rebuild step.
export const DESIGN_SYSTEM_ROOT = path.resolve(process.cwd(), 'node_modules/design-system');
export const DESIGN_SYSTEM_COMPONENTS_DIR = path.join(DESIGN_SYSTEM_ROOT, 'src/components');

export function componentDir(name: string) {
  return path.join(DESIGN_SYSTEM_COMPONENTS_DIR, name);
}
