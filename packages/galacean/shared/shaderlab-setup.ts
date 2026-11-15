// ShaderLab helpers: built-in includes once per page, shaders created once by name
import { type Engine, Material, Shader } from '@galacean/engine';
import { registerIncludes } from '@galacean/engine-shader';

let included = false;

/** The docs' registerIncludes() throws on a second call, so every example goes through this. */
export function shaderlabReady(): void {
  if (included) return;
  included = true;
  registerIncludes();
}

/** Compiles ShaderLab `source` once per page: Shader.create logs and returns undefined for a name seen before. */
export function shaderOf(source: string): Shader {
  shaderlabReady();
  const name = /Shader\s+"([^"]+)"/.exec(source)?.[1];
  if (!name) throw new Error('ShaderLab source has no Shader "name"');
  const shader = Shader.find(name) ?? Shader.create(source);
  if (!shader) throw new Error(`ShaderLab shader ${name} failed to compile`);
  return shader;
}

/** A Material on the ShaderLab shader made from `source`. */
export function materialOf(engine: Engine, source: string): Material {
  return new Material(engine, shaderOf(source));
}
