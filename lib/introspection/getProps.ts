import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { componentDir } from '../paths';
import { SUB_COMPONENTS } from '../registry';

export interface PropRow {
  name: string;
  type: string;
  required: boolean;
  defaultValue: string | null;
  description: string;
}

export interface PropsResult {
  interfaceName: string | null;
  sourceFile: string;
  rows: PropRow[];
}

// A few components don't fit the plain "read <Name>.types.ts for an
// interface literally called <Name>Props" convention every other component
// follows. Rather than leaving their Props Info tab silently empty, this
// teaches the lookup about the real shape of those exceptions:
//
// - SUB_COMPONENTS (imported from registry.ts, the same map REAL_COMPONENTS
//   uses for whole-library stats so the two can't drift): "Loader" isn't one
//   component, it's a folder that exports three independent ones (Spinner,
//   DotsLoader, Skeleton), each with its own props. We merge all three into
//   one table, prefixed by which component each prop belongs to.
// - PROPS_INTERFACE_ALIAS: "Notification" has no NotificationProps at all -
//   NotificationProvider only takes {children}, which isn't interesting to
//   document. The actually useful public surface is NotificationOptions,
//   the object you pass to useNotification()'s open().
const PROPS_INTERFACE_ALIAS: Record<string, string> = {
  Notification: 'NotificationOptions',
};

/**
 * Reads <Name>.tsx (the component's own implementation, not just its types)
 * and finds every destructured prop default, e.g. `variant = 'primary'` in
 * `function Button({ variant = 'primary' }: ButtonProps)`. Works regardless
 * of whether the component is a plain function, a `forwardRef(...)`, or an
 * arrow function - it just walks the whole file for ObjectBindingPattern
 * elements matching known prop names, rather than trying to precisely locate
 * "the" component function.
 */
function extractDefaults(componentFile: string, propNames: Set<string>): Map<string, string> {
  const defaults = new Map<string, string>();
  if (!fs.existsSync(componentFile)) return defaults;

  const text = fs.readFileSync(componentFile, 'utf8');
  const sourceFile = ts.createSourceFile(componentFile, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  function visit(node: ts.Node) {
    if (ts.isBindingElement(node) && node.initializer && ts.isIdentifier(node.name)) {
      const propName = node.name.text;
      if (propNames.has(propName) && !defaults.has(propName)) {
        defaults.set(propName, node.initializer.getText(sourceFile));
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return defaults;
}

function findInterface(
  filePath: string,
  scriptKind: ts.ScriptKind,
  targetName: string
): { sourceFile: ts.SourceFile; node: ts.InterfaceDeclaration } | null {
  if (!fs.existsSync(filePath)) return null;

  const text = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, text, ts.ScriptTarget.Latest, true, scriptKind);

  let found: ts.InterfaceDeclaration | undefined;
  sourceFile.forEachChild((node) => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === targetName) {
      found = node;
    }
  });

  return found ? { sourceFile, node: found } : null;
}

function rowsFromInterface(sourceFile: ts.SourceFile, node: ts.InterfaceDeclaration): PropRow[] {
  const rows: PropRow[] = [];

  for (const member of node.members) {
    if (!ts.isPropertySignature(member) || !member.name) continue;
    const propName = member.name.getText(sourceFile);
    const required = !member.questionToken;
    const type = member.type ? member.type.getText(sourceFile) : 'unknown';

    const jsDocComments = ts.getJSDocCommentsAndTags(member);
    let description = '';
    for (const doc of jsDocComments) {
      if (ts.isJSDoc(doc) && doc.comment) {
        description = typeof doc.comment === 'string' ? doc.comment : doc.comment.map((c) => c.text).join(' ');
      }
    }

    rows.push({ name: propName, type, required, defaultValue: null, description });
  }

  return rows;
}

/**
 * Resolves a single component's props by trying, in order:
 * 1. `<name>.types.ts` for an interface literally called `<interfaceName>`.
 * 2. `<name>.tsx` for the same interface declared inline (several small
 *    components - Logo, Spinner, DotsLoader - define their props interface
 *    right next to the component instead of in a separate types file).
 * Also fills in real default values by walking `<name>.tsx`'s destructured
 * function parameters, regardless of which file the interface itself lives in.
 */
function resolveComponentProps(
  dir: string,
  name: string,
  interfaceName: string
): { rows: PropRow[]; sourceFile: string } | null {
  const typesFile = path.join(dir, `${name}.types.ts`);
  const componentFile = path.join(dir, `${name}.tsx`);

  const fromTypesFile = findInterface(typesFile, ts.ScriptKind.TS, interfaceName);
  const fromComponentFile = fromTypesFile ? null : findInterface(componentFile, ts.ScriptKind.TSX, interfaceName);
  const resolved = fromTypesFile ?? fromComponentFile;
  if (!resolved) return null;

  const rows = rowsFromInterface(resolved.sourceFile, resolved.node);
  const defaults = extractDefaults(componentFile, new Set(rows.map((r) => r.name)));
  const finalRows = rows.map((r) => ({ ...r, defaultValue: defaults.get(r.name) ?? null }));

  const relFile = fromTypesFile ? `${name}.types.ts` : `${name}.tsx`;
  return { rows: finalRows, sourceFile: relFile };
}

/**
 * Reads <Name>.types.ts (or, for a handful of documented exceptions, an
 * inline interface or an alternate interface name / merged set of
 * sub-components - see SUB_COMPONENTS / PROPS_INTERFACE_ALIAS above)
 * from the real MeetMedicoComponent source (via the node_modules/design-system
 * junction) and extracts its props with the TypeScript compiler API - this is
 * real source, not hand-written documentation, so it can't drift from the
 * actual props.
 */
export function getProps(name: string): PropsResult {
  const dir = componentDir(name);

  const subComponents = SUB_COMPONENTS[name];
  if (subComponents) {
    const rows: PropRow[] = [];
    const sourceFiles: string[] = [];

    for (const subName of subComponents) {
      const resolved = resolveComponentProps(dir, subName, `${subName}Props`);
      if (!resolved) continue;
      sourceFiles.push(`${subName}/${resolved.sourceFile}`);
      for (const row of resolved.rows) {
        rows.push({ ...row, name: `${subName}.${row.name}` });
      }
    }

    return {
      interfaceName: subComponents.map((s) => `${s}Props`).join(', '),
      sourceFile: sourceFiles.length > 0 ? `src/components/${name}/{${sourceFiles.join(', ')}}` : `src/components/${name}/`,
      rows,
    };
  }

  const interfaceName = PROPS_INTERFACE_ALIAS[name] ?? `${name}Props`;
  const resolved = resolveComponentProps(dir, name, interfaceName);

  if (!resolved) {
    return { interfaceName: null, sourceFile: `src/components/${name}/${name}.types.ts`, rows: [] };
  }

  return {
    interfaceName,
    sourceFile: `src/components/${name}/${resolved.sourceFile}`,
    rows: resolved.rows,
  };
}
