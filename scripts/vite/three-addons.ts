// Vite plugin: three's addons get three/webgpu unless they need WebGL-only exports
import { readFile } from 'node:fs/promises';

/**
 * three's addons (`three/addons/*`) import the bare `three`, which is the WebGL build.
 * The Three.js gallery runs on `three/webgpu`, so without this an addon would pull in a
 * second copy of the core and its classes would fail `instanceof` against ours. This is
 * what the three.js manual's import map does (`"three": "three.webgpu.js"`), scoped to
 * imports made by the addon files so a WebGL-based package can still import `three`.
 * tsl-textures is a TSL library for `three/webgpu` that imports its Color and Vector
 * classes from the bare `three`, so its files get the same mapping.
 *
 * Some addons are WebGL-only: UnrealBloomPass and LineMaterial (which globe.gl's
 * three-globe imports) need ShaderLib and UniformsUtils, which three/webgpu does not
 * export, and the build fails on them. So the mapping is decided per addon file: it
 * moves to three/webgpu only when every name the file imports from `three` exists there.
 */
export const ON_WEBGPU = /[/\\](three[/\\]examples[/\\]jsm|tsl-textures)[/\\]/;

/** `import { a, b as c } from 'three'` and `export { a } from 'three'` → ['a', 'b']. */
export function namedThreeImports(source: string): string[] | null {
  const names: string[] = [];
  const re = /(?:import|export)\s*\{([^}]*)\}\s*from\s*['"]three['"]/g;
  for (const m of source.matchAll(re)) {
    for (const part of m[1]!.split(',')) {
      const name = part.trim().split(/\s+as\s+/)[0]!.trim();
      if (name) names.push(name);
    }
  }
  // A namespace import (`import * as THREE from 'three'`) can't be checked by name.
  if (/import\s*\*\s*as\s+\w+\s+from\s*['"]three['"]/.test(source)) return null;
  return names;
}

/** True when an addon importing `names` from `three` can run on three/webgpu. */
export function fitsWebgpu(names: string[] | null, webgpuExports: ReadonlySet<string>): boolean {
  return names === null || names.every((n) => webgpuExports.has(n));
}

let webgpuExports: Promise<Set<string>> | null = null;
const verdicts = new Map<string, Promise<boolean>>();

async function decide(file: string): Promise<boolean> {
  webgpuExports ??= import('three/webgpu').then((m) => new Set(Object.keys(m)));
  const exports = await webgpuExports;
  return fitsWebgpu(namedThreeImports(await readFile(file, 'utf8')), exports);
}

export const threeAddonsOnWebgpu = {
  name: 'three-addons-on-webgpu',
  enforce: 'pre' as const,
  async resolveId(this: { resolve: (id: string, importer?: string) => Promise<unknown> }, id: string, importer?: string) {
    if (id !== 'three' || !importer || !ON_WEBGPU.test(importer)) return null;
    const file = importer.split('?')[0]!;
    let verdict = verdicts.get(file);
    if (!verdict) {
      verdict = decide(file).catch((err: unknown) => {
        // Unreadable importer: keep the old behaviour (map to webgpu) and say why.
        console.warn(`three-addons-on-webgpu: could not read ${file}, mapping to three/webgpu`, err);
        return true;
      });
      verdicts.set(file, verdict);
    }
    return (await verdict) ? this.resolve('three/webgpu', importer) : null;
  },
};
