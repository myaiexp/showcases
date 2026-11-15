// Which three addon files may resolve `three` to three/webgpu
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import { fitsWebgpu, namedThreeImports } from './three-addons.ts';

const require = createRequire(import.meta.url);
const addon = (path: string): string => readFileSync(require.resolve(`three/examples/jsm/${path}`), 'utf8');

describe('namedThreeImports', () => {
  it('collects named imports and re-exports, dropping aliases', () => {
    const src = `import { Color, Vector3 as V } from 'three';\nexport { Mesh } from "three";`;
    expect(namedThreeImports(src)).toEqual(['Color', 'Vector3', 'Mesh']);
  });
  it('ignores other modules', () => {
    expect(namedThreeImports(`import { Pass } from './Pass.js';`)).toEqual([]);
  });
  it('returns null for a namespace import, which cannot be checked by name', () => {
    expect(namedThreeImports(`import * as THREE from 'three';`)).toBeNull();
  });
});

describe('fitsWebgpu on the real addons', async () => {
  const webgpu = new Set(Object.keys(await import('three/webgpu')));
  it('keeps WebGL-only addons on the WebGL build (they need ShaderLib, UniformsUtils)', () => {
    expect(fitsWebgpu(namedThreeImports(addon('postprocessing/UnrealBloomPass.js')), webgpu)).toBe(false);
    expect(fitsWebgpu(namedThreeImports(addon('lines/LineMaterial.js')), webgpu)).toBe(false);
  });
  it('still maps addons whose imports all exist in three/webgpu', () => {
    // Spark imports Pass.js; it worked on three/webgpu before and must keep doing so
    expect(fitsWebgpu(namedThreeImports(addon('postprocessing/Pass.js')), webgpu)).toBe(true);
    expect(fitsWebgpu(namedThreeImports(addon('controls/OrbitControls.js')), webgpu)).toBe(true);
  });
});
