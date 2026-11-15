// Checks the hand-kept tsl-textures declarations against the installed library's own defaults
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/*
 * tsl-textures ships no types, so packages/tsl-textures/shared/tsl-textures.d.ts declares
 * each texture's parameters. The library's truth is the `defaults` object in each
 * src/<file>.js (the docs pages' parameter lists drift from it), so this compares the two
 * and fails when a version bump adds, drops or renames a parameter or a companion such as
 * `clouds.opacity`.
 */

const ROOT = join(import.meta.dirname, '..');
const SRC = join(ROOT, 'node_modules/tsl-textures/src');
const DTS = readFileSync(join(ROOT, 'packages/tsl-textures/shared/tsl-textures.d.ts'), 'utf8');
const read = (file: string): string => readFileSync(join(SRC, file), 'utf8').replace(/\r/g, '');

interface Texture {
  name: string;
  params: string[];
  companions: string[];
}

/** Every texture the entry file exports, with its non-`$` default keys and companions. */
const fromSource = (): Texture[] => {
  const exported = [...read('tsl-textures.js').matchAll(/^export \{ (\w+) \} from '\.\/([\w-]+\.js)'/gm)];
  return exported.map(([, name, file]) => {
    const text = read(file!);
    const block = /var defaults = \{\n([\s\S]*?)\n\};/.exec(text)?.[1] ?? '';
    const params = [...block.matchAll(/^\t(\w+):/gm)].map((m) => m[1]!);
    const companions = [...text.matchAll(new RegExp(`^${name}\\.(\\w+) = function`, 'gm'))].map((m) => m[1]!);
    return { name: name!, params: params.sort(), companions: companions.sort() };
  });
};

/** The same facts read back from the declaration file. */
const fromDeclarations = (name: string): Texture => {
  const P = `${name[0]!.toUpperCase()}${name.slice(1)}Params`;
  const iface = new RegExp(`export interface ${P} \\{\\n([\\s\\S]*?)\\n  \\}`).exec(DTS)?.[1] ?? '';
  const decl = new RegExp(`export const ${name}: \\{\\n([\\s\\S]*?)\\n  \\};`).exec(DTS)?.[1] ?? '';
  return {
    name,
    params: [...iface.matchAll(/^ {4}(\w+)\?:/gm)].map((m) => m[1]!).sort(),
    companions: [...decl.matchAll(/^ {4}(\w+)\(params/gm)].map((m) => m[1]!).sort(),
  };
};

describe('tsl-textures declarations', () => {
  const textures = fromSource();

  it('finds the library entry', () => {
    expect(textures.length).toBeGreaterThan(40);
    expect(readdirSync(SRC)).toContain('tsl-utils.js');
  });

  it.each(textures.map((t) => [t.name, t] as const))('%s matches its src defaults', (name, source) => {
    expect(fromDeclarations(name)).toEqual(source);
  });

  it('declares no texture the library does not export', () => {
    const declared = [...DTS.matchAll(/^ {2}export const (\w+): \{$/gm)].map((m) => m[1]).sort();
    expect(declared).toEqual(textures.map((t) => t.name).sort());
  });
});
